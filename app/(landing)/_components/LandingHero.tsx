"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
    const {isSignedIn} = useAuth();
    return ( 
        <div className="text-white font-bold py-36 text-center space-y-5">
           <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The best AI tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                        options={{
                            strings: ["Bot Conversation","Image Generation","Code Generation","Music Generation","Video Generation"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
           </div>
           <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create content with the help of WilliamsAI
           </div>
           <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating Content for Free
                    </Button>
                </Link>
           </div>
           <div className="text-zinc-400 text-xl md:text-4xl font-bold pt-[90px]">
                No credit card required
           </div>
           <div className="flex justify-center pt-4">
                <video  controls src="video/video.mp4" className="w-[70%]  border-blue-500 border-4">
                    
                </video>
           </div>
        </div>
     );
}