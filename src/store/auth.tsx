import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import Cookies from "js-cookie"

interface User {
  fullname: string
  email: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, isAuthenticated: true })
        Cookies.set("auth-token", token)
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        Cookies.remove("auth-token")
      },
    }),
    {
      name: "aeon-auth",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
)
