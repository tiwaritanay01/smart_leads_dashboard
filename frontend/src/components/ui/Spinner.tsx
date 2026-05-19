import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]"
};

const Spinner = ({ size = "md" }: SpinnerProps) => {
  return (
    <span
      className={cn(
        "inline-flex animate-spin rounded-full border-ink/20 border-t-ink",
        sizeMap[size]
      )}
      aria-label="Loading"
    />
  );
};

export default Spinner;
