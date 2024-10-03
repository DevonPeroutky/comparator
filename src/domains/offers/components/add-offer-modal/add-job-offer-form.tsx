import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRecoilState } from "recoil"
import { jobOffersState } from "../../atoms"
import { JobOffer } from "../../types"
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react"
import { FormattedInput } from "@/components/ui/formatted-input"
import { generateScenarios } from "@/domains/scenarios/utils"
import { useAddScenarios } from "@/domains/scenarios/atoms"

const jobOfferFormSchema = z.object({
  id: z.string().default(() => uuidv4()),
  company_name: z.string(),
  salary: z.number().min(1).max(1000000000),
  number_of_shares: z.optional(z.number().int().min(0)),
  total_number_of_outstanding_shares: z.optional(z.number().int().min(0)),
  percentage_ownership: z.optional(z.number().min(0).max(100)),
  strike_price: z.optional(z.number().min(0).max(100000)),
  latest_company_valuation: z.number(),
  vesting_years: z.number().min(1).max(10),
});

type FormData = z.infer<typeof jobOfferFormSchema>;

export function JobOfferForm({ onClick }: { onClick: () => void }) {
  const [jobOffers, setJobOffers] = useRecoilState(jobOffersState)
  const addScenarios = useAddScenarios();

  const form = useForm<z.infer<typeof jobOfferFormSchema>>({
    resolver: zodResolver(jobOfferFormSchema),
    defaultValues: {
      vesting_years: 4,
    }
  })
  const { register, setValue, control, handleSubmit } = form;

  const onSubmit = (data: FormData) => {
    if (!data.percentage_ownership && (!data.number_of_shares || !data.total_number_of_outstanding_shares)) {
      form.setError("root", {
        type: "manual",
        message: "The company should either give you the Percentage Ownership OR the Number of shares AND Number of Outstanding Shares. Insist that you get one of thoses, as it's impossible to evaluate their offer without it."
      });
      return;
    }

    if (data.percentage_ownership && data.number_of_shares && data.total_number_of_outstanding_shares) {
      const calculatedPercentage = (data.number_of_shares / data.total_number_of_outstanding_shares) * 100;
      const marginOfError = 0.1; // 0.1% margin of error
      if (Math.abs(calculatedPercentage - data.percentage_ownership) > marginOfError) {
        form.setError("root", {
          type: "manual",
          message: "The provided percentage ownership doesn't align with the calculated percentage based on the number of shares and total outstanding shares.",
        });
        return;
      }
    }

    // Calculate percentage_ownership if it's empty
    if (!data.percentage_ownership && data.number_of_shares && data.total_number_of_outstanding_shares) {
      data.percentage_ownership = (data.number_of_shares / data.total_number_of_outstanding_shares) * 100;
    }

    // Convert  decimal percentage to percentage
    data.percentage_ownership = data.percentage_ownership! / 100;

    const newJobOffer: JobOffer = jobOfferFormSchema.parse(data);

    // Add new Job offer to the list
    setJobOffers([...jobOffers, newJobOffer])

    // Generate scenarios for the new job offer
    const newScenarios = generateScenarios(newJobOffer);
    addScenarios(newJobOffer.company_name, newScenarios);

    onClick();
  };


  const total_number_of_shares = useWatch({
    control,
    name: 'total_number_of_outstanding_shares'
  });

  const number_of_shares = useWatch({
    control,
    name: 'number_of_shares'
  });

  // Whenever fieldAValue changes, set the value of 'fieldB'
  useEffect(() => {
    if (total_number_of_shares && number_of_shares) {
      setValue('percentage_ownership', (number_of_shares / total_number_of_shares) * 100);
    }
  }, [total_number_of_shares, number_of_shares, setValue]);

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-4 gap-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Annual Salary</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="$100,000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="currency"
                  onBlur={() => field.onBlur()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vesting_years"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Vesting Schedule (years)</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="4"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latest_company_valuation"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Company Valuation</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="$1000000000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="valuation"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strike_price"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Strike Price</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="$.47"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="currency"
                />
              </FormControl>
              <FormDescription>The price that you'll pay for the stock</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_shares"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel># of Shares</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="20,000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="number"
                />
              </FormControl>
              <FormDescription>The amount of shares in your equity packages</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_number_of_outstanding_shares"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel># of Outstanding Shares</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="25,467,000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="number"
                />
              </FormControl>
              <FormDescription>The total number of shares for the company.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percentage_ownership"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Percentage Ownership</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder=".2%"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatter="percentage"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <div className="col-span-2 text-red-500 text-sm font-semibold">{form.formState.errors.root.message}</div>
        )}
        <Button type="submit" className="mt-auto flex items-center justify-center">Add Job</Button>
      </form>
    </Form>
  )
}
