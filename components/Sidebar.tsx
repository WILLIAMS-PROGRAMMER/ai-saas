"use client"

import { cn } from "@/lib/utils";
import { Code, ExternalLink, ImageIcon, LayoutDashboard, MessageSquareDiff, Music, Settings, Videotape } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, SignedOut } from "@clerk/nextjs";
import FreeCounter from "./FreeCounter";

const montserrat = Montserrat({ weight:"600", subsets: ["latin"] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-blue-500"
    },
    {
        label: "Conversation",
        icon: MessageSquareDiff,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Genration",
        icon: Videotape,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
]

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({apiLimitCount,isPro =false}: SidebarProps) => {
    const pathname = usePathname();


    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#0f1235] text-white">
            <div className="px-3 py-2 flex-1 mt-8 md:mt-0">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-24 h-8 mr-4">
                        <Image src="/logo.png" fill alt="logo" />
                    </div>
                    <h1 className={cn("text-xl font-bold", montserrat.className)}>
                        By Williams Avendano
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link key={route.href} href={route.href}
                             className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                             pathname === route.href ? " bg-white/20 text-white" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon size={24} className={cn("h-5 w-5 mr-3", route.color)} />
                                <span className="text-lg">{route.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
             
            </div>
            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount}/>
            <div className=" text-lg text-slate-200 flex flex-row gap-4 px-4">
                <ExternalLink />
                <SignOutButton />
            </div>
        </div>
     );
}
 
export default Sidebar;