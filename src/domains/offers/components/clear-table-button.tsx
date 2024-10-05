import { useAtom } from "jotai";
import { jobOffersState } from "../atoms";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export const ClearOffersTableButton = () => {
  const [offers, setOffers] = useAtom(jobOffersState);

  const clearOffers = () => {
    setOffers([]);
  }

  return (
    <Button onClick={clearOffers} variant="destructive"><TrashIcon className="mr-2 w-4 h-4" /> Clear Offers</Button>
  )
}
