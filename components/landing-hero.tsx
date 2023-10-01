"use client";

import { useAuth } from "@clerk/nextjs";
import TrypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-8">
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
      <div className="flex justify-center gap-x-4">
        <Link href={isSignedIn ? "/chat" : "/sign-up"}>
          <Button className="md:text-lg p-4 md:p-6 font-semibold bg-indigo-500 hover:bg-indigo-600 w-[120px] md:w-[160px] border-2 border-indigo-500">
            Try for free
          </Button>
        </Link>
        <Link href="/chat">
          <Button className="md:text-lg p-4 md:p-6 font-semibold w-[120px] md:w-[160px] border-2 hover:bg-slate-700 hover:border-slate-600">
            UI Demo
          </Button>
        </Link>
      </div>
      <div className="border-2 border-white/10 flex flex-col items-center mx-auto text-zinc-400 text-sm md:text-lg font-normal w-72 md:w-[340px] p-5 md:p-6 bg-[#6085d41b] rounded-lg ">
        <p className="underline underline-offset-4 pb-2">PLEASE NOTE</p>
        <p className="text-left">
          In order to use chatJelly, you
          <span className="italic"> MUST </span>sign up to provide
          authentication. You may explore only the UI without signing up.
        </p>
      </div>
    </div>
  );
};

export default LandingHero;
