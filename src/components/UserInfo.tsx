
import { createClient } from "@/utils/supabase/server";
import { UserInfoUI } from "./UserInfoUI";
import { redirect } from "next/navigation";

interface UserInfoProps {
  id: string;
}

export const UserInfo = async ({ id }: UserInfoProps) => {
  const supabase = await createClient();

  // Securely get the user from the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is authenticated, redirect to login or show error
  if (!user) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Not authenticated. Please log in.
      </div>
    );
  }

  // Security check: If the URL ID doesn't match the authenticated user ID,
  // we could redirect or just show the user's own profile. 
  // Using user.id directly ensures they can only see THEIR data.
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return <div className="p-8 text-center">Error loading profile data.</div>;
  }

  // Pass the authorized profile data to the Client Component layout
  return <UserInfoUI profile={profile} />;
};