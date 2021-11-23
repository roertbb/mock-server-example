import * as React from "react";

function Label({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label style={{ display: "block" }} {...props}>
      {children}
    </label>
  );
}

export default Label;
