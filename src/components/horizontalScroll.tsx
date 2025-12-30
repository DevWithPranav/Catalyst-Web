"use client";

const HorizontalScrollCards = () => {
  const data = [
    {
      id: 1,
      company: "Google",
      logo: "https://cdn.simpleicons.org/google/ffffff",
      year: "2009",
      category: "Technology",
    },
    {
      id: 2,
      company: "Microsoft",
      logo: "https://cdn.simpleicons.org/microsoft/ffffff",
      year: "2013",
      category: "Software",
    },
    {
      id: 3,
      company: "Amazon",
      logo: "https://cdn.simpleicons.org/amazon/ffffff",
      year: "2018",
      category: "Cloud",
    },
    {
      id: 4,
      company: "Intel",
      logo: "https://cdn.simpleicons.org/intel/ffffff",
      year: "2022",
      category: "Semiconductors",
    },
  ];

  return (
    <div className="w-full overflow-x-auto mt-5">
      <div className="flex gap-12 px-24">
        {data.map((item) => (
          <div
            key={item.id}
            className="min-w-[320px] relative p-[1px] rounded-2xl
            bg-[linear-gradient(10deg,rgba(255,255,255,0.6),rgba(255,255,255,0),rgba(255,255,255,0.6))]"
          >
            <div
              className="rounded-2xl p-10 h-full
              bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B]
              flex flex-col items-center justify-center gap-6"
            >
              {/* Logo */}
              <img
                src={item.logo}
                className="h-16 object-contain grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.simpleicons.org/building/ffffff";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollCards;
