import validate from "@/validate";

export async function toHtml(
  oas: string): Promise<string> {

  // parse oas to markdown
  toMarkdown(oas);

  return "";
}

export async function toMarkdown(
  oas: string
): Promise<string> {

  await validate(oas);

  return "";
}
