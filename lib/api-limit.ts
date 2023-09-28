import { auth } from '@clerk/nextjs'

import prismadb from './prismadb'
import { MAX_FREE_COUNTS } from '@/constants' 



// **** INCREASE API LIMIT FUNCTION
export const increaseApiLimit = async () => {
    const { userId } = auth();

    if(!userId) return;

     // Query the `userApiLimit` table for a record with the `userId`
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    // If a record is found, update the `count` field of the record by incrementing it by 1
    if(userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
    // If no record is found, create a new record with the `userId` and set the `count` to 1
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId: userId,
                count: 1
            }
        });
    }
} 

// This function tracks the number of API requests made by each user and updates their API limit accordingly. The function then uses the prismadb object to query the userApiLimit table for a record with the userId obtained earlier. If a record is found, the function updates the count field of the record by incrementing it by 1. If no record is found, the function creates a new record with the userId and sets the count to 1.




// **** CHECK IF USER HAS REACHED API LIMIT 
export const checkApiLimit = async () => {
    const { userId } = auth();

    if(!userId) return false;

    // 1. Query or retrieve the `userApiLimit` table for a record with the `userId`
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    // 2.
    if(!userApiLimit || (userApiLimit.count < MAX_FREE_COUNTS )) {
        return true;
    } else {
        return false;
    }

}


// 1. This code is using the prismadb object to query the userApiLimit table in the database to retrieve a record that matches the userId of the currently authenticated user (above).The findUnique method is used to query the table for a single record that matches the specified conditions. If a record is found, it is returned as an object. If no record is found, null is returned.

// 2. This code is checking whether the userApiLimit object is falsy or if the count field of the object is less than MAX_FREE_COUNTS. If either of these conditions is true, the function returns true, indicating that the user is allowed to make another API request.

// If both conditions are false, the function returns false, indicating that the user has exceeded their API limit and is not allowed to make any more requests.

// This code enforces API limits for users, allowing a certain number of free requests before requiring payment (or limiting the number of requests a user can make in a given time period).



// **** GET API LIMIT COUNT
export const getApiLimitCount = async () => {
    const { userId } = auth();

    if(!userId) return 0;

    // Query the `userApiLimit` table for a record with the `userId`
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    // If a record is not found, return 0
    if(!userApiLimit) return 0;

    // If a record is found, return the `count` field of the record
    return userApiLimit.count;
}

// getApiLimitCount will run inside a server component so it can be passed to the Sidebar (client) component. In summary, the function uses the prismadb object to query the userApiLimit table for a record with the userId obtained earlier. If a record is not found, the function returns 0. If a record is found, the function returns the count field of the record. This function will be used to display the number of API requests made by the user in the Sidebar component.  