import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react"
import { JobOfferForm } from "./add-job-offer-form"
import { useRef, useState } from "react"
import { ConfettiRef } from "@/components/ui/confetti"
import confetti from "canvas-confetti"

export function AddOfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Step 2: Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
    confetti({});
  };

  const openDialog = () => {
    setIsOpen(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => openDialog()}><CirclePlus className="mr-2 h-4 w-4 cursor-pointer" /> Add Job Offer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-fit">
        <DialogHeader>
          <DialogTitle>Add Job Offer</DialogTitle>
        </DialogHeader>
        <JobOfferForm onClick={closeDialog} />
      </DialogContent>
    </Dialog >
  )
}

