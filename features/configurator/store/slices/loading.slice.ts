export const createLoadingSlice = (set) => ({
  isLoading: false,
  progress: 0,

  setLoading: (isLoading) =>
    set({ isLoading }),

  setProgress: (progress) =>
    set({ progress }),
});