"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastsContext = React.createContext<typeof toast>(toast);

const useToasts = () => React.useContext(toastsContext);

const ToastsProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <toastsContext.Provider value={toast}>
      {children}
      <ToastContainer
        closeButton={false}
        hideProgressBar
        limit={1}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
      />
    </toastsContext.Provider>
  );
};

export { useToasts, ToastsProvider };
