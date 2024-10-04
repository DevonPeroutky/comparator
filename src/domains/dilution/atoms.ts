import { atom } from 'jotai';
import { FundingRound } from './types'; // Assuming FundingRound is defined in a types file
import { atomWithStorage } from 'jotai/utils';

export const DEFAULT_DILUTION_ROUNDS: FundingRound[] = [
  { id: '-1', label: 'Pre Seed', dilution_amount: .30 },
  { id: '0', label: 'Seed', dilution_amount: .30 },
  { id: '1', label: 'Series A', dilution_amount: .25 },
  { id: '2', label: 'Series B', dilution_amount: .20 },
  { id: '3', label: 'Series C', dilution_amount: .15 },
  { id: '4', label: 'Series D', dilution_amount: .15 },
  { id: '5', label: 'Series E', dilution_amount: .10 },
  { id: '6', label: 'Series F', dilution_amount: .05 },
];

export const dilutionRoundsState = atomWithStorage<FundingRound[]>("dilutionRounds", DEFAULT_DILUTION_ROUNDS);
