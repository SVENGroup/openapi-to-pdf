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

export function isHumanReadableNoteKey(key: string): boolean {
  return Object.values(note_keys).includes(key);
}

export function getHumanReadableNoteKey(text: string): string {
  return note_keys[text] ?? text;
}
