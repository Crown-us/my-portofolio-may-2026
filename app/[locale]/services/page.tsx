import { permanentRedirect } from "next/navigation";
export default async function LegacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect("/" + locale + "/about#collaboration");
}
