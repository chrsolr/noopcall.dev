import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

function Typography<T extends ElementType = "p">({ as, ...props }: Props<T>) {
  const Component = as || "p";
  return <Component {...props} />;
}

Typography.displayName = "Typography";

export { Typography };
