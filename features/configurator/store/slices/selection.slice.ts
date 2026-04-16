export const createSelectionSlice = (set) => ({
  selectedOptions: {},

  setOption: (componentId, value) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [componentId]: value,
      },
    })),

  resetSelections: () =>
    set({ selectedOptions: {} }),
});