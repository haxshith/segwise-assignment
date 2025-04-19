"use client"

import { useState } from "react"
import type { Filter, FilterType, FilterOperator, FilterField } from "@/types/filters"
import { PlusIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

interface FilterPanelProps {
  filters: Filter[]
  onAddFilter: (filter: Filter) => void
  onRemoveFilter: (index: number) => void
}

const filterFields: FilterField[] = [
  {
    category: "Dimensions",
    fields: ["creative_id", "creative_name", "country", "ad_network", "os", "campaign", "ad_group"],
  },
  { category: "Tags", fields: ["tags"] },
  {
    category: "Metrics",
    fields: ["ipm", "ctr", "spend", "impressions", "clicks", "cpm", "cost_per_click", "cost_per_install", "installs"],
  },
]

const operatorOptions = [
  { value: "equals", label: "Equals", applicableTypes: ["string", "number"] },
  { value: "contains", label: "Contains", applicableTypes: ["string"] },
  { value: "greater_than", label: "Greater Than", applicableTypes: ["number"] },
  { value: "less_than", label: "Less Than", applicableTypes: ["number"] },
  { value: "in", label: "In", applicableTypes: ["string", "number"] },
]

const getFieldType = (field: string): "string" | "number" => {
  const numericFields = [
    "ipm",
    "ctr",
    "spend",
    "impressions",
    "clicks",
    "cpm",
    "cost_per_click",
    "cost_per_install",
    "installs",
  ]
  return numericFields.includes(field) ? "number" : "string"
}

export default function FilterPanel({ filters, onAddFilter, onRemoveFilter }: FilterPanelProps) {
  const [isAddingFilter, setIsAddingFilter] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [selectedOperator, setSelectedOperator] = useState<FilterOperator | null>(null)
  const [filterValue, setFilterValue] = useState<string>("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showFieldDropdown, setShowFieldDropdown] = useState(false)
  const [showOperatorDropdown, setShowOperatorDropdown] = useState(false)

  const resetFilterState = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedField(null)
    setSelectedOperator(null)
    setFilterValue("")
    setShowCategoryDropdown(false)
    setShowFieldDropdown(false)
    setShowOperatorDropdown(false)
  }

  const handleAddFilterClick = () => {
    setIsAddingFilter(true)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategoryDropdown(false)
    setStep(2)
  }

  const handleFieldSelect = (field: string) => {
    setSelectedField(field)
    setShowFieldDropdown(false)
    setStep(3)
  }

  const handleOperatorSelect = (operator: FilterOperator) => {
    setSelectedOperator(operator)
    setShowOperatorDropdown(false)
  }

  const handleApplyFilter = () => {
    if (selectedField && selectedOperator && filterValue) {
      const fieldType = getFieldType(selectedField)
      const newFilter: Filter = {
        field: selectedField,
        operator: selectedOperator,
        value: fieldType === "number" ? Number.parseFloat(filterValue) : filterValue,
        type: fieldType as FilterType,
      }
      onAddFilter(newFilter)
      setIsAddingFilter(false)
      resetFilterState()
    }
  }

  const handleCancelFilter = () => {
    setIsAddingFilter(false)
    resetFilterState()
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={handleAddFilterClick}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <span className="flex items-center">
            <PlusIcon className="h-4 w-4 mr-1" />
            Filters
          </span>
          <span className="ml-1 bg-gray-200 rounded-full px-2 py-0.5 text-xs">{filters.length}</span>
        </button>

        {filters.map((filter, index) => (
          <div
            key={index}
            className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700"
          >
            <span>
              {filter.field} {filter.operator} {filter.value}
            </span>
            <button onClick={() => onRemoveFilter(index)} className="ml-2 text-blue-500 hover:text-blue-700">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {isAddingFilter && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Add Filter</h3>
            <button onClick={handleCancelFilter} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Step 1: Select Category */}
            <div className="relative">
              <div className="mb-2 text-sm text-gray-500">Step 1 - Select Category</div>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <span>{selectedCategory || "Select Category"}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {showCategoryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
                    />
                  </div>
                  <ul className="max-h-60 overflow-auto">
                    {filterFields.map((category) => (
                      <li
                        key={category.category}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleCategorySelect(category.category)}
                      >
                        {category.category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Step 2: Select Field */}
            <div className="relative">
              <div className="mb-2 text-sm text-gray-500">Step 2 - Select Field</div>
              <button
                onClick={() => step >= 2 && setShowFieldDropdown(!showFieldDropdown)}
                disabled={step < 2}
                className={`w-full flex items-center justify-between px-3 py-2 border rounded-md text-sm ${
                  step >= 2 ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100 text-gray-400"
                }`}
              >
                <span>{selectedField || "Select Field"}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {showFieldDropdown && step >= 2 && selectedCategory && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
                    />
                  </div>
                  <ul className="max-h-60 overflow-auto">
                    {filterFields
                      .find((cat) => cat.category === selectedCategory)
                      ?.fields.map((field) => (
                        <li
                          key={field}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleFieldSelect(field)}
                        >
                          {field}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Step 3: Select Operator and Value */}
            <div>
              <div className="mb-2 text-sm text-gray-500">Step 3 - Select Operator & Value</div>
              <div className="flex space-x-2">
                <div className="relative w-1/2">
                  <button
                    onClick={() => step >= 3 && setShowOperatorDropdown(!showOperatorDropdown)}
                    disabled={step < 3}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded-md text-sm ${
                      step >= 3 ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100 text-gray-400"
                    }`}
                  >
                    <span>{selectedOperator || "Equals"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {showOperatorDropdown && step >= 3 && selectedField && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul className="max-h-60 overflow-auto">
                        {operatorOptions
                          .filter((op) => op.applicableTypes.includes(getFieldType(selectedField)))
                          .map((op) => (
                            <li
                              key={op.value}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleOperatorSelect(op.value as FilterOperator)}
                            >
                              {op.label}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <input
                  type={getFieldType(selectedField || "") === "number" ? "number" : "text"}
                  placeholder="Enter Value"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  disabled={step < 3}
                  className={`w-1/2 px-3 py-2 border rounded-md text-sm ${
                    step >= 3 ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100 text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleApplyFilter}
              disabled={!selectedField || !selectedOperator || !filterValue}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedField && selectedOperator && filterValue
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
