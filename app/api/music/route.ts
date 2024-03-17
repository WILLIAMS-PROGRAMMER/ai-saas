import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN!
});


export async function POST(
    req: Request,
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        console.log("[MUSIC_REQUEST body]",body);
        const {prompt} = body;
        console.log("[MUSIC_REQUEST]",prompt);

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!prompt){
            return new NextResponse("Prompt not found", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("API Limit has expired", { status: 403 });
        }


        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                alpha: 0.5,
                prompt_a: prompt,
                prompt_b: "90's rap",
                denoising: 0.75,
                seed_image_id: "vibes",
                num_inference_steps: 50
              }
            }
          );
          console.log(response);

          if(!isPro)
          await increaseApiLimit();

        return NextResponse.json(response);
    } catch (error) {
        console.log("[MUSIC_ERROR]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}