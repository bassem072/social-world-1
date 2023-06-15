import React from "react";
import Login from "../../components/ui/Login/Login";
import Paragraph from "../../components/ui/Paragraph/Paragraph";
import Register from "../../components/ui/Register/Register";

export default function Auth() {
  return (
    <div className="min-h-screen w-full bg-slate-100 relative">
      <div className="grid lg:grid-cols-2">
        <div className="flex justify-center lg:justify-end pt-12 lg:pt-52 pr-2">
          <Paragraph />
        </div>
        <div className="flex justify-center items-center pt-12 lg:pt-20">
          <Login/>
        </div>
      </div>
      <Register/>
    </div>
  );
}
