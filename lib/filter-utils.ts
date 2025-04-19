import type { Filter } from "@/types/filters"
import type { Creative } from "@/types/creative"

export function filterData(data: Creative[], filters: Filter[]): Creative[] {
  return data.filter((item) => {
    return filters.every((filter) => {
      const value = item[filter.field as keyof Creative]

      if (value === undefined || value === null) {
        return false
      }

      switch (filter.operator) {
        case "equals":
          return String(value).toLowerCase() === String(filter.value).toLowerCase()

        case "contains":
          return String(value).toLowerCase().includes(String(filter.value).toLowerCase())

        case "greater_than":
          if (typeof value === "number" && typeof filter.value === "number") {
            return value > filter.value
          }
          return false

        case "less_than":
          if (typeof value === "number" && typeof filter.value === "number") {
            return value < filter.value
          }
          return false

        case "in":
          if (typeof filter.value === "string") {
            const values = filter.value.split(",").map((v) => v.trim().toLowerCase())
            return values.includes(String(value).toLowerCase())
          }
          return false

        default:
          return false
      }
    })
  })
}
