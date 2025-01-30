import { deepMerge } from "@/utils/merge";
import { OpenAPIV3 } from "openapi-types";

export const note_keys: { [key: string]: string } = {
  'format': 'Format',
  'default': 'Default',
  'multipleOf': 'Multiple Of:', // eslint-disable-line @typescript-eslint/naming-convention
  'maximum': 'Maximum',
  'exclusiveMaximum': 'Exclusive Maximum', // eslint-disable-line @typescript-eslint/naming-convention
  'minimum': 'Minimum', // eslint-disable
  'exclusiveMinimum': 'Exclusive Minimum', // eslint-disable-line @typescript-eslint/naming-convention
  'maxLength': 'Maximum Length', // eslint-disable-line @typescript-eslint/naming-convention
  'minLength': 'Mininimum Length', // eslint-disable-line @typescript-eslint/naming-convention
  'pattern': 'Pattern',
  'maxItems': 'Maximum Items', // eslint-disable-line @typescript-eslint/naming-convention
  'minItems': 'Minimum Items', // eslint-disable-line @typescript-eslint/naming-convention
  'uniqueItems': 'Unique Items', // eslint-disable-line @typescript-eslint/naming-convention
  'maxProperties': 'Maximum Properties', // eslint-disable-line @typescript-eslint/naming-convention
  'minProperties': 'Minimum Properties', // eslint-disable-line @typescript-eslint/naming-convention
  'enum': 'Allowed Values',
  'nullable': 'Nullable',
}

