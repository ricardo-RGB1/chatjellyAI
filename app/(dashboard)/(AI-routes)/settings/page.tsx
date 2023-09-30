import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
    const isPro = await checkSubscription();

    return ( 
        <div>
            <Heading 
                title='Settings'
                description="Manage account settings"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? 'You are subscribed to the Pro plan.' : 'You are not subscribed to the Pro plan.'}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
     );
}
 
export default SettingsPage;