export const determineRoundDilution = (valuation: number): number => {
  if (valuation < 10000000) {
    return .35;
  } else if (valuation < 18000000) {
    return .30;
  } else if (valuation < 100000000) {
    return .25;
  } else if (valuation < 500000000) {
    return .20;
  } else if (valuation < 1000000000) {
    return .15;
  } else if (valuation < 5000000000) {
    return .10;
  } else {
    return .05;
  }
}

