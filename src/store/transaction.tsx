import axios from "axios"
import { create, StateCreator } from "zustand"
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware"

export interface TransactionInterface {
  date: string
  reference_id: string
  recipient: string
  ref_1?: string
  transaction_type: string
  amount: number
}

export interface TransactionState {
  transactions: TransactionInterface[]
  isLoading: boolean
  fetchData: () => void
}

type TransactionStatePersist = (
  config: StateCreator<TransactionState>,
  options: PersistOptions<TransactionState>
) => StateCreator<TransactionState>

export const useTransactionStore = create<TransactionState>(
  (persist as TransactionStatePersist)(
    (set) => ({
      transactions: [],
      isLoading: false,
      fetchData: async () => {
        set({ isLoading: true })
        try {
          const response = await axios.get("/api/transaction/get-history", {
            withCredentials: true,
          })
          set({
            transactions: response.data.transactions ?? [],
            isLoading: false,
          })
          // set({ isLoading: false })
        } catch (error) {
          console.error("Error:", error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: "aeon-transaction",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
)
