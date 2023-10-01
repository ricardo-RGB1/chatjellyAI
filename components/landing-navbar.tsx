'use client';

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"; // used for client side auth





export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href='/chat' className="flex items-center mt-2">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        fill
                        alt="Logo"
                        src='/logo.svg'
                    />
                </div>
                <h1 className="text-2xl font-bold text-white cocon-pro">
                    chatJelly
                </h1>
            </Link>
            {/* <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/chat" : "/sign-up"}>
                    <Button variant='outline' className="hover:bg-slate-200">
                        Get Started
                    </Button>
                </Link>
            </div> */}
        </nav>
    )
}