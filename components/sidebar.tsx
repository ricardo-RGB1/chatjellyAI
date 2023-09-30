"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FreeCounter from "./free-counter";

const routes = [
  // {
  //   label: "Dashboard",
  //   icon: LayoutDashboard,
  //   href: "/dashboard",
  // },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    label: "Image",
    icon: ImageIcon,
    href: "/image",
  },
  {
    label: "Video",
    icon: VideoIcon,
    href: "/video",
  },
  {
    label: "Music",
    icon: Music,
    href: "/music",
  },
  {
    label: "Code",
    icon: Code,
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

// create an interface for Sidebar so it accepts a prop of type count
interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827]">
      <div className="px-2 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center px-4 mb-11">
          <div className="relative w-8 h-8 mr-4 ">
            <Image fill alt="Logo" src="/logo.svg" />
          </div>
          <h1 className="cocon-pro text-2xl text-violet-50 ml-[-8px]">
            chatJelly
          </h1>
        </Link>
        <div className="space-y-1 ">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-neutral-300 hover:bg-[#3e558c70] rounded-sm transition",
                pathname === route.href
                  ? "text-slate-300 bg-[#3e558c70]"
                  : "text-slate-500"
              )}
            >
              <div className="flex items-center flex-1 px-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        {/* LINK TO STARCHAT */}
        <div className="p-3 ml-2 flex flex-col justify-left items-center mt-14">
          <Link href="https://www.apple.com/" target="_blank">
            <Button
              size="sm"
              className="bg-slate-600 border-2 border-slate-500/90  
            hover:bg-slate-500 hover:shadow-xl  hover:shadow-slate-600/80 good-times tracking-normal transition"
            >
              STARCHAT
            </Button>
          </Link>
          <p className="text-white/50 mt-4 text-sm font-light">
            Try STARCHAT{"\u00AE"} for fun!
          </p>
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
