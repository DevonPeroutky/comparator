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
import { useState } from "react"

export function AddOfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Step 2: Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}><CirclePlus className="mr-2 h-4 w-4" /> Add Job Offer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-fit">
        <DialogHeader>
          <DialogTitle>Add Job Offer</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <JobOfferForm onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}

