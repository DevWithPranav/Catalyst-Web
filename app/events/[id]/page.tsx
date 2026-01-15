const events = [
  {
    id: "catalyst-2025",
    title: "CATALYST 2025",
    date: "March 12, 2025",
    location: "Trivandrum",
  },
  {
    id: "hackverse",
    title: "HACKVERSE",
    date: "April 3, 2025",
    location: "Kochi",
  },
];

export default function EventsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center font-primary text-white">
        {/* Background text */}
        <h1 className="absolute text-5xl opacity-10 select-none">CATALYST</h1>

        {/* Foreground text */}
        <p className="relative text-lg tracking-wide">ACHIEVEMENTS</p>
      </section>

      {/* Events list (placeholder for now) */}
      <section className="px-6 py-10 text-white">
        {events.map((event) => (
          <div
            key={event.id}
            className="mb-4 rounded-lg border border-white/10 p-4"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="opacity-70">{event.date}</p>
            <p className="opacity-50">{event.location}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
