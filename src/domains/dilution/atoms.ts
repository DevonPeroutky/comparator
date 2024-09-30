import { atom } from 'recoil';
import { FundingRound } from './types'; // Assuming FundingRound is defined in a types file

/*

Seed round: 20% dilution, or more if more money is needed
Series A round: 20% dilution
Series B round: 15% dilution
Series C round: 10–15% dilution
Series D round: 10% dilution

*/
export const DEFAULT_DILUTION_ROUNDS: FundingRound[] = [
  { id: '0', label: 'Seed', dilution_amount: .25 },
  { id: '1', label: 'Series A', dilution_amount: .2 },
  { id: '2', label: 'Series B', dilution_amount: .15 },
  { id: '3', label: 'Series C', dilution_amount: .15 },
  { id: '4', label: 'Series D', dilution_amount: .10 },
];

export const dilutionRoundsState = atom<FundingRound[]>({
  key: 'dilutionRoundsState',
  default: DEFAULT_DILUTION_ROUNDS,
});
