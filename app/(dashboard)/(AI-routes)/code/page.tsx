"use client";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Divide, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { ChatCompletionRequestMessage } from "openai"; v3 of openai
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // ***** HANDLE FORM SUBMISSION *****
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessage = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessage,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // TODO: Open Pro Modal
      console.log(error);
    } finally {
      router.refresh(); // this will rehydrate all server components fetching the new data
      
    }
  };

  return (
    <div>
      <Heading
        title="Code"
        description="Generate code using descriptive text"
      />
      <div className="px-5 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              m-auto rounded-lg border xl:w-3/4 2xl:w-1/2 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex justify-center align-middle items-center col-span-12">
                    <FormControl className="p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-md"
                        disabled={isLoading}
                        placeholder="Generate a function that returns a reversed string"
                        {...field}
                      />
                    </FormControl>

                    <Button
                      className="ml-3 bg-pink-500 hover:bg-pink-600"
                      disabled={isLoading}
                    >
                      <SendHorizonal />
                    </Button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
         {/* Create the Loader, Empty, and AI render */}
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 flex justify-center xl:m-auto items-center  rounded-lg xl:w-3/4 2xl:w-1/2 bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="Input is blank" />
            </div>
          )}
          {/* Render the chat messages */}
          <div className="flex flex-col-reverse gap-y-3">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 gap-x-8 flex xl:m-auto items-center rounded-lg xl:w-3/4 2xl:w-1/2",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {/* Render the avatar depending on who is the user */}
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-md overflow-hidden leading-7 "
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodePage;

// ***** HANDLE FORM SUBMISSION *****
// The function is called onSubmit and takes a values object as its argument. This object is inferred to have the type defined by the formSchema object.
// A new ChatCompletionMessage object is created with the role property set to "user" and the content property set to the prompt value from the values object.
// The messages array is updated with the new user message using the spread operator.
// An HTTP POST request is sent to the /api/conversation endpoint with the updated messages array in the request body.
// The response from the server is added to the messages array using the spread operator.
// The form is reset using the form.reset() method.
// If there is an error during the request, a message is logged to the console.
// The router.refresh() method is called to refresh the page. This is necessary because the page is not re-rendered when the messages array is updated.

// ***** RENDER THE CHAT MESSAGES *****
// The div block is responsible for rendering the chat messages. It maps through the messages array and renders a div for each message. The key prop is set to the content of the message. The className prop sets the styles for the message container based on the role of the message sender. If the role is 'user', the container has a white background with a black border, otherwise it has a muted background. The message content is rendered inside the container along with an avatar image that is determined by the role of the message sender.

// original for Loader
// p-8 rounded-lg w-full flex items-center justify-center bg-muted
