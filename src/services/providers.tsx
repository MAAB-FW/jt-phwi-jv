import React from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default Providers;
