
import { createClient } from "@/utils/supabase/server";
import { UserInfoUI } from "./UserInfoUI";
import { redirect } from "next/navigation";

interface UserInfoProps {
  id: string;
}

export const UserInfo = async ({ id }: UserInfoProps) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();



  
  if (!user) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Not authenticated. Please log in.
      </div>
    );
  }

  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    // Continue anyway to allow viewing other details/metadata
  }

  return (
    <UserInfoUI 
      profile={{ 
        ...user.user_metadata, 
        ...profile, 
        avatar_url: profile?.avatar_url, // Force it to come from the table, not session
        id: user.id, 
        email: user.email 
      }} 
    />
  );
};