import { create, StateCreator } from "zustand"
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware"
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

type AuthStorePersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>

export const useAuthStore = create<AuthState>(
  (persist as AuthStorePersist)(
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
