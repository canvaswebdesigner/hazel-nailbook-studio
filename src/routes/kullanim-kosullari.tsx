import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Layout";
export const Route = createFileRoute("/kullanim-kosullari")({
  head: () => ({
    meta: [
      { title: "Demo Hakkında | Hazel Studio Demo" },
      { name: "description", content: "Bağımsız web tasarım portföy çalışması hakkında bilgi." },
    ],
  }),
  component: InfoPage,
});
function InfoPage() {
  return (
    <Section>
      <SectionHeading as="h1" eyebrow="Portföy demosu" title="Demo Hakkında" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg text-foreground">Çalışmanın amacı</h2>
          <p className="mt-2">
            Bu site, bir nail art stüdyosu için hazırlanan bağımsız tasarım ve kullanıcı deneyimi
            demosudur. Tamamlanmış ücretli müşteri teslimi veya işletmenin resmi rezervasyon kanalı
            olarak sunulmaz.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Örnek içerik</h2>
          <p className="mt-2">
            İşletme bilgileri, hizmet metinleri, süreler, çalışma saatleri ve görseller doğrulanmayı
            bekleyen örneklerdir. Fiyat veya hizmet taahhüdü oluşturmaz.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Deneyebileceğin özellikler</h2>
          <p className="mt-2">
            Hizmet sayfalarını, galeri filtrelerini, sık sorulan soruları ve dört adımlı randevu
            simülasyonunu deneyebilirsin. Ödeme veya gerçek rezervasyon yapılmaz.
          </p>
        </section>
      </div>
    </Section>
  );
}
