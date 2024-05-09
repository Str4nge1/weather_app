import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

const MainContent: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => (
  <div className={classNames("h-full py-8 px-4", className)}>{children}</div>
);

export default MainContent;
