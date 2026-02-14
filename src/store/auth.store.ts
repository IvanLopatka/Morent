import { Session } from "@supabase/supabase-js";
import { create } from "zustand";



interface AuthStateProps {
    session: Session | null;
    setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthStateProps>((set) => ({
    session: null,
    setSession: (session: Session | null) => set({ session }),
}));