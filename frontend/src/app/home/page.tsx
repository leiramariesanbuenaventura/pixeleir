import HeroSection1 from "./sections/hero-section-1";
import SneakPeekSection2 from "./sections/sneak-peek-2";
import IntroSection3 from "./sections/introduction-section-3";
import ToolsUsedSection4 from "./sections/tools-used-section-4";
import SkillsSection5 from "./sections/skills-section-5";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Grainient from "../components/granient-background";

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col bg-[#fffdf4]">
            {/* ── Grainient background tuned to match the dark navy/blue of the reference ── */}
                  <div className="absolute inset-0 z-0">
                    <Grainient
                      color1="#001287"   // vivid blue highlight
                      color2="#000c47"   // deep navy mid
                      color3="#05093a"   // near-black dark corner
                      colorBalance={0.1}
                      warpStrength={1.2}
                      warpFrequency={4.0}
                      warpSpeed={1.0}
                      warpAmplitude={60}
                      blendAngle={-30}
                      blendSoftness={0.12}
                      rotationAmount={300}
                      noiseScale={1.8}
                      grainAmount={0.06}
                      grainScale={1.5}
                      grainAnimated={false}
                      contrast={1.6}
                      gamma={1.1}
                      saturation={1.3}
                      zoom={0.85}
                      timeSpeed={0.18}
                      className="w-full h-full"
                    />
                  </div>
            {/* <Navbar /> */}
            <HeroSection1 />
            <SneakPeekSection2 />
            <IntroSection3 />
            <ToolsUsedSection4 />
            <SkillsSection5 />
            {/* <Footer /> */}
        </main>
    );
}
