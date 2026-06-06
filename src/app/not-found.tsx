import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg text-center">
      <div className="px-6">
        <span className="text-[20vw] font-heading font-[800] text-primary/10 leading-none block">
          404
        </span>
        <h1 className="text-3xl md:text-5xl font-[800] uppercase -mt-8 mb-4 text-ink">
          Página no encontrada
        </h1>
        <p className="text-body mb-10 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida.
        </p>
        <Button href="/" variant="gold">
          Volver al Inicio
        </Button>
      </div>
    </section>
  );
}
