import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// Instruct the ChatCompletion to specifically generate a code snippet
const instructionMessage: ChatCompletionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

// ********** API ROUTE **********
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // If the user is not subscribed to pro plan and the free trial limit is reached, return 403
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    // Increase the API limit if the user is NOT subscribed to pro plan
    if (!isPro) {
      await increaseApiLimit();
    }
  

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**** EXPLANATION ****
The function is exported as POST and takes a Request object as its argument.
The auth() function is called to get the userId from the request headers.
The request body is parsed as JSON and the messages property is extracted from it.
If there is no userId in the request headers, the function returns a NextResponse object with a 401 status code and an "Unauthorized" message.
If the OpenAI API key is not configured, the function returns a NextResponse object with a 500 status code and an "OpenAI API key not configured" message.
If there are no messages in the request body, the function returns a NextResponse object with a 400 status code and a "Messages are required" message.
The openai.chat.completions.create method is called with the model and messages properties to generate a chat response using the OpenAI API.
The function returns a NextResponse object with the chat response as a JSON string. 
*/
