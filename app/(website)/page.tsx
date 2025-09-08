"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import HeroSection from "@/components/website/hero-section";
import SocialProof from "@/components/website/social-proof";
import FeaturesOverview from "@/components/website/features-overview";
import HowItWorks from "@/components/website/how-it-works";
import Testimonials from "@/components/website/testimonials";
import PricingSnippet from "@/components/website/pricing-snippet";
import FinalCTA from "@/components/website/final-cta";
import FAQ from "@/components/website/faq";
import BenefitsSection from "@/components/website/benefits-section";
import RatingSection from "@/components/website/rating-section";
import FinalSaleBanner from "@/components/website/final-sale-banner";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const HARDCODED_EMAIL = "bababilling@gmail.com";
  const HARDCODED_PASSWORD = "123456";

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      router.push("/dashboard/home");
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="mb-4 text-center text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}