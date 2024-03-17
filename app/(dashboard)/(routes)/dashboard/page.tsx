"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react";
import { useRouter } from "next/navigation";


const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music"
  },
  {
    label: "Image Generation",
    icon: Image,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code"
  }
]

export default function DasboardPage() {

  const router = useRouter();
  return (
      <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Explore the power of WilliamsAI for your business
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center mb-2">Chat with the smartest AI in the world and get the best results for your business</p>
            <p className="text-muted-foreground font-light text-sm text-center">Note: This Webiste is possible thanks for the OpenAi API</p>
        </div>

        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
              <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center gap-x-4">
                      <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                          <tool.icon className={cn("w-8 h-8",tool.color)} />
                      </div>
                      <div className="font-semibold">
                        {tool.label}
                      </div>
                  </div>

                  <ArrowRight className="w-6 h-6" />
              </Card>
          ))}
        </div>
      </div>
  );
}
