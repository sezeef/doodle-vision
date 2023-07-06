// TODO: fix width
// TODO: fix canvas width
// TODO: add canvas size selector
// TODO: add canvas stroke width selector
// TODO: add clear canvas button
// TODO: add invert canvas button
// TODO: make sure canvas is mobile accessible
// TODO: make this comopnent responsive and above the results component

"use client";

import React, { useContext, useRef } from "react";
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
import { OutputContext } from "@/store/OutputContext";
import { extractProgress } from "@/utils/parseLogs";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const formSchema = z.object({
  prompt: z.string().max(200).optional(),
  num_samples: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a Number of samples.",
  }),
  image_resolution: z.enum(["256", "512", "768"]),
  dimm_steps: z.number().int().gte(1).lte(500),
  scale: z.number().int(),
  seed: z.number().int().optional(),
  //* another solution for NaN problem
  // seed: z.union([z.number().int().positive(), z.nan()]).optional(),
  eta: z.number().int().optional(),
  a_prompt: z.string().max(200).optional(),
  n_prompt: z.string().max(200).optional(),
});

type Props = {};

export default function AiForm({}: Props) {
  const outputState = useContext(OutputContext);
  const setOutput = outputState?.setOutput;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      num_samples: "1",
      image_resolution: "256",
      dimm_steps: 1,
      scale: 1,
      seed: Math.floor(Math.random() * 1000000),
      eta: 0,
      a_prompt: "",
      n_prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const aiInputs = { ...values, image: canvasRef.current?.toDataURL() };

    const res = await fetch("/api/gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aiInputs),
      cache: "no-cache",
    });

    if (!res.ok) {
      const error = await res.json();
      // setError()
      console.error(error);
      return;
    }
    let resJson = await res.json();

    if (!resJson?.status || !resJson?.outputId) {
      console.error("Something went wrong");
      return;
    }

    const outputId = resJson.outputId;

    let i = 0;
    //! -------------------------------------------------------------------------------
    while (resJson.status !== "succeeded" && resJson.status !== "failed") {
      console.log("entering loop " + i);
      await sleep(500);
      const res2 = await fetch("/api/gen/" + outputId, {
        cache: "no-cache",
      });

      resJson = await res2.json();

      if (res2.status !== 200) {
        // setError(resJson);
        console.error(resJson);
        return;
      }

      console.log({ resJson });
      console.log("exiting loop " + i);
      ++i;
      // setPrediction(resJson);
      if (!setOutput) throw Error();
      setOutput({
        progress: extractProgress(resJson.logs) ?? 0,
        size: aiInputs.image_resolution,
        urls: [],
      });
    }

    if (!setOutput) throw Error();
    setOutput({
      progress: extractProgress(resJson.logs) ?? 100,
      size: aiInputs.image_resolution,
      urls: resJson.output,
    });
    //! -------------------------------------------------------------------------------
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
          name="scale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scale</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("scale", {
                    setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                  })}
                />
              </FormControl>
              <FormDescription>Cutsomize Scale</FormDescription>
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
