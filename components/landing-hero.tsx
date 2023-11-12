"use client";

import { useAuth } from "@clerk/nextjs";
import TrypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>AI Generated Ideas for...</h1>
        <div className="pb-4 text-transparent bg-clip-text bg-gradient-to-r bg-pink-400">
          <TrypewriterComponent
            options={{
              strings: ["Chats", "Images", "Music", "Video", "Code"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-x-4 pt-[34px]">
        <Link href={isSignedIn ? "/chat" : "/sign-up"}>
          <Button className="md:text-lg p-4 md:p-6 font-semibold bg-indigo-500 hover:bg-indigo-600 w-[120px] md:w-[160px] border-2 border-indigo-500">
            Get Started
          </Button>
        </Link>
        {/* <Link href="/chat">
          <Button className="md:text-lg p-4 md:p-6 font-semibold w-[120px] md:w-[160px] border-2 border-slate-600 hover:bg-slate-700 hover:border-slate-600">
            UI Demo
          </Button>
        </Link> */}
      </div>
      <div className="border-2 border-white/10 flex mt-24 flex-col items-center mx-auto text-zinc-400 text-sm md:text-lg font-light w-72 md:w-[375px] p-4 md:p-6 bg-[#6085d41b] rounded-lg ">
        <p className="underline underline-offset-4 pb-2 font-semibold">PLEASE NOTE</p>
        <p className="text-left">
          In order to use chatJelly you will need to create a free account after clicking<span className="font-semibold text-zinc-200"> Get Started.</span> OpenAI will not work without user authentication.
        </p>
      </div>
    </div>
  );
};

export default LandingHero;
