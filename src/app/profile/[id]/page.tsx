import { NavigationBar } from "@/components";
import { SavedCars } from "@/components/SavedCars";
import { UserInfo } from "@/components/UserInfo";
import { AboutUs } from "@/components";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ params }: { params: { id: string } }) {
    const id = (await params).id;
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
            <NavigationBar />
            <div className="flex-1 w-full">
                <UserInfo id={id} />
                <SavedCars userId={id} />
            </div>
            <AboutUs />
        </div>
    );
}