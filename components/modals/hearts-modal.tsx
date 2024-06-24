"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push("/store");
    }

    if(!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image 
                            src="/sana-bad.jpg"
                            alt="Sana"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        You've run out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base"> 
                        Get Pro for unlimited hearts, purchase them in the store, or do practice lessons.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button // Width depends on div above
                            variant="primary" 
                            className="w-full" 
                            size="lg" 
                            onClick={onClick}
                        >
                            Get unlimited hearts
                        </Button>
                        <Button // Width depends on div above
                            variant="primaryOutline" 
                            className="w-full" 
                            size="lg" 
                            onClick={close}
                        >
                            No thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// If "Wait, don't go!" breaks, use &apos; for apostrophe

