import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "react-router-dom";

type Props = {
  isActive?: boolean;
  isExternal?: boolean;
} & LinkProps;

function Anchor({
  to,
  children,
  className,
  isActive,
  isExternal,
  ...props
}: Props) {
  if (isExternal) {
    return (
      <a
        href={to as string}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className={
          cn(
            isActive ? "text-amber-300" : "text-rose-400",
            "hover:text-violet-300 active:text-amber-300 no-underline relative link-decorated",
          ) + className
        }
      >
        {"_" + children + "_"}
      </a>
    );
  }

  return (
    <Link
      to={to}
      {...props}
      className={
        cn(
          isActive ? "text-amber-300" : "text-rose-400",
          "hover:text-violet-300 active:text-amber-300 no-underline relative link-decorated",
        ) + className
      }
    >
      {"_" + children + "_"}
    </Link>
  );
}

export { Anchor as Link };
