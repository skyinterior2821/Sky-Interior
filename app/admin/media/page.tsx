import { getAdminMedia, getMediaKPIs } from "@/lib/admin/media-service";
import { MediaPageClient } from "@/components/admin/media/MediaPageClient";

export default async function MediaLibraryPage() {
  const [media, kpis] = await Promise.all([
    getAdminMedia(),
    getMediaKPIs()
  ]);

  return <MediaPageClient initialMedia={media} kpis={kpis} />;
}
