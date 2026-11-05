import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Layout";
export const Route = createFileRoute("/randevu-ve-iptal-kosullari")({
  head: () => ({
    meta: [
      { title: "Randevu Demosunun İşleyişi | Hazel Studio Demo" },
      { name: "description", content: "Portföy demosunun sınırları ve örnek akış." },
    ],
  }),
  component: InfoPage,
});
function InfoPage() {
  return (
    <Section>
      <SectionHeading as="h1" eyebrow="Portföy demosu" title="Randevu Demosunun İşleyişi" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg text-foreground">Örnek randevu akışı</h2>
          <p className="mt-2">
            Hizmet, tarih ve saat seçip hazır deneme bilgileriyle sonuç ekranına ulaşabilirsin.
            Görünen müsaitlik gerçek değildir; hiçbir saat sana ayrılmaz.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Değiştirme ve sıfırlama</h2>
          <p className="mt-2">
            Geri düğmesiyle seçimlerini değiştirebilirsin. Hizmeti veya tarihi değiştirmek saat
            seçimini temizler. Sonuç ekranındaki yeniden dene düğmesi akışı sıfırlar.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Gerçek hizmet koşulları</h2>
          <p className="mt-2">
            Bu demo gerçek rezervasyon kabul etmez. Ücret, iptal, gecikme veya gelmeme koşulları
            oluşturmaz. İşletmeyle gerçek bir çalışma yapılırsa doğrulanmış bilgiler ayrıca
            tanımlanmalıdır.
          </p>
        </section>
      </div>
    </Section>
  );
}
