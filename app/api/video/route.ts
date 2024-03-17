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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                fps: 24,
                model: "xl",
                width: 1024,
                height: 576,
                prompt: prompt,
                batch_size: 1,
                num_frames: 24,
                init_weight: 0.5,
                guidance_scale: 17.5,
                negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
                remove_watermark: false,
                num_inference_steps: 50
              }
            }
          );
          console.log(response);

          if(!isPro)
          await increaseApiLimit();

        return NextResponse.json(response);
    } catch (error) {
        console.log("[VIDEO_ERROR]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}