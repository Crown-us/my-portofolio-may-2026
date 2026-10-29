export const postTypes = ["news", "guide", "comparison"] as const;
export type PostType = (typeof postTypes)[number];
export const postTypeLabels = {
  id: { news: "Berita", guide: "Panduan", comparison: "Perbandingan" },
  en: { news: "News", guide: "Guides", comparison: "Comparisons" },
};
export function isPostType(value: unknown): value is PostType {
  return typeof value === "string" && postTypes.some((type) => type === value);
}
