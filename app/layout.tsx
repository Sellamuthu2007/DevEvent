import type { Metadata } from "next";
import { Schibsted_Grotesk,Martian_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

import LightRays from '../components/LightRays'



const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-Schibsted_Grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-Martian_Mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvnt",
  description: "The Hub for Every Dev Event that you shouldn't Miss!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "and", "h-full", "antialiased", schibstedGrotesk.variable, martianMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
    <div className = 'absolute  inset-0 top-0 z-[-1] min-h-screen'>
    <LightRays
    raysOrigin="top-center"
    raysColor="#5dfeca"
    raysSpeed={1}
    lightSpread={0.5}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.01}
    noiseAmount={0}
    distortion={0}
    pulsating={false}
    fadeDistance={1}
    saturation={1}
    />
  </div>
  <main>
    <Navbar/>
    {children}
  </main>
      </body>
    </html>
  );
}
