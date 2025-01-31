import { OpenAPIV3 } from "openapi-types";

const accepted_versions = ["3.0"]; // accepted versions

export default async function validate(
  oas: string
): Promise<OpenAPIV3.Document> {
  const { Validator } = await import("@seriousme/openapi-schema-validator");
  const validator = new Validator();
  const res = await validator.validate(oas);

  if (res.valid) {

    const version = validator.version;
    if (!accepted_versions.includes(version)) {
      throw `Found OpenAPI v${version} but accepted versions are only: ${accepted_versions.join(', ')}`;
    }

    const schema = validator.resolveRefs();

    /** @ts-expect-error using type from different package */
    return schema;
  } else {
    console.error(res.errors);
    throw "OpenAPI Schema is not valid."
  }
}

