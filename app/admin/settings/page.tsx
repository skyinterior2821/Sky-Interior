import { getSettings } from "@/lib/admin/settings-service";
import { SettingsPageClient } from "@/components/admin/settings/SettingsPageClient";

export default async function SettingsPage() {
  const settings = await getSettings();

  return <SettingsPageClient initialSettings={settings} />;
}
