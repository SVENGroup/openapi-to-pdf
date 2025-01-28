import marked from "marked";

export default function genererateToc(
  md: string,
  max_toc_level: number = 3
): string {
  let toc: { level: number; text: string; slug: string }[] = [];

  const renderer = new marked.Renderer();

  renderer.heading = (text, level, raw, slugger) => {
    const slug = slugger.slug(raw);
    toc.push({ level, text, slug });
    return text;
  };

  marked.marked(md, { renderer });

  let toc_str = "# Contents\n\n";

  toc = toc.filter((toc_item) => {
    return toc_item.level <= max_toc_level;
  })

  toc_str += toc
    .map((t) => {
      return `${Array(t.level).join("  ")}- ${t.level === 1 ? "**" : ""}[${t.text}](#${t.slug})${t.level === 1 ? "**" : ""}`;
    })
    .join("\n\n");

  toc_str += "\n\n";

  toc_str += `<div class="page-break"></div>`;
  toc_str += "\n\n";


  return toc_str;
};
