import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

type ChildrenWithClassName = PropsWithChildren<{ className?: string }>;

const Card: FC<ChildrenWithClassName> & {
  Header: FC<ChildrenWithClassName>;
  Body: FC<ChildrenWithClassName>;
  Footer: FC<ChildrenWithClassName>;
} = ({ className, children }) => (
  <div
    className={classNames(
      "w-full flex flex-col justify-center p-2 rounded-lg shadow-md overflow-auto",
      className
    )}
  >
    {children}
  </div>
);

const Header: FC<ChildrenWithClassName> = ({ className, children }) => {
  return (
    <div className={classNames("px-2 py-3 sm:px-6", className)}>{children}</div>
  );
};

const Body: FC<ChildrenWithClassName> = ({ className, children }) => {
  return (
    <div className={classNames("px-2 py-3 sm:p-6", className)}>{children}</div>
  );
};

const Footer: FC<ChildrenWithClassName> = ({ className, children }) => {
  return (
    <div className={classNames("px-2 py-3 sm:px-6", className)}>{children}</div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
