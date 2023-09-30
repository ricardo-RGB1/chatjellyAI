import { auth } from '@clerk/nextjs'
import prismadb from './prismadb'

const DAY_IN_MS = 1000 * 60 * 60 * 24; 



export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }


    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    });

    
    if (!userSubscription) {
        return false;
    }
 
    // check if the subscription has expired
    const isValid = 
        userSubscription.stripePriceId && 
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    

    return !!isValid; // return true if the subscription is valid

};


// The checkSubscription() function checks if a user has an active subscription. It first retrieves the user's ID using the auth() function. If the user ID is not available, the function returns false. Otherwise, it queries the database using prismadb.userSubscription.findUnique() to retrieve the user's subscription information, including the subscription ID, current period end date, customer ID, and price ID. If the user does not have a subscription, the function returns false. Otherwise, it checks if the subscription is still valid by comparing the current period end date with the current date and time. If the subscription is still valid, the function returns true. Otherwise, it returns false.

    // userSubscription - this function retrieves a user's subscription information from a database using the prismadb.userSubscription.findUnique() method. It takes in a userId parameter, which is used to query the database for the user's subscription information. The where option in the query specifies that the query should look for a subscription with a userId that matches the userId parameter passed into the function.

    // The select option specifies which fields should be returned in the query result. In this case, the function is only interested in retrieving the stripeSubscriptionId, stripeCurrentPeriodEnd, stripeCustomerId, and stripePriceId fields.
    
    // The function then awaits the result of the query and assigns it to the userSubscription variable. The await keyword is used because the prismadb.userSubscription.findUnique() method returns a promise.
    
    // Finally, the function returns the userSubscription object, which contains the user's subscription information.