import { LoaderIcon } from "lucide-react";

interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullScreenLoader = ({
  label,
  className,
}: FullScreenLoaderProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-2 ${className}`}
    >
      <LoaderIcon className="animate-spin text-muted-foreground size-6" />
      {label && <span className="text-sm text-muted-foreground  animate-pulse">{label}</span>}
    </div>
  );
};
