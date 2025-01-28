export default function generateCoverMarkdown(
  title: string,
  subtitle?: string
): string {
  let cover_str = "";

  cover_str += `<h1 style="font-size: 48px; line-height: 1.2; font-weight: 700; margin-top: 150px; margin-bottom: 0px">${title}</h1>`
  cover_str += "\n\n";

  if (subtitle) {
    cover_str += `<p style="font-size: 16px; margin: 0px">${subtitle}</p>`;
    cover_str += "\n\n";
  }

  cover_str += `<div class="page-break"></div>`;
  cover_str += "\n\n";

  return cover_str;
}
