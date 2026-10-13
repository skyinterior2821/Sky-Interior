"use client";

import Link from "next/link";
import { AdminMessage } from "@/lib/admin/types";
import { MessageDetail } from "@/components/admin/messages/MessageDetail";

interface MessagePageClientProps {
  message: AdminMessage;
}

export function MessagePageClient({ message }: MessagePageClientProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/messages" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Messages
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Message Details</h1>
        </div>
      </div>

      <MessageDetail message={message} />
    </div>
  );
}
