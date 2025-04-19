export type FilterType = "string" | "number"

export type FilterOperator = "equals" | "contains" | "greater_than" | "less_than" | "in"

export interface Filter {
  field: string
  operator: FilterOperator
  value: string | number
  type: FilterType
}

export interface FilterField {
  category: string
  fields: string[]
}
