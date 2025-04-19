"use client"

import { useState, useEffect } from "react"
import FilterPanel from "@/components/filter-panel"
import DataTable from "@/components/data-table"
import RowPreview from "@/components/row-preview"
import mockData from "@/data/mock-data"
import type { Filter } from "@/types/filters"
import type { Creative } from "@/types/creative"
import { filterData } from "@/lib/filter-utils"

export default function Home() {
  const [data, setData] = useState<Creative[]>([])
  const [filteredData, setFilteredData] = useState<Creative[]>([])
  const [filters, setFilters] = useState<Filter[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRow, setSelectedRow] = useState<Creative | null>(null)
  const [showFullModal, setShowFullModal] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    // Load mock data
    setData(mockData)
    setFilteredData(mockData)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let result = [...data]

    // Apply filters
    if (filters.length > 0) {
      result = filterData(result, filters)
    }

    // Apply search
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredData(result)
  }, [data, filters, searchTerm])

  const handleAddFilter = (filter: Filter) => {
    setFilters([...filters, filter])
  }

  const handleRemoveFilter = (index: number) => {
    const newFilters = [...filters]
    newFilters.splice(index, 1)
    setFilters(newFilters)
  }

  const handleRowClick = (row: Creative) => {
    setSelectedRow(row)
    setIsPreviewOpen(true)
  }

  const handlePreviewClick = () => {
    setShowFullModal(true)
  }

  const handleCloseModal = () => {
    setShowFullModal(false)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setSelectedRow(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-lime-200 flex items-center justify-center mr-3">
              <span className="text-gray-700 font-semibold">S</span>
            </div>
            <div>
              <h1 className="text-gray-700 font-semibold">Segwise</h1>
              <p className="text-gray-500 text-sm">Front End Test</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <FilterPanel filters={filters} onAddFilter={handleAddFilter} onRemoveFilter={handleRemoveFilter} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DataTable data={filteredData} onRowClick={handleRowClick} />
        </div>
      </div>

      {isPreviewOpen && selectedRow && (
        <RowPreview
          data={selectedRow}
          onClose={handleClosePreview}
          onExpand={handlePreviewClick}
          isExpanded={showFullModal}
          onCloseModal={handleCloseModal}
        />
      )}
    </main>
  )
}
