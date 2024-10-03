export const deriveExerciseCost = (strikePrice: number, numberOfShares: number): number => {
  return numberOfShares * strikePrice;
}

export const deriveDilutionPercentageOwned = (percentageOwnership: number, dilution: number): number => {
  return percentageOwnership * dilution;
}

export const deriveEquityValue = (percentageOwnership: number, dilution: number, valuation: number): number => {
  return valuation * deriveDilutionPercentageOwned(percentageOwnership, dilution);
}

export const deriveAnnualEquityValue = (percentageOwnership: number, dilution: number, valuation: number, vestingYears: number): number => {
  return deriveEquityValue(percentageOwnership, dilution, valuation) / vestingYears;
}

export const deriveAnnualCompensation = (percentageOwnership: number, dilution: number, valuation: number, vestingYears: number, salary: number): number => {
  return deriveAnnualEquityValue(percentageOwnership, dilution, valuation, vestingYears) + salary;
}
