import { Config } from "@/types";
import { OpenAPIV3 } from "openapi-types";

export default function generateServerMarkdown(schema: OpenAPIV3.Document, config?: Partial<Config>): string {
  let server_str = "";

  const servers = schema.servers;

  if (servers) {

    server_str += `# ${config?.headings?.servers ?? 'Servers'}`;
    server_str += "\n\n";

    server_str += "The following servers may be utilized for this API:";
    server_str += "\n\n";

    server_str += "|URL|Description|Variables|\n";
    server_str += "|-|-|-|\n";

    for (const server of servers) {
      server_str += `|${server.url}|${server.description ?? "-"}|`;

      if (server.variables) {
        server_str += "<ul>";

        for (const [key, value] of Object.entries(server.variables)) {
          server_str += `<li>**${key}**: default: ${value.default};`;
          if (value.enum) {
            server_str += ` options: ${value.enum.join(',')};`;
          }
          server_str += "</li>";
        }

        server_str += "</ul>";

      } else {
        server_str += "-";
      }

      server_str += "|\n";

    }

    server_str += "\n\n";

  }

  return server_str;
}
