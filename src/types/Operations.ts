import { OpenAPIV3 } from "openapi-types"

export type Operations = {
  [operation: string]: OpenAPIV3.OperationObject
}
