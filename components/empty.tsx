import Image from "next/image";

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full  p-20 flex flex-col items-center justify-center">
      <div className="relative h-52 w-52">
        <Image src="/empty.png" fill alt="Empty" />
      </div>
      <p className="text-muted-foreground text-md text-center mt-5">
        {label}
      </p>
    </div>
  );
};

export default Empty;
