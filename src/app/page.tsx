import { NavigationBar } from "@/components";
import { MobileSearch } from "@/components";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
    </div>
  );
}
