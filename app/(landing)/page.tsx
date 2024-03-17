import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LandingNavbar } from "./_components/LandingNavbar";
import { LandingHero } from "./_components/LandingHero";
import { LandingContent } from "./_components/LandingContent";

const LandingPage = () => {
    return ( 
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
     );
}
 
export default LandingPage;