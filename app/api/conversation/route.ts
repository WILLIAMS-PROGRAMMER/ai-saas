import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {OpenAI} from 'openai';

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
        console.log("[CONVERSATION_REQUEST body]",body);
        const {messages} = body;
        console.log("[CONVERSATION_REQUEST]",messages);
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!configuration.apiKey){
            return new NextResponse("OpenAI API Key not found", { status: 500 });
        }

        if(!messages){
            return new NextResponse("Messages not found", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("API Limit has expired", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        if(!isPro)
        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}