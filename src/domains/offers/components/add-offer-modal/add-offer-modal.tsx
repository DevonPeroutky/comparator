import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react"
import { JobOfferForm } from "./forms/private-job-offer-form"
import { useRef, useState } from "react"
import confetti from "canvas-confetti"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { PublicJobOfferForm } from "./forms/public-job-offer-form"

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
        <Button variant="outline" onClick={() => openDialog()}><CirclePlus className="mr-2 h-4 w-4 cursor-pointer" /> Add Offer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[750px] md:px-10">
        <DialogHeader>
          <DialogTitle>Add Job Offer</DialogTitle>
        </DialogHeader>
        {/* <JobOfferForm onClick={closeDialog} /> */}
        <Tabs defaultValue="startup" className="w-full md:min-h-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="startup">Startup</TabsTrigger>
            <TabsTrigger value="public">Public Company</TabsTrigger>
          </TabsList>
          <TabsContent value="startup">
            <JobOfferForm onClick={closeDialog} />
          </TabsContent>
          <TabsContent value="public">
            <PublicJobOfferForm onClick={closeDialog} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog >
  )
}

