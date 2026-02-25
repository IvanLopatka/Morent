import { createClient } from "@/utils/supabase/client";
import { AuthError, Session, User } from "@supabase/supabase-js";

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

  async signUp(email: string, password: string, fullName: string) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          email,
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

  async signOut() {
    return await supabase.auth.signOut();
  },

  async updateProfile(updates: { full_name?: string; phone?: string; avatar_url?: string }) {
    // 1. Update Supabase Auth User Metadata (This always works/exists)
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      data: updates,
    });

    if (authError) return { data: authData, error: authError };

    // 2. Update Public Profiles Table safely
    // We only send 'full_name' to the table for now as it's the most likely to exist.
    // Once you run the SQL to add 'phone' and 'avatar_url', you can include them here.
    const dbUpdates: any = {};
    if (updates.full_name) dbUpdates.full_name = updates.full_name;
    // Uncomment these once you run the SQL:
    // if (updates.phone) dbUpdates.phone = updates.phone;
    // if (updates.avatar_url) dbUpdates.avatar_url = updates.avatar_url;

    if (Object.keys(dbUpdates).length > 0) {
      await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", authData.user?.id);
    }

    return { data: authData, error: null };
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = fileName;

    // 1. Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    // 2. Get Public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // 3. Update User Profile with new avatar_url
    return await this.updateProfile({ avatar_url: publicUrl });
  },
};
