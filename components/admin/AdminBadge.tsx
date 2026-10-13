import React from "react";

interface AdminBadgeProps {
  status: string;
}

export function AdminBadge({ status }: AdminBadgeProps) {
  let bgClass = "bg-gray-100 text-gray-800";
  
  switch (status.toUpperCase()) {
    case "NEW":
      bgClass = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "CONTACTED":
    case "SCHEDULED":
      bgClass = "bg-yellow-50 text-yellow-700 border-yellow-200";
      break;
    case "QUALIFIED":
    case "QUOTATION":
      bgClass = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case "CONVERTED":
    case "COMPLETED":
      bgClass = "bg-green-50 text-green-700 border-green-200";
      break;
    case "LOST":
    case "CANCELLED":
      bgClass = "bg-red-50 text-red-700 border-red-200";
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] font-semibold tracking-wider uppercase border ${bgClass}`}>
      {status}
    </span>
  );
}
