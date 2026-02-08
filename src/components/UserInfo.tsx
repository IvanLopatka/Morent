
import { supabase } from "@/lib/supabase-client";

import Image from "next/image";

interface UserInfoProps {
    id: string;
}



export const UserInfo = async ({ id }: UserInfoProps) => {
   const { data: profile, error} = await supabase.from("profiles").select("*").eq("id", id).single();
    
    
    return (
      <div className="flex flex-col w-full p-8 items-start gap-4">
        <h1 className="text-4xl font-bold text-center">My Profile</h1>
        <p className="text-center">Welcome to your profile, here you can manage your account</p>
        <div className="flex flex-col  w-full items-center gap-4">
          <div className="flex flex-row w-full p-4 rounded-lg bg-white items-center gap-4">
            <Image src={profile?.avatar_url || "/profile.svg"} alt="profile" width={50} height={50} />
            
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">{profile?.full_name}</p>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </div>
          </div>
            
        </div>
      </div>
    );
};