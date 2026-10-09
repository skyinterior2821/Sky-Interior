import { getAdminMessageById } from "@/lib/admin/message-service";
import { notFound } from "next/navigation";
import { MessagePageClient } from "@/components/admin/messages/MessagePageClient";

interface MessageDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetailPage({ params }: MessageDetailPageProps) {
  const { id } = await params;
  const message = await getAdminMessageById(id);

  if (!message) {
    notFound();
  }

  return <MessagePageClient message={message} />;
}
