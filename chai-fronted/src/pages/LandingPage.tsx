import {  Outlet } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Blurred Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
        <Outlet/>
    </div>
  );
}


