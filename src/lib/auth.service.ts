import { createClient } from "@/utils/supabase/client";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { getPublicUrlByTable } from "supa-transfer";

const supabase = createClient();

export type AuthResponse = {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
};

export const AuthService = {
  async getSession() {
    return await supabase.auth.getSession();
  },

  async signUp(email: string, password: string, fullName: string, phone: string) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          email,
          phone,
          avatar_url: "",
        },
      },
    });
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async updateProfile(updates: { full_name?: string; phone?: string; avatar_url?: string; email?: string }) {
    // 1. Update Supabase Auth User Metadata (This always works/exists)
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      email: updates.email,
      data: updates,
    });

    if (authError) return { data: authData, error: authError };

    // 2. Update Public Profiles Table safely
    // We only send 'full_name' to the table for now as it's the most likely to exist.
    // Once you run the SQL to add 'phone' and 'avatar_url', you can include them here.
    const dbUpdates: any = {};
    if (updates.full_name) dbUpdates.full_name = updates.full_name;
    if (updates.phone) dbUpdates.phone = updates.phone;
    if (updates.avatar_url) dbUpdates.avatar = updates.avatar_url;
    if (updates.email) dbUpdates.email = updates.email;
    else if (authData.user?.email) dbUpdates.email = authData.user.email;

    if (Object.keys(dbUpdates).length > 0) {
      if (!authData.user?.id) {
        console.error("No user ID found for profile upsert");
        return { data: authData, error: { message: "User ID missing" } as any };
      }

      const { error: dbError } = await supabase
        .from("profiles")
        .upsert({
          id: authData.user.id,
          ...dbUpdates,
        });

      if (dbError) {
        console.error("Error upserting to profiles table:", {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code,
          error: dbError
        });
        return { data: authData, error: dbError as any };
      }
    }

    return { data: authData, error: null };
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // 1. Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    // 2. Get Public URL
    const publicUrl = getPublicUrlByTable(supabase, 'profiles', 'avatar', filePath, {
      bucket: 'avatars'
    });

    return { data: publicUrl, error: null };
  },
};
