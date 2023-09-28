import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image Prompt is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  { value: "1", label: "1 Photo" },
  { value: "2", label: "2 Photos" },
  { value: "3", label: "3 Photos" },
  { value: "4", label: "4 Photos" },
  { value: "5", label: "5 Photos" },
];

export const resolutionOptions = [
  { value: "256x256", label: "256x256" },
  { value: "512x512", label: "512x512" },
  { value: "1024x1024", label: "1024x1024" },
];



// **** FORM SCHEMA EXPLANATION ****

// formSchema is a schema object defined using the zod library. It defines the shape of the form data that will be submitted to the server. The schema has three properties: prompt, amount, and resolution. prompt is a required string field with a minimum length of 1. amount and resolution are optional string fields with a minimum length of 1.

// amountOptions and resolutionOptions are arrays of objects that define the options for the amount and resolution fields in the form. Each object has a value property that corresponds to the value that will be submitted to the server, and a label property that corresponds to the label that will be displayed to the user in the form.