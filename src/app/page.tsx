import Gallery from "@/components/Gallery";
import gallery from "@/data/gallery";

export default function Page() {
  return (
    <main className="px-4 py-8">
      {/* …твои секции выше… */}
      <section className="py-6">
        <Gallery items={gallery} />
      </section>
      {/* …твои секции ниже… */}
    </main>
  );
}
