import React from "react";

export default function Alert({ msg, type, clearAlert, items }) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      clearAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [items]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
}
