import { Schema } from "mongoose";

export function getFieldsToPopulate(schema: Schema): string[] {
  const fieldsToPopulate: string[] = [];
  for (const key in schema.obj) {
    if (schema.obj[key] && typeof schema.obj[key] === 'object' && 'ref' in schema.obj[key]) {
      fieldsToPopulate.push(key);
    }
  }

  for(const key in schema.virtuals as Record<string, unknown>) {
    if (schema.virtuals[key] && typeof schema.virtuals[key] === 'object' && 'ref' in schema.virtuals[key]?.options) {
      fieldsToPopulate.push(key);
    }
  }

  return fieldsToPopulate;
}