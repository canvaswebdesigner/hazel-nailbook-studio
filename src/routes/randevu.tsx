import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DemoBooking } from "@/components/site/DemoBooking";
const title = "Randevu Demosu | Hazel Ağaoğlu Nail Art Studio";
const description =
  "Hizmet, örnek tarih ve saat seçimini uçtan uca dene. Bu portföy demosu gerçek rezervasyon veya mesaj oluşturmaz.";
export const Route = createFileRoute("/randevu")({
  validateSearch: z.object({ hizmet: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
});
function BookingPage() {
  const { hizmet } = Route.useSearch();
  return <DemoBooking key={hizmet ?? "all"} initialService={hizmet} />;
}
