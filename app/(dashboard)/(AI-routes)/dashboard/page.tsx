"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Chat",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/chat",
  },
  {
    label: "Image",
    icon: Image,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/image",
  },
  {
    label: "Video",
    icon: Video,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Music",
    icon: Music,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/music",
  },
  {
    label: "Code",
    icon: Code,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center w-1/2 m-auto">
          Your central hub for real-time insights and overviews of your AI
          generated ideas.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {/* Provide a Card component for each tool */}
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-600 " />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
