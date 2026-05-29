import type { Metadata } from "next";
import GradualBlur from "./home/animations/gradual-blur";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
      className={`${montserrat.variable} ${gordon.variable} ${dreams.variable} ${rcdemo.variable} h-full antialiased`}
    >
      {/* Setting Montserrat as the default font-sans for the entire app */}

      <body className="min-h-full flex flex-col font-sans">
        <Navbar />

        
        {children}
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
      <Footer />
    </html>
  );
}
