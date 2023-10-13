import { create } from "zustand";

const useCustomStore = create((set) => ({
  songs: [],
  setSongs: (songs) => set((state) => ({ songs: songs })),
  //   bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));

export default useCustomStore;