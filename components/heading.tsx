import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({
  title,
  description
}: HeadingProps) => {
  return (
    <div className="m-8 text-center">
      <h2 className="text-3xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
