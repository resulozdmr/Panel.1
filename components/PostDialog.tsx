"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";
import { toast } from "sonner";

export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const changeHandler = (e: any) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get("inputText") as string;

    if (!inputText.trim()) {
      toast.error("Input field is required.");
      return;
    }

    try {
      await createPostAction(inputText, selectedFile);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to create post.");
    }

    setInputText("");
    setSelectedFile("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] bg-white rounded-md shadow-lg"
      >
            <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                <Image
                    src="/logo.png"
                    alt="DrGulf Logo"
                    fill
                    className="rounded-full object-cover"
                />
                </div>
                <div className="leading-tight">
                <h1 className="font-semibold text-sm">DrGulf</h1>
                <p className="text-xs text-gray-500">Post to your network</p>
                </div>
            </DialogTitle>
            </DialogHeader>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const promise = postActionHandler(formData);
            toast.promise(promise, {
              loading: "Creating post...",
              success: "Post created",
              error: "Failed to create post",
            });
          }}
        >
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type your message here."
            />

            {selectedFile && (
              <div className="my-4">
                <Image
                  src={selectedFile}
                  alt="preview-image"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>

        <Button
          className="gap-2 mt-2"
          onClick={() => inputRef?.current?.click()}
          variant="ghost"
        >
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
