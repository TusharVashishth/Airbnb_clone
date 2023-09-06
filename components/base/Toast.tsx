"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const params = useSearchParams();
  useEffect(() => {
    if (params?.get("error")) {
      toast.error(params.get("error"), { type: "error", theme: "colored" });
    } else if (params?.get("success")) {
      toast.success(params.get("success"), { theme: "colored" });
    }
  }, [params]);

  return (
    <>
      <ToastContainer />
    </>
  );
}
