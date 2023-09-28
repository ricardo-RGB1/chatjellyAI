"use client";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";


import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

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
      setVideo(undefined);
      const response = await axios.post("/api/video", values); // ** POST to API
      setVideo(response.data[0]);
      form.reset();

    } catch (error: any) {
      // TODO: Open Pro Modal
      console.log(error);
    } finally {  
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Video" description="Turn your prompt into a video" />
      <div className="px-5 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)} // handle form submission
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
                        placeholder="A stingray swimming in the ocean."
                        {...field}
                      />
                    </FormControl>

                    <Button
                      className="ml-3 bg-purple-600 hover:bg-purple-500"
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
            <div className="xl:m-auto xl:w-3/4 2xl:w-1/2 p-8 rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Empty Music  */}
          {!video && !isLoading && (
            <div>
              <Empty label="No video generated" />
            </div>
          )}
          {/* Render the video here */}
          {video && (
           <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black max-h-[42rem]"> 
             <source src={video} type="video/mp4"/>
           </video>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoPage;

// ***** NOTES *****
// axios.post() sends a POST request to a server endpoint using the axios library. The endpoint is "/api/video" and the data being sent is contained in the values variable. The await keyword is used to wait for the response from the server before continuing execution. The response is then stored in the response variable. The response is then used to set the video state variable. The form is then reset using the form.reset() method.