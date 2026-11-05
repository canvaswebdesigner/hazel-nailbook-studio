import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Layout";
export const Route = createFileRoute("/gizlilik")({
  head: () => ({
    meta: [
      { title: "Gizlilik ve Demo Verileri | Hazel Studio Demo" },
      {
        name: "description",
        content: "Bu randevu demosunda hangi bilgilerin kullanıldığını açıklar.",
      },
    ],
  }),
  component: InfoPage,
});
function InfoPage() {
  return (
    <Section>
      <SectionHeading as="h1" eyebrow="Portföy demosu" title="Gizlilik ve Demo Verileri" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg text-foreground">Örnek bilgiler</h2>
          <p className="mt-2">
            Randevu akışında sabit Demo Ziyaretçi ve demo@example.com değerleri gösterilir. Gerçek
            ad, e-posta veya telefon bilgisi istenmez.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Seçimlerin saklanması</h2>
          <p className="mt-2">
            Hizmet, tarih ve saat seçimi yalnızca açık sayfanın geçici belleğinde tutulur. Randevu
            veritabanına yazılmaz; sayfayı yenilemek veya demoyu yeniden başlatmak seçimi temizler.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-foreground">Bildirimler</h2>
          <p className="mt-2">
            Demo tamamlama işlemi e-posta, SMS, WhatsApp mesajı veya ödeme oluşturmaz. Barındırma
            sağlayıcısının standart teknik kayıtları bu demo seçimlerinden ayrıdır.
          </p>
        </section>
      </div>
    </Section>
  );
}
