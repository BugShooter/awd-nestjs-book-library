/* eslint-disable */
import { OpenAPIObject } from '@nestjs/swagger';

/**
 * Reorder fields in an object based on a specified order
 * @param obj - The object to reorder
 * @param order - The order of keys to follow
 * @returns A new object with keys in the specified order
 */
function reorderFields(obj: any, order: string[]): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => reorderFields(item, order));
  }
  if (!obj || typeof obj !== 'object') return obj;
  const result: any = {};
  for (const key of order) {
    if (obj[key] !== undefined) {
      result[key] = reorderFields(obj[key], order);
    }
  }
  for (const key of Object.keys(obj)) {
    if (!order.includes(key)) {
      result[key] = reorderFields(obj[key], order);
    }
  }
  return result;
}

/**
 * Reorder fields in an object and mutate the original object
 * @param obj - The object to reorder
 * @param order - The order of keys to follow
 */
function reorderFieldsInObject(obj: any, order: string[]) {
  const reordered = reorderFields(obj, order);
  // Копируем свойства обратно в исходный объект (мутация)
  for (const key of Object.keys(obj)) {
    delete obj[key];
  }
  for (const key of Object.keys(reordered)) {
    obj[key] = reordered[key];
  }
}

/**
 * Sort fields in the OpenAPI document and remove unnecessary fields
 **/
export function formatSwaggerOutput(document: OpenAPIObject) {
  // Sort fields in order: openapi, info, servers, paths, components
  const { openapi, info, servers, paths, components, ...rest } = document;
  const formattedDocument = {
    openapi,
    info,
    servers,
    paths,
    components,
    ...rest,
  };

  for (const path of Object.values(formattedDocument.paths)) {
    for (const [methodName, method] of Object.entries(path)) {
      // Remove unnecessary fields
      delete method.operationId;
      delete method.tags;
      // Remove parameters if they are empty
      if (Array.isArray(method.parameters) && method.parameters.length === 0) {
        delete method.parameters;
      }
      // Sort parameters in order: name, in, required, schema and others
      if (Array.isArray(method.parameters)) {
        method.parameters = method.parameters.map((param: any) => {
          const { name, in: paramIn, required, schema, ...rest } = param;
          return {
            ...(name && { name }),
            ...(paramIn && { in: paramIn }),
            ...(required !== undefined && { required }),
            ...(schema && { schema }),
            ...rest,
          };
        });
      }
      // Sort method fields in order: summary, description, and others
      const { summary, description, ...rest } = method;
      path[methodName] = {
        ...(summary && { summary }),
        ...(description && { description }),
        ...rest,
      };
    }
  }

  // Sort fields in components.schemas in order: type, required, properties
  if (formattedDocument.components && formattedDocument.components.schemas) {
    for (const [schemaName, schema] of Object.entries(formattedDocument.components.schemas)) {
      if (schema && typeof schema === 'object') {
        const { type, required, properties, ...rest } = schema as any;
        formattedDocument.components.schemas[schemaName] = {
          ...(type && { type }),
          ...(required && { required }),
          ...(properties && { properties }),
          ...rest,
        };
      }
    }
  }

  if (formattedDocument.components && formattedDocument.components.schemas) {
    for (const [schemaName, schema] of Object.entries(formattedDocument.components.schemas)) {
      if (schema && typeof schema === 'object') {
        reorderFieldsInObject(schema, ['type', 'required', 'properties']);
      }
    }
  }
  return formattedDocument;
}
