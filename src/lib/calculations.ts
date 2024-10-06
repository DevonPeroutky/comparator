import { determineRoundDilution } from "@/domains/dilution/utils";

export const deriveExerciseCost = (strikePrice: number, numberOfShares: number): number => {
  return numberOfShares * strikePrice;
}

export const deriveDilutionPercentageOwned = (percentageOwnership: number, dilution: number): number => {
  return percentageOwnership * dilution;
}

export const deriveEquityValue = (percentageOwnership: number, dilution: number, valuation: number): number => {
  return Math.round(valuation * deriveDilutionPercentageOwned(percentageOwnership, dilution));
}

export const deriveAnnualEquityValue = (percentageOwnership: number, dilution: number, valuation: number, vestingYears: number): number => {
  return Math.round(deriveEquityValue(percentageOwnership, dilution, valuation) / vestingYears);
}

export const deriveAnnualCompensation = (percentageOwnership: number, dilution: number, valuation: number, vestingYears: number, salary: number): number => {
  return Math.round(deriveAnnualEquityValue(percentageOwnership, dilution, valuation, vestingYears) + salary);
}

export const determineTotalDilution = (funding_round_valuations: number[]): number => {
  return funding_round_valuations.map((valuation, index) => determineRoundDilution(valuation)).map(dilution => 1 - dilution).reduce((a, b) => a * b, 1);
}

export const projectRoundsOfDilution = (fundingRoundValuations: number[]): number[] => {
  return fundingRoundValuations.map((valuation, index) => determineRoundDilution(valuation))
}

export const calcTotalDilution = (roundsOfDilution: number[]): number => {
  return roundsOfDilution.map(dilution => 1 - dilution).reduce((a, b) => a * b, 1);
}
