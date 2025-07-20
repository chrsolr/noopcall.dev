import { cn } from "@/lib/utils";
import React from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Link(
  { children, className, ...props }: Props,
  ref: React.Ref<HTMLAnchorElement>,
) {
  return (
    <a
      ref={ref}
      className={
        cn(
          "text-rose-400 hover:text-violet-300 active:text-amber-300 no-underline relative link-decorated",
        ) + className
      }
      {...props}
    >
      {"_" + children + "_"}
    </a>
  );
}

const ForwardedLink = React.forwardRef<HTMLAnchorElement, Props>(Link);

ForwardedLink.displayName = "Link";

export { ForwardedLink as Link };
