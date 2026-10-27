import { Fragment } from "react";
import { isHttpsUrl } from "@/lib/domain";
function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https:\/\/[^)]+\))/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={index}>{part.slice(1, -1)}</code>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && isHttpsUrl(link[2]))
        return (
          <a
            key={index}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link[1]}
          </a>
        );
      return <Fragment key={index}>{part}</Fragment>;
    });
}
export default function ProductDescription({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, index) => {
          if (/^#{1,6} /.test(block))
            return <h3 key={index}>{inline(block.replace(/^#{1,6} /, ""))}</h3>;
          if (block.split("\n").every((line) => /^[-*] /.test(line)))
            return (
              <ul key={index}>
                {block.split("\n").map((line, i) => (
                  <li key={i}>{inline(line.slice(2))}</li>
                ))}
              </ul>
            );
          return <p key={index}>{inline(block)}</p>;
        })}
    </>
  );
}
