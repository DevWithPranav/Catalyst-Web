const HorizontalScroll = () => {
  const data = [
    {
      year: "2009",
      text: "Catalyst the innovation and entrepreneurship development center of Mar Baselios College of Engineering and Technology was inaugurated",
    },
    {
      year: "2013",
      text: "Catalyst the innovation and entrepreneurship development center of Mar Baselios College of Engineering and Technology was inaugurated",
    },
    {
      year: "2018",
      text: "Catalyst the innovation and entrepreneurship development center of Mar Baselios College of Engineering and Technology was inaugurated",
    },
  ];

  return (
    <div className="w-full overflow-x-auto py-24">
      <div className="flex items-center px-24">
        {data.map((item, i) => (
          <div
            key={i}
            className="relative min-w-[320px] flex flex-col items-center text-center"
          >
            <h3 className="font-primary text-4xl mb-8">{item.year}</h3>

            <div className="relative flex items-center w-full justify-center">
              <div className="z-10 bg-white h-7 w-7 rounded-full shadow-[0_0_30px_rgba(255,255,255,1)]" />

              {i !== data.length - 1 && (
                <div className="absolute left-1/2 top-1/2 h-1 w-full bg-white translate-y-[-50%]" />
              )}
            </div>

            <p className="mt-8 max-w-[260px] text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
