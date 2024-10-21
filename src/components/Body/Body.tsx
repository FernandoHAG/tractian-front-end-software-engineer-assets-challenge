import { ReactNode } from "react";
import "./Body.css";

type propsType = {
  children: ReactNode;
};

const Body = ({ children }: propsType) => {
  return (
    <div className="body">
      <div className="paper">{children}</div>
    </div>
  );
};

export default Body;
