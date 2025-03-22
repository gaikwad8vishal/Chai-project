import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import axios from "axios";

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


export function LandingHome(){


  return <div>
    here is advatisement
  </div>
}