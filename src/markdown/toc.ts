import marked from "marked";

export type TocItem = { level: number; text: string; slug: string };

export type Toc = TocItem[]

export default function genererateToc(
  md: string,
  max_toc_level?: number
): string {
  let toc: Toc = [];

  const renderer = new marked.Renderer();

  renderer.heading = (text, level, raw, slugger) => {
    const slug = slugger.slug(raw);
    toc.push({ level, text, slug });
    return text;
  };

  marked.marked(md, { renderer });

  let toc_str = "# Contents\n\n";

  if (max_toc_level) {
    toc = toc.filter((toc_item) => {
      return toc_item.level <= max_toc_level;
    })
  }

  toc_str += `|Section|Shortcut|\n`;
  toc_str += "|-|-|\n"

  toc.map((toc_item) => {

    const section_title = generateSectionTitleMarkdown(toc_item);

    toc_str += `|${section_title}|`;
    toc_str += `[Skip](#${toc_item.slug})|\n`;
  })

  toc_str += "\n\n";

  toc_str += `<div class="page-break"></div>`;
  toc_str += "\n\n";


  return toc_str;
};

function generateSectionTitleMarkdown(toc_item: TocItem): string {
  // section first levels
  if (toc_item.level === 1) {
    return `**${toc_item.text}**`;
  }

  if (['Response Headers', 'Response Body'].includes(toc_item.text)) {
    return `<ul><li>${toc_item.text}</li></ul>`;
  }

  return `${toc_item.text}<img width="460" height="1">`;
}
