// TODO: Make api route
// TODO: send request to api route
// TODO: send output data up the tree to the right pane (globy state maybe)

/***********************
Output: 
{
  "type": "array",
  "items": {
    "type": "string",
    "format": "uri"
  },
  "title": "Output"
}
***********************/

"use client";

import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Canvas from "./Canvas";

const formSchema = z.object({
  prompt: z.string().max(200).optional(),
  num_samples: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a Number of samples.",
  }),
  image_resolution: z.enum(["256", "512", "768"]),
  dimm_steps: z.number().int().gte(1).lte(500),
  seed: z.number().int().optional(),
  // seed: z.union([z.number().int().positive(), z.nan()]).optional(), //* another solution for NaN problem
  eta: z.number().int().optional(),
  a_prompt: z.string().max(200).optional(),
  n_prompt: z.string().max(200).optional(),
});

type Props = {};

export default function AiForm({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      num_samples: "1",
      image_resolution: "768",
      dimm_steps: 20,
      seed: undefined,
      eta: 0,
      a_prompt: "",
      n_prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(canvasRef.current?.toDataURL());
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-2/3 space-y-8"
      >
        <Canvas ref={canvasRef} />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input placeholder="prompt..." {...field} />
              </FormControl>
              <FormDescription>
                Provide a prompt to customize your output
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_samples"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Number of Output Samples</FormLabel>
              <FormControl>
                <RadioGroup
                  // @ts-expect-error
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-8 space-y-1"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">1</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">2</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">3</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">4</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_resolution"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Output Image Resolution</FormLabel>
              <FormControl>
                <RadioGroup
                  // @ts-expect-error
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-8 space-y-1"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="256" />
                    </FormControl>
                    <FormLabel className="font-normal">256</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="512" />
                    </FormControl>
                    <FormLabel className="font-normal">512</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="768" />
                    </FormControl>
                    <FormLabel className="font-normal">768</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimm_steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimm Steps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("dimm_steps", {
                    setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                  })}
                />
              </FormControl>
              <FormDescription>Cutsomize Dimm Steps</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seed</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("seed", {
                    setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                  })}
                />
              </FormControl>
              <FormDescription>Provide a seed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Generate</Button>
      </form>
    </Form>
  );
}
