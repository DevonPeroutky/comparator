import { atom } from 'recoil';
import { JobOffer } from './columns';

export const jobOffersState = atom<JobOffer[]>({
  key: 'jobOffersState',
  default: [],
});
