export default function Footer() {
  return (
    <footer className="bg-[#000027] py-12 px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#000023] text-[#3b5bff]">
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #3b5bff 1px, transparent 0)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative z-10 p-10 md:p-12">
          {/* Top Section */}
          <div className="grid gap-10 md:grid-cols-4">
            {/* Shop */}
            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wide">
                Shop
              </h3>

              <ul className="space-y-2 text-xs font-semibold uppercase">
                <li>Loungi</li>
                <li>Peachi</li>
                <li>Plumpi</li>
                <li>Tootsi</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wide">
                About
              </h3>

              <ul className="space-y-2 text-xs font-semibold uppercase">
                <li>Our Story</li>
                <li>FAQs</li>
                <li>Setup</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wide">
                Legal
              </h3>

              <ul className="space-y-2 text-xs font-semibold uppercase">
                <li>Returns</li>
                <li>Policy</li>
                <li>Terms</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wide">
                Newsletter Signup
              </h3>

              <form className="space-y-5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="h-12 w-full rounded-full border-none bg-white px-6 text-sm text-black outline-none"
                />

                <div className="flex items-center gap-4">
                  {/* PUT THE ICONS */}
                </div>

                <p className="text-xs opacity-70">© Grumpi 2025</p>
              </form>
            </div>
          </div>

          {/* Bottom Brand Section */}
          <div className="relative mt-16">
            {/* Circular Logo */}
            <div className="absolute left-1/2 top-0 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3b5bff] text-[#000023]">
              <span className="text-[10px] font-black uppercase text-center leading-tight">
                <img
                  src="/svg/illus-mascot-wink.svg"
                  alt=""
                  aria-hidden="true"
                  className="relative z-20 hidden md:block"
                  style={{
                    width: "12vw",
                    maxWidth: "500px",
                    right: "5%",
                    top: "15%",
                    transform: "translateY(-10%)",
                  }}
                />
              </span>
            </div>

            {/* Huge Wordmark */}
            <h2 className="w-full select-none text-center text-[3rem] font-black uppercase leading-none tracking-tighter md:text-[10rem]">
              PORTFOLIO
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.68h-3.17v12.44a2.9 2.9 0 1 1-2.9-2.9c.3 0 .58.04.85.12V8.44a6.1 6.1 0 1 0 5.22 6.01V8.13a8.05 8.05 0 0 0 4.77 1.57V6.69z" />
    </svg>
  );
}
