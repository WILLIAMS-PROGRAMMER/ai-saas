import Heading from "@/components/Heading";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import { SubscriptionButton } from "@/components/subscription-button";

const SettingsPage = async() => {

    const isPro = await checkSubscription();
    return ( 
        <div className="">
            <Heading 
                title="Settings"
                description="Manage your account settings and subscription."
                icon={Settings}
                iconColor="text-gray-800"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are subscribed to WilliamsAI Pro" : "You are not subscribed to WilliamsAI Pro"}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
     );
}
 
export default SettingsPage;