export function generateSchemaMarkdown(
  schema: OpenAPIV3.SchemaObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  if (schema.allOf) {
    schema = handleAllOf(schema);
  }

  if (['object', 'array'].includes(schema.type!)) {
    endpoints_str += generateSchemaTableMarkdown(schema, display_for);
  } else {
    endpoints_str += generateSchemaBasicTableMarkdown(schema);
  }

  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateSchemaBasicTableMarkdown(
  schema: OpenAPIV3.SchemaObject
): string {
  let endpoints_str = "";

  endpoints_str += "|Type|Example|Notes|\n";
  endpoints_str += "|-|-|-|\n";

  // type
  endpoints_str += `|${schema?.type ?? '-'}`;

  // example
  if (schema?.example) {
    endpoints_str += `|${schema.example}`;
  } else {
    endpoints_str += `|-`;
  }

  // notes
  endpoints_str += generateSchemaNotesMarkdown(schema);

  return endpoints_str;
}

export function generateSchemaTableMarkdown(
  schema: OpenAPIV3.SchemaObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  endpoints_str += "|Key|Type|Required|Example|Notes|\n";
  endpoints_str += "|-|-|-|-|-|\n";

  const required_properties: string[] | undefined = schema.required;

  if (schema.type === 'object') {
    for (const [key, value] of Object.entries(schema.properties!)) {
      endpoints_str += generateSchemaTableRowMarkdown(
        key,
        /** @ts-expect-error we resolve all references */
        value,
        required_properties,
        display_for
      )
    }
  } else if (schema.type === 'array') {
    for (const [key, value] of Object.entries(schema.items!)) {
      endpoints_str += generateSchemaTableRowMarkdown(
        key,
        value,
        required_properties,
        display_for
      )
    }
  }



  return endpoints_str;
}

export function handleAllOf(
  schema: OpenAPIV3.SchemaObject
): OpenAPIV3.SchemaObject {

  if (schema.allOf) {
    for (const inner_schema of schema.allOf) {
      schema = deepMerge(inner_schema, schema);
    }
  }

  return schema;
}

export function generateSchemaTableRowMarkdown(
  key: string,
  schema: OpenAPIV3.SchemaObject,
  required_properties?: string[],
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  schema = handleAllOf(schema);

  if (display_for === 'request' && schema.readOnly) {
    return "";
  } else if (display_for === 'response' && schema.writeOnly) {
    return "";
  }

  if (schema.anyOf || schema.oneOf) {
    return generateOneAnyOfSchemaTableRowMarkdown(
      key,
      schema,
      required_properties,
      display_for
    )
  }

  /* KEY */
  endpoints_str += `|${key}`;

  /* TYPE */
  endpoints_str += `|${schema.type}`;

  /* REQUIRED */
  endpoints_str += generateSchemaTableRowRequiredColMarkdown(
    key,
    required_properties,
  );

  /* EXAMPLE */
  endpoints_str += generateSchemaTableRowExampleColMarkdown(
    schema
  );

  /* NOTES */
  endpoints_str += generateSchemaNotesMarkdown(schema);

  /* NESTED */
  endpoints_str += generateNestedSchemaTableRowMarkdown(
    key,
    schema,
    display_for
  );

  return endpoints_str;
}

export function generateSchemaTableRowRequiredColMarkdown(
  key: string,
  required_properties?: string[],
): string {
  let endpoints_str = "";

  if (required_properties?.includes(key)) {
    endpoints_str += `|Yes`;
  } else {
    endpoints_str += `|No`;
  }

  return endpoints_str;
}

export function generateSchemaTableRowExampleColMarkdown(
  schema: OpenAPIV3.SchemaObject,
): string {
  let endpoints_str = "";

  if (schema.example && !['object', 'array'].includes(schema.type!)) {
    endpoints_str += `|${schema.example}`;
  } else {
    endpoints_str += `|-`;
  }

  return endpoints_str;
}

export function generateOneAnyOfSchemaTableRowMarkdown(
  key: string,
  schema: OpenAPIV3.SchemaObject,
  required_properties?: string[],
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  /* KEY */
  endpoints_str += `|${key}`;

  /* TYPE */
  endpoints_str += `|${schema.anyOf ? 'Any of The ' : schema.oneOf ? 'One of The ' : ''}Options`;

  /* REQUIRED */
  endpoints_str += generateSchemaTableRowRequiredColMarkdown(
    key,
    required_properties
  );

  /* EXAMPLE */
  endpoints_str += '|';

  /* NOTES */
  endpoints_str += '|';
  if (schema.oneOf) {
    endpoints_str += "Must exactly match one of the options.";
  } else if (schema.anyOf) {
    endpoints_str += "May match multiple options simultaneously.";
  }
  endpoints_str += '|\n';


  /** @ts-expect-error we resolve all references */
  const options: OpenAPIV3.SchemaObject[] = schema.anyOf ?? schema.oneOf ?? [];

  for (const [i, option] of options.entries()) {

    endpoints_str += `|*Option ${i + 1} for ${key}*||||\n`;

    endpoints_str += generateSchemaTableRowMarkdown(
      key,
      option,
      required_properties,
      display_for
    )

  }

  return endpoints_str;
}

export function generateNestedSchemaTableRowMarkdown(
  key: string,
  schema: OpenAPIV3.SchemaObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  if (schema.type === 'object') {
    endpoints_str += generateNestedObjectSchemaTableRowMarkdown(
      key,
      schema,
      display_for
    )
  } else if (schema.type === 'array') {
    endpoints_str += generateNestedArraySchemaTableRowMarkdown(
      key,
      schema,
      display_for
    )
  }

  return endpoints_str;
}

export function generateNestedArraySchemaTableRowMarkdown(
  base_key: string,
  schema: OpenAPIV3.SchemaObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  schema = handleAllOf(schema);

  if (display_for === 'request' && schema.readOnly) {
    return "";
  } else if (display_for === 'response' && schema.writeOnly) {
    return "";
  }

  endpoints_str += generateSchemaTableRowMarkdown(
    `${base_key}.*`,
    /** @ts-expect-error we resolve all references */
    schema.items,
    undefined,
    display_for
  );

  return endpoints_str;
}

export function generateNestedObjectSchemaTableRowMarkdown(
  base_key: string,
  schema: OpenAPIV3.SchemaObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  schema = handleAllOf(schema);

  if (display_for === 'request' && schema.readOnly) {
    return "";
  } else if (display_for === 'response' && schema.writeOnly) {
    return "";
  }

  const properties = schema.properties!;

  let required_properties: string[] | undefined = schema.required;
  if (required_properties) {
    required_properties = required_properties.map((prop: string) => `${base_key}.${prop}`);
  }

  for (const [key, value] of Object.entries(properties)) {

    endpoints_str += generateSchemaTableRowMarkdown(
      `${base_key}.${key}`,
      /** @ts-expect-error we resolve all references */
      value,
      required_properties,
      display_for
    );
  }

  return endpoints_str;
}

export function generateSchemaNotesMarkdown(
  schema?: OpenAPIV3.SchemaObject
): string {
  let endpoints_str = "";

  if (schema) {

    //let notes: string[] = [];
    //
    //if (schema.description) {
    //  notes = [...notes, schema.description];
    //}

    if (schema.description) {
      endpoints_str += schema.description;
    }

    const notes = getNotes([], schema);

    if (notes.length > 0) {
      endpoints_str += "<ul>";
      for (const note of notes) {
        endpoints_str += `<li>${note}</li>`;
      }
      endpoints_str += "</ul>";
    } else if (!schema.description) {
      endpoints_str += "-";
    }

  } else {
    endpoints_str += "-";
  }

  endpoints_str = `|${endpoints_str}|\n`;

  return endpoints_str;
}

function getNotes(notes: string[], schema: OpenAPIV3.SchemaObject): string[] {

  for (let [key, value] of Object.entries(schema)) {

    key = note_keys[key] ?? key;

    if (Object.values(note_keys).includes(key)) {

      if (Array.isArray(value)) {
        value = [...new Set(value)];
        value = value.join(', ');
      }

      notes = [...notes, `${key}: ${value}`];
    } else if (key === 'discriminator') {
      notes = [...notes, `discriminator: ${value.propertyName}`];
    }
  }

  return notes;
}
