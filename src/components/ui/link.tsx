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
      className={className + cn("no-underline relative link-decorated")}
      {...props}
    >
      {children}
    </a>
  );
}

const ForwardedLink = React.forwardRef<HTMLAnchorElement, Props>(Link);

ForwardedLink.displayName = "Link";

export { ForwardedLink as Link };
