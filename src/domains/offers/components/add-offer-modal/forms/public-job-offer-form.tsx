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
import { useAtom } from "jotai"
import { jobOffersState } from "../../../atoms"
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react"
import { FormattedInput } from "@/components/ui/formatted-input"
import { generateScenarioForJobOffer, generateScenarios } from "@/domains/scenarios/utils"
import { useAddScenarios } from "@/domains/scenarios/atoms"
import { PublicJobOffer } from "@/domains/offers/types"
import { IntegerColumnFormatOptions, LargeCurrencyColumnFormatOptions, PreciseCurrencyColumnFormatOptions } from "@/lib/columns/constants"

const publicJobOfferFormSchema = z.object({
  id: z.string().default(() => uuidv4()),
  company_name: z.string(),
  salary: z.number().min(1).max(1000000000),
  vesting_years: z.number().min(1).max(10),
  number_of_shares: z.optional(z.number().int().min(0)),
  stock_price: z.number().min(0).max(100000),
  equity_valution: z.optional(z.number().min(0).max(100000)),
  market_cap: z.optional(z.number().min(0).max(100000)),
});

type FormData = z.infer<typeof publicJobOfferFormSchema>;

export function PublicJobOfferForm({ onClick }: { onClick: () => void }) {
  const [jobOffers, setJobOffers] = useAtom(jobOffersState)
  const addScenarios = useAddScenarios();

  const form = useForm<z.infer<typeof publicJobOfferFormSchema>>({
    resolver: zodResolver(publicJobOfferFormSchema),
    defaultValues: {
      vesting_years: 4,
    }
  })
  const { register, setValue, control, handleSubmit } = form;

  const onSubmit = (data: FormData) => {
    if (!data.equity_valution || !data.number_of_shares) {
      form.setError("root", {
        type: "manual",
        message: "You need the number of shares to estimate the equity package. The company should either provide you with this information, or they gave you the equity value of your RSU"
      });
      return;
    }

    // Calculate number of shares if it's empty
    if (!data.number_of_shares && data.stock_price && data.equity_valution) {
      data.number_of_shares = Math.floor(data.equity_valution / data.number_of_shares);
    }

    const newJobOffer: PublicJobOffer = publicJobOfferFormSchema.parse(data);

    // Add new Job offer to the list
    setJobOffers([...jobOffers, newJobOffer])

    // Generate scenarios for the new job offer
    const newScenarios = generateScenarioForJobOffer(newJobOffer);
    addScenarios(newJobOffer.company_name, newScenarios);

    onClick();
  };

  // console.log(`DATA: `, form.getValues());
  // console.log(`Number of share: `, form.getFieldState('number_of_shares'), form.getValues('number_of_shares'));

  const equity_valuation = useWatch({
    control,
    name: 'equity_valution'
  });

  const stock_price = useWatch({
    control,
    name: 'stock_price'
  });

  // Whenever fieldAValue changes, set the value of 'fieldB'
  useEffect(() => {
    if (equity_valuation && stock_price) {
      // console.log('SETTING number_of_shares', Math.floor((equity_valuation / stock_price)));
      setValue('number_of_shares', Math.floor((equity_valuation / stock_price)));
    }
  }, [equity_valuation, stock_price, setValue]);

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
                  formatOptions={LargeCurrencyColumnFormatOptions}
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
                  formatOptions={IntegerColumnFormatOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equity_valution"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>RSU Amount</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="$250,000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatOptions={LargeCurrencyColumnFormatOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock_price"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Stock Price</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="$56"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatOptions={PreciseCurrencyColumnFormatOptions}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_shares"
          render={({ field }) => {
            return (

              <FormItem className="flex-1">
                <FormLabel># of Shares</FormLabel>
                <FormControl>
                  <FormattedInput
                    placeholder="20,000"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    formatOptions={IntegerColumnFormatOptions}
                  />
                </FormControl>
                <FormDescription>The amount of shares in your equity packages</FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="market_cap"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Market Cap</FormLabel>
              <FormControl>
                <FormattedInput
                  placeholder="25,467,000"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  formatOptions={LargeCurrencyColumnFormatOptions}
                />
              </FormControl>
              <FormDescription>The company's current market cap</FormDescription>
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
