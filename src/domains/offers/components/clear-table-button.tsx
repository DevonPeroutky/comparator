import { useAtom } from "jotai";
import { jobOffersState } from "../atoms";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { scenarioMapState } from "@/domains/scenarios/atoms";

export const ClearOffersTableButton = () => {
  const [offers, setOffers] = useAtom(jobOffersState);
  const [scenario, setScenarioMap] = useAtom(scenarioMapState);

  const clearOffers = () => {
    setOffers([]);
    setScenarioMap({});
  }

  return (
    <Button onClick={clearOffers} variant="destructive"><TrashIcon className="mr-2 w-4 h-4" /> Clear Offers</Button>
  )
}
