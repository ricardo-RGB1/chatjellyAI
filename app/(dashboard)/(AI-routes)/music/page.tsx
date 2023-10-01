"use client";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


import Empty from "@/components/empty";
import Loader from "@/components/loader";



import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // Declare a boolean variable isLoading and initialize it to the value of form.formState.isSubmitting. This variable will be used to determine whether the form is currently submitting.
  const isLoading = form.formState.isSubmitting;

  // ***** HANDLE FORM SUBMISSION *****
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
      form.reset();

    } catch (error: any) {
       // open the modal when the user has reached the limit of free generations
       if(error?.response?.status === 403) {
        proModal.onOpen(); 
      } else {
        toast.error("Something went wrong");
      }
    } finally {  
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Music" description="Turn your prompt into music" />
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
                        placeholder="Violin solo"
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
            <div className="xl:m-auto xl:w-3/4 2xl:w-1/2 p-8 rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Empty Music  */}
          {!music && !isLoading && (
            <div>
              <Empty label="No music generated" />
            </div>
          )}
          {/* Render the music here */}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};
export default MusicPage;


