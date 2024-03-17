import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {OpenAI} from 'openai';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const configuration ={
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(configuration);

export async function POST(
    req: Request,
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        console.log("[IMAGE_REQUEST body]",body);
        const {prompt,amount,resolution} = body;
       
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!configuration.apiKey){
            return new NextResponse("OpenAI API Key not found", { status: 500 });
        }

        if(!prompt){
            return new NextResponse("Prompt not found", { status: 400 });
        }
        if(!amount){
            return new NextResponse("amount not found", { status: 400 });
        }
        if(!resolution){
            return new NextResponse("resolution not found", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("API Limit has expired", { status: 403 });
        }


        const response = await openai.images.generate({
            prompt: prompt,
            n: parseInt(amount,10),
            size: resolution
        });

        if(!isPro)
        await increaseApiLimit();

        return NextResponse.json(response.data);
    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}