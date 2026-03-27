
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

  
  // 1. Fetch the profile from the 'profiles' table using the ID from the URL/Props
  // This allows viewing any user's profile, not just the currently logged-in one.
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
    console.error("Error fetching profile from DB:", error);
  }

  // 2. Consistent identification: Is the viewer looking at their own profile?
  const isOwnProfile = user.id === id;

  // 3. Construct the profile object for the UI
  // Start with common fields, then add DB profile data, then force specific overrides
  const mergedProfile = {
    ...(isOwnProfile ? user.user_metadata : {}), // Only include metadata if it's the current user
    ...profile, // Spread DB record (overwrites metadata if keys overlap)
    id: id,
    email: isOwnProfile ? user.email : (profile?.email || (profile as any)?.email || ""),
  };

  // 4. Ensure avatar_url is explicitly prioritized from DB, with fallback to metadata/session
  // If it's in the table, we definitely want that.
  mergedProfile.avatar_url = profile?.avatar_url || (isOwnProfile ? user.user_metadata?.avatar_url : "") || "";

  console.log(`[UserInfo] Profile merge for ${id}:`, { 
    fromDB: !!profile, 
    hasAvatarInDB: !!profile?.avatar_url,
    isOwn: isOwnProfile 
  });

  return (
    <UserInfoUI profile={mergedProfile} />
  );
};