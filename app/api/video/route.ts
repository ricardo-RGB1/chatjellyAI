import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Initialize Replicate with authentication token from environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// ********** API ROUTE HANDLER **********
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // If the user is not subscribed to pro plan and the free trial limit is reached, return 403
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    // Run the model
    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    // Increase the API limit if the user is NOT subscribed to pro plan
    if (!isPro) {
      await increaseApiLimit();
    }

    // Return the output
    return NextResponse.json(output);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**** API ROUTE HANDLER EXPLANATION ****
A TypeScript function that handles a POST request. It takes in a Request object as a parameter and returns a NextResponse object.

The function first extracts the userId from the auth() function, which is not shown in the selected code. It then extracts the prompt property from the request body using destructuring assignment.

If the userId is not present, the function returns a NextResponse object with a status code of 401 and a message of "Unauthorized". If the prompt is not present, the function returns a NextResponse object with a status code of 400 and a message of "Prompt is required".

*** OUTPUT ***
The function then runs a machine learning model using the replicate.run() function, passing in the prompt as an input. The output of the model is returned as a JSON response using a NextResponse object. */
