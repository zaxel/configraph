export const createUiSlice = (set) => ({
  activeModule: null,

  setActiveModule: (id) =>
    set({ activeModule: id }),

  sidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
});