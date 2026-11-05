import { useRef, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Layout";
import { formatDuration, formatPrice } from "@/components/site/ServiceCard";
import { bookingSteps, services } from "@/lib/content";
import { dateLabel, demoDates, demoSlots } from "@/lib/demo-booking";
import { cn } from "@/lib/utils";

const primary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40";

export function DemoBooking({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState(initialService ?? "");
  const [dates] = useState(() => demoDates());
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const service = services.find((item) => item.slug === slug);
  const slots = service && date ? demoSlots(date, service.durationMinutes) : [];
  const validSlot = Boolean(service && dates.includes(date) && slots.includes(time));
  const go = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const reset = () => {
    setSlug("");
    setDate("");
    setTime("");
    setAcknowledged(false);
    go(0);
  };

  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="İnteraktif portföy demosu"
        title="Randevu deneyimini keşfet"
        description="Bir hizmet seç, örnek takvimi dene ve sonuç ekranını gör. İşlem yalnızca bu sayfada canlandırılır."
      />
      <div className="mt-6 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        <strong>Demo modu.</strong> Tarihler, müsaitlik ve süreler örnektir. Gerçek rezervasyon,
        ödeme, e-posta veya WhatsApp mesajı oluşturulmaz. Kişisel bilgi girmen gerekmez.
      </div>
      <ol className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Demo adımları">
        {bookingSteps.map((item, index) => (
          <li
            key={item.title}
            aria-current={step === index ? "step" : undefined}
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm",
              index === step
                ? "border-primary bg-primary/10"
                : "border-border text-muted-foreground",
            )}
          >
            <span className="mr-2 font-semibold">{index + 1}.</span>
            {item.title}
          </li>
        ))}
      </ol>
      <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 text-2xl focus:outline-none">
            {["Hizmetini seç", "Örnek tarih ve saat", "Deneme bilgileri", "Demo tamamlandı"][step]}
          </h2>
          {step === 0 && (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    aria-pressed={slug === item.slug}
                    onClick={() => {
                      setSlug(item.slug);
                      setTime("");
                      setAcknowledged(false);
                    }}
                    className={cn(
                      "h-full w-full rounded-2xl border p-4 text-left transition-colors",
                      slug === item.slug
                        ? "border-primary bg-primary/10 ring-2 ring-ring/30"
                        : "border-border hover:border-primary",
                    )}
                  >
                    <span className="block font-medium">{item.name}</span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      {item.shortDescription}
                    </span>
                    <span className="mt-3 block text-sm">
                      {formatDuration(item.durationMinutes)} · Örnek süre
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {step === 1 && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                Türkiye saati (UTC+3). Pazar kapalıdır. Hizmet süresine sığan örnek saatler
                gösterilir.
              </p>
              <fieldset className="mt-5">
                <legend className="mb-3 text-sm font-semibold">Tarih seç</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {dates.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={Boolean(
                        service && demoSlots(item, service.durationMinutes).length === 0,
                      )}
                      aria-pressed={date === item}
                      onClick={() => {
                        setDate(item);
                        setTime("");
                        setAcknowledged(false);
                      }}
                      className={cn(
                        "min-h-12 rounded-xl border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40",
                        date === item
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary",
                      )}
                    >
                      {dateLabel(item)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="mb-3 text-sm font-semibold">Saat seç</legend>
                {!date ? (
                  <p className="text-sm text-muted-foreground">
                    Saatleri görmek için bir tarih seç.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={time === item}
                        onClick={() => {
                          setTime(item);
                          setAcknowledged(false);
                        }}
                        className={cn(
                          "min-h-11 rounded-xl border px-3 text-sm",
                          time === item
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary",
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </fieldset>
            </>
          )}
          {step === 2 && (
            <div className="mt-5 space-y-5">
              <p className="text-sm text-muted-foreground">
                Gerçek iletişim bilgisi yerine hazır örnek bilgiler kullanılır. Veriler kaydedilmez
                veya gönderilmez.
              </p>
              <div>
                <label htmlFor="demo-name" className="mb-2 block text-sm font-medium">
                  Örnek ziyaretçi
                </label>
                <input
                  id="demo-name"
                  readOnly
                  value="Demo Ziyaretçi"
                  className="h-12 w-full rounded-xl border border-border bg-muted px-4 text-sm"
                />
              </div>
              <div>
                <label htmlFor="demo-email" className="mb-2 block text-sm font-medium">
                  Örnek e-posta
                </label>
                <input
                  id="demo-email"
                  readOnly
                  value="demo@example.com"
                  className="h-12 w-full rounded-xl border border-border bg-muted px-4 text-sm"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(event) => setAcknowledged(event.target.checked)}
                  className="mt-1 size-4 shrink-0"
                />
                Bu işlemin bir demo olduğunu ve gerçek randevu oluşturmadığını anladım.
              </label>
            </div>
          )}
          {step === 3 && (
            <div className="mt-6" role="status">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check aria-hidden />
              </span>
              <p className="mt-4 text-lg font-medium">Akışı başarıyla denedin.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Bu bir rezervasyon onayı değildir. Hiçbir işletmeye veya müşteriye bildirim
                gönderilmedi; hiçbir saat ayrılmadı. Sayfayı yenilediğinde seçimler silinir.
              </p>
              <button type="button" onClick={reset} className={cn(primary, "mt-6")}>
                Demoyu yeniden dene
              </button>
            </div>
          )}
          {step < 3 && (
            <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-border pt-5">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="inline-flex min-h-12 items-center gap-1 rounded-full border border-border px-5 text-sm"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Geri
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                className={primary}
                disabled={
                  step === 0 ? !service : step === 1 ? !validSlot : !validSlot || !acknowledged
                }
                onClick={() => go(step + 1)}
              >
                {["Tarih ve saat seç", "Bilgileri incele", "Demoyu tamamla"][step]}
              </button>
            </div>
          )}
        </div>
        <aside className="rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <p className="eyebrow">{step === 3 ? "Demo sonucu" : "Seçim özeti"}</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Hizmet</dt>
              <dd className="mt-1 font-medium">{service?.name ?? "Henüz seçilmedi"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Örnek süre</dt>
              <dd className="mt-1">{service ? formatDuration(service.durationMinutes) : "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Tarih ve saat</dt>
              <dd className="mt-1">
                {date ? dateLabel(date) : "Henüz seçilmedi"}
                {time ? ` · ${time}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fiyat bilgisi</dt>
              <dd className="mt-1">{service ? formatPrice(service) : "Doğrulanmamıştır"}</dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Portföy çalışmasıdır. İşletme bilgileri, görseller, süreler ve çalışma saatleri
            örnektir. Ödeme alınmaz.
          </p>
        </aside>
      </div>
    </Section>
  );
}
