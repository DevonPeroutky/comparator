import { zodResolver } from "@hookform/resolvers/zod"
import { NumericFormat } from 'react-number-format';
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { generateScenarioForPublicJobOffer } from "@/domains/scenarios/utils"
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
  equity_valuation: z.optional(z.number().min(0).max(99999999)),
  latest_company_valuation: z.number().min(0).max(999999999999999),
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
    console.log(`DATA: `, data);
    if (!data.equity_valuation || !data.number_of_shares) {
      form.setError("root", {
        type: "manual",
        message: "You need the number of shares to estimate the equity package. The company should either provide you with this information, or they gave you the equity value of your RSU"
      });
      return;
    }

    // Calculate number of shares if it's empty
    if (!data.number_of_shares && data.stock_price && data.equity_valuation) {
      data.number_of_shares = Math.floor(data.equity_valuation / data.number_of_shares);
    }

    const newJobOffer: PublicJobOffer = publicJobOfferFormSchema.parse(data);

    // Add new Job offer to the list
    setJobOffers([...jobOffers, newJobOffer])

    // Generate scenarios for the new job offer
    const newScenarios = generateScenarioForPublicJobOffer(newJobOffer);
    addScenarios(newJobOffer.id, newScenarios);

    onClick();
  };

  const equity_valuation = useWatch({
    control,
    name: 'equity_valuation'
  });

  const stock_price = useWatch({
    control,
    name: 'stock_price'
  });

  console.log('EQUITY VALUATION: ', form.getValues());

  useEffect(() => {
    console.log(form.getValues());
  }, [form.getValues()]);


  useEffect(() => {
    console.log('SETTING number_of_shares', equity_valuation, stock_price);
    if (equity_valuation && stock_price) {
      setValue('number_of_shares', Math.floor(equity_valuation / stock_price));
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
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  placeholder="$100,000"
                  decimalScale={0}
                  prefix="$"
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
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  customInput={Input}
                  allowNegative={false}
                  placeholder="4"
                  decimalScale={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equity_valuation"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>RSU Amount</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  placeholder="$250,000"
                  prefix="$"
                  decimalScale={0}
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
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  placeholder="$56"
                  prefix="$"
                  decimalScale={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_shares"
          render={({ field }) => {
            console.log('FIELD: ', field);
            return (
              <FormItem className="flex-1">
                <FormLabel># of Shares</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(values) => field.onChange(values.floatValue)}
                    customInput={Input}
                    thousandSeparator
                    allowNegative={false}
                    placeholder="23,000"
                    decimalScale={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="latest_company_valuation"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Market Cap</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  prefix="$"
                  placeholder="$25,467,300"
                  decimalScale={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div />
        {form.formState.errors.root && (
          <div className="col-span-2 text-red-500 text-sm font-semibold">{form.formState.errors.root.message}</div>
        )}
        <Button type="submit" className="mt-auto flex items-center justify-center grid-cols-2">Add Job</Button>
      </form>
    </Form>
  )
}
