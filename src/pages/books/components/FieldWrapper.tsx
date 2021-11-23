import * as React from "react";

type FieldWrapperProps = {
  children: React.ReactNode;
};

function FieldWrapper({ children }: FieldWrapperProps) {
  return <div style={{ margin: "16px 0 16px 0" }}>{children}</div>;
}

export default FieldWrapper;
