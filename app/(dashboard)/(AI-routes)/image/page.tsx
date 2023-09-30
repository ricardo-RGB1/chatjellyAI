"use client";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Download, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Empty from "@/components/empty";
import Loader from "@/components/loader";

import { cn } from "@/lib/utils";

import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema,  amountOptions, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);


  // ***** FORM SCHEMA *****
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1024",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // ***** HANDLE FORM SUBMISSION *****
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
      form.reset();
    } catch (error: any) {
      // open the modal when the user has reached the limit of free generations
      if(error?.response?.status === 403) {
        proModal.onOpen(); 
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Image" description="Turn your prompt into an image" />
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
                        placeholder="A puppy playing in the park"
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
              <FormField 
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                         {amountOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                         ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                         {resolutionOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                         ))}
                      </SelectContent>
                    </Select>
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

          {images.length === 0 && !isLoading && (
            <div>
              <Empty label="No images generated" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card 
                key={src}
                className='rounded-lg overflow-hidden'
              >
                <div className="relative aspect-square">
                  <Image 
                    alt='Image'
                    fill
                    src={src}
                  />
                </div>
                <CardFooter className='p-2'>
                  <Button 
                    onClick={() => window.open(src)}
                    variant='secondary'
                    className="w-full hover:bg-[#e2ebf3]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}; 
export default ImagePage;

// ***** HANDLE FORM SUBMISSION *****
// Inside the function, the setImages function is called with an empty array to clear any previously set images. Then, an HTTP POST request is sent to the /api/image endpoint with the values object as the request body. The response from the server is an array of image objects, each containing a url property. The urls array is created by mapping over the response array and extracting the url property from each image object.

// The setImages function is then called with the urls array to update the state of the component with the new images. The form object is reset to clear any input values. If there is an error during the HTTP request, the error is logged to the console. Finally, the router object is used to refresh the page.
