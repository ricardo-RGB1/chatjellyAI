"use client";

import axios from "axios";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Check, Code, Image, MessageSquare, Music, Video, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";



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




const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);


  // the onSubscribe function is called when the user clicks on the upgrade button
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url; 
    } catch(error) {
      console.log(error, "STRIPE_CLIENT_ERROR"); 
    } finally{
      setLoading(false);
    }
  }




  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to chatJelly
                <Badge className="uppercase text-sm py-1 bg-slate-600 hover:bg-slate-600">
                    pro
                </Badge>
            </div>
          </DialogTitle> 
          <DialogDescription className="tex-center pt-2 space-y-2 text-slate-900 font-medium"> 
            {tools.map((tool) => (
              <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5"/>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            onClick={onSubscribe}
            variant='premium' 
            className="hover:from-cyan-500 hover:to-blue-500 w-full font-semibold"
            size='lg'>
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};  
export default ProModal;
