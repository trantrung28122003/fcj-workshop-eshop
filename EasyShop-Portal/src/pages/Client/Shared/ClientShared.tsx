import React from "react";
import type { ReactNode } from "react";
import Navbar from "../../../components/navbar/Navbar";
interface ClientProps {
  children: ReactNode;
}

const ClientShared: React.FC<ClientProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ClientShared;
