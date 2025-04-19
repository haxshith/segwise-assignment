"use client"

import { useState } from "react"
import type { Creative } from "@/types/creative"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

interface DataTableProps {
  data: Creative[]
  onRowClick: (row: Creative) => void
}

type SortDirection = "asc" | "desc" | null
type SortConfig = {
  key: keyof Creative | null
  direction: SortDirection
}

export default function DataTable({ data, onRowClick }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const handleSort = (key: keyof Creative) => {
    let direction: SortDirection = "asc"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc"
      } else if (sortConfig.direction === "desc") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  const sortedData = () => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Creative]
      const bValue = b[sortConfig.key as keyof Creative]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      if (aString < bString) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aString > bString) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  const getSortIcon = (key: keyof Creative) => {
    if (sortConfig.key !== key) {
      return <div className="w-4" />
    }

    if (sortConfig.direction === "asc") {
      return <ChevronUpIcon className="h-4 w-4" />
    }

    if (sortConfig.direction === "desc") {
      return <ChevronDownIcon className="h-4 w-4" />
    }

    return <div className="w-4" />
  }

  // Pagination
  const totalPages = Math.ceil(sortedData().length / rowsPerPage)
  const paginatedData = sortedData().slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(key as keyof Creative)}
                >
                  <div className="flex items-center">
                    <span>{key}</span>
                    <span className="ml-1">{getSortIcon(key as keyof Creative)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td
                    key={`${rowIndex}-${key}`}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                      cellIndex === 0 ? "cursor-pointer hover:text-blue-600" : ""
                    }`}
                    onClick={cellIndex === 0 ? () => onRowClick(row) : undefined}
                  >
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  )
}
