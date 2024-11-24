"use client";
import { RotateCw } from "lucide-react";

const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background text-center">
      <RotateCw className="animate-spin text-primary" size={100} />
    </div>
  );
};

export default loading;
