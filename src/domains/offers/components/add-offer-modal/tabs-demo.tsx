import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { JobOfferForm } from "./forms/private-job-offer-form"
import { PublicJobOfferForm } from "./forms/public-job-offer-form"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="startup">Startup</TabsTrigger>
        <TabsTrigger value="password">Public Company</TabsTrigger>
      </TabsList>
      <TabsContent value="startup">
        <JobOfferForm onClick={closeDialog} />
      </TabsContent>
      <TabsContent value="password">
        <PublicJobOfferForm onClick={closeDialog} />
      </TabsContent>
    </Tabs>
  )
}

