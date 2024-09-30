import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react"
import { JobOfferForm } from "./add-job-offer-form"

export function AddOfferModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><CirclePlus className="mr-2 h-4 w-4" /> Add Job Offer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-fit">
        <DialogHeader>
          <DialogTitle>Add Job Offer</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <JobOfferForm />
      </DialogContent>
    </Dialog>
  )
}

