import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
  good: 0,
  ok: 0,
  bad: 0,  
  actions: {
    goodClick: () => set((state) => ({ good: state.good + 1 })),
    okClick: () => set((state) => ({ ok: state.ok + 1 })),
    badClick: () => set((state) => ({ bad: state.bad + 1 })),
    resetStats: () => set({ good: 0, ok: 0, bad: 0 }) 
  }
}))

export const useGood = () => useFeedbackStore((state) => state.good)
export const useOk = () => useFeedbackStore((state) => state.ok)
export const useBad = () => useFeedbackStore((state) => state.bad)
export const useFeedbackControls = () => useFeedbackStore((state) => state.actions)