"use client";
import FallingText from "@/app/components/animations/falling-text";

export default function IntroSection3() {
  return (
    <section
      className="relative text-white w-full flex flex-col bg-[#000027]"
      style={{ height: "100%", overflow: "hidden" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-4 z-10">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-start gap-2 text-left uppercase tracking-[-0.12em] text-7xl font-bold">
            
            {/* Plain white — no gradient */}
            <p className="text-xs sm:text-sm tracking-normal font-sans normal-case my-3 text-white">
              Hey there again, I'm
            </p>

            {/* Single wrapper so gradient spans both lines */}
            <div
              style={{
                background: "linear-gradient(to right, #3533cd, #00071b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}
            >
              <h2>Leira</h2>
              <h2>Marie</h2>
            </div>

          </div>
          <img
            src="/svg/illus-mascot-smile.svg"
            alt=""
            aria-hidden="true"
            className="relative z-20 hidden md:block"
            style={{
              width: "18vw",
              maxWidth: "500px",
              right: "5%",
              top: "15%",
              transform: "translateY(-10%)",
            }}
          />
        </div>

        <p className="text-xs sm:text-sm font-sans text-center max-w-md text-white/90">
          I am a highly{" "}
          <span className="font-bold text-[#004fff]">inquisitive and motivated</span> Computer
          Science student specializing in{" "}
          <span className="font-bold text-[#004fff]">Application Development</span>.
        </p>
      </div>

      <div className="w-full absolute z-20 top-0 bottom-0 left-0 h-full">
        <FallingText
          text="UI/UXDesigner Prototyping Wireframing MobileDevelopment WebsiteDevelopment SoftwareDevelopment FrontendDevelopment ProductDesign DesignThinking BackendDevelopment QualityAssurance"
          highlightWords={[
            "UI/UXDesigner",
            "WebsiteDevelopment",
            "FrontendDevelopment",
            "BackendDevelopment",
          ]}
          trigger="auto"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="1rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    </section>
  );
}