import { ReactNode } from "react";

type propsType = {
  children: ReactNode;
};

const TestComponent = ({ children }: propsType) => {
  return children;
};

export default TestComponent;
