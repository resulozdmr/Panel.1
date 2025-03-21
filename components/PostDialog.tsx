import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";
import { toast } from "sonner";

export function PostDialog({ setOpen, open, src }: { setOpen: any, open: boolean, src: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");

    // Input change handler
    const changeHandler = (e: any) => {
        setInputText(e.target.value);
    };

    // File change handler
    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const dataUrl = await readFileAsDataUrl(file);
            setSelectedFile(dataUrl);
        }
    };

    // Post action handler
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
            console.log("Error occurred:", error);
            toast.error("Failed to create post.");
        }

        setInputText("");
        setSelectedFile("");
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <ProfilePhoto src={src} />
                        <div>
                            <h1>Patel Mern Stack</h1>
                            <p className="text-xs">Post to anyone</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
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
                        {/* Textarea for post content */}
                        <Textarea
                            id="name"
                            name="inputText"
                            value={inputText}
                            onChange={changeHandler}
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        {/* Image preview */}
                        <div className="my-4">
                            {selectedFile && (
                                <Image
                                    src={selectedFile}
                                    alt="preview-image"
                                    width={400}
                                    height={400}
                                    className="rounded-lg"
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            {/* Hidden file input */}
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

                {/* Media upload button */}
                <Button
                    className="gap-2"
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
