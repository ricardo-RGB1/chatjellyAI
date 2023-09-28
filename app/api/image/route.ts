import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// ********** API ROUTE **********
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "1024x1024" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    // Check if user has reached the free trial limit
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    const imageCompletion = await openai.images.generate({
      prompt, // shorthand for `prompt: prompt`
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(imageCompletion.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/********** API ROUTE **********
 This TypeScript function handles an HTTP POST request. It takes a Request object as an argument and returns a NextResponse object.

 The function first extracts the userId from the auth() function. It then extracts the prompt, amount, and resolution properties from the request body using destructuring assignment.

 The function then checks for various error conditions, such as missing authentication, missing OpenAI API key, and missing or invalid request parameters. If any of these conditions are met, the function returns an appropriate NextResponse object with an error message and status code.

 If all error checks pass, the function calls the openai.images.generate() function to generate one or more images based on the provided prompt. The n parameter specifies the number of images to generate, and the size parameter specifies the resolution of the images.

 Finally, the function returns a NextResponse object with the generated image data in JSON format. If an error occurs during image generation, the function logs the error and returns a generic "Internal Server Error" response. */
