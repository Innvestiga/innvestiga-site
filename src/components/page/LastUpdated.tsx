// "Última actualización" line for country pages and the FAQ page.
export default function LastUpdated({ date }: { date: string }) {
  const label = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
  return (
    <p className="text-[12px] text-muted">
      Última actualización: <time dateTime={date}>{label}</time>
    </p>
  );
}
