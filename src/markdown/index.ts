import validate from "@/validate";
import generateInfoMarkdown from "@/markdown/info";
import generateSecurityMarkdown from "./security";

export default async function toMarkdown(
  oas: string
): Promise<string> {

  const schema = await validate(oas);

  let full_str = "";

  const info_md = generateInfoMarkdown(schema);
  full_str += info_md;

  //TODO: servers

  const security_md = await generateSecurityMarkdown(schema);
  full_str += security_md;

  return full_str;
}
