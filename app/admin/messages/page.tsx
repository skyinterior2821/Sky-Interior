import { MessageTable } from "@/components/admin/messages/MessageTable";
import { getAdminMessages, getMessageKPIs } from "@/lib/admin/message-service";

export default async function MessagesPage() {
  const [messages, kpis] = await Promise.all([
    getAdminMessages(),
    getMessageKPIs()
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Messages</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Review enquiries and messages submitted through the website.</p>
        </div>
      </div>

      <MessageTable initialMessages={messages} kpis={kpis} />
    </div>
  );
}
