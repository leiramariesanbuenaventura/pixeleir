import type { Metadata } from "next";
import GradualBlur from "./components/animations/gradual-blur";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Montserrat, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const gordon = localFont({
  src: "../../public/fonts/cs-gordon.otf",
  variable: "--font-gordon-font",
});
const dreams = localFont({
  src: "../../public/fonts/dreams.ttf",
  variable: "--font-dreams-font",
});

const rcdemo = localFont({
  src: "../../public/fonts/rc-demo.otf",
  variable: "--font-rcdemo-font",
});

export const metadata: Metadata = {
  title: "Pixeleir",
  description: "Developed by Lxeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", montserrat.variable, gordon.variable, dreams.variable, rcdemo.variable, "font-sans", geist.variable)}
    >
      {/* Setting Montserrat as the default font-sans for the entire app */}

      <body className="min-h-full flex flex-col font-sans">
        <Navbar />

        {children}

        {/* Footer should be inside <body> to avoid hydration errors. */}
        <Footer />

        {/* Bottom edge blur
        <GradualBlur
          position="bottom"
          target="page"
          height="5rem"
          strength={1}
          divCount={8}
          curve="ease-out"
          zIndex={50}
        /> */}
      </body>
    </html>
  );
}
