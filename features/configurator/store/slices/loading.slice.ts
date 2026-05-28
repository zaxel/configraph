import { StateCreator } from 'zustand';
import { BoundStore } from '../store.types';
import { LoadingSlice } from './loading.types';


export const createLoadingSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  LoadingSlice
> = (set) => ({
  isLoading: false,
  progress: 0,

  setLoading: (isLoading) =>
    set({ isLoading }, false, "setLoading"),

  setProgress: (progress) =>
    set({ progress }, false, "setProgress"),
});