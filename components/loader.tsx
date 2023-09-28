import Image from "next/image"

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-pulse-fast">
            <Image src="/logo.svg" alt="logo" fill />
        </div>
        <p className="text-md text-muted-foreground ">
            Jellyfish is thinking...
        </p>
    </div>
  )
}

export default Loader