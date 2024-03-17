import {auth} from "@clerk/nextjs";

import prismadb from "./prismadb";

import { MAX_FREE_COUNTS } from "@/contants";

export const increaseApiLimit = async () => {
    const{userId} = auth();

    if(!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        },
    });

    if(userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId,
            },
            data: {
                count: {
                    increment: 1,
                },
            },
        });
    } else {
        await prismadb.userApiLimit.create({
            data: {
               userId: userId,
               count: 1,
            },
        });
    }

}

export const checkApiLimit = async () => {
    const{userId} = auth();

    if(!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        },
    });

    if(!userApiLimit) {
        return true;
    }

    if(userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    }

    return false;
}

export const getApiLimitCount = async () => {
    const{userId} = auth();

    if(!userId) {
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        },
    });

    if(!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
}