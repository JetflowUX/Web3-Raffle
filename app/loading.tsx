export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-orbit">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="h-12 w-1/2 rounded-xl bg-card/60" />
        <div className="mt-6 h-6 w-2/3 rounded-lg bg-card/60" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-2xl bg-card/60 shadow-card animate-shimmer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
