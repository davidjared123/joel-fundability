import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero/hero-image.jpg"; // reemplaza con la imagen que uses

import HomeNavbar from "@/components/HomeNavbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <HomeNavbar />

      {/* Hero Section */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 lg:py-24 gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Your Path to a <span className="text-blue-600">Brighter Financial Future</span>
          </h2>
          <p className="text-lg text-gray-600">Start building your business credit today.</p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Explore More
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img src={heroImg} alt="Hero Illustration" className="w-full rounded-lg shadow-md" />
        </div>
      </main>
    </div>
  );
}
