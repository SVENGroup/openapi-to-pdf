import toMarkdown from "./markdown";

export async function toHtml(
  oas: string): Promise<string> {

  // parse oas to markdown
  const markdown_str = await toMarkdown(oas);

  console.log(markdown_str);

  return "";
}

