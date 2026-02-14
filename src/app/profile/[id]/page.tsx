import { NavigationBar } from "@/components";
import { UserInfo } from "@/components";
import { AboutUs } from "@/components";
import { createClient } from "@/utils/supabase/server";


export default async function Home({ params }: { params: { id: string } }) {
    const id = (await params).id;
    const supabase = await createClient();
    return (
        <div className="grid min-h-screen bg-gray-100 grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
            <NavigationBar />
            <UserInfo id={id} />
            <AboutUs />
            
        </div>
    );
}