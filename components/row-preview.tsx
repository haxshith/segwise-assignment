"use client"

import type { Creative } from "@/types/creative"
import { XMarkIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"

interface RowPreviewProps {
  data: Creative
  onClose: () => void
  onExpand: () => void
  isExpanded: boolean
  onCloseModal: () => void
}

export default function RowPreview({ data, onClose, onExpand, isExpanded, onCloseModal }: RowPreviewProps) {
  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Creative Details</h2>
              <button onClick={onCloseModal} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Creative Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Creative ID</p>
                    <p className="font-medium">{data.creative_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Creative Name</p>
                    <p className="font-medium">{data.creative_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tags</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {typeof data.tags === "string"
                        ? data.tags.split(",").map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {tag.trim()}
                            </span>
                          ))
                        : String(data.tags)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{data.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ad Network</p>
                    <p className="font-medium">{data.ad_network}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">OS</p>
                    <p className="font-medium">{data.os}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Campaign</p>
                      <p className="font-medium">{data.campaign}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ad Group</p>
                      <p className="font-medium">{data.ad_group}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">IPM</p>
                      <p className="font-medium">{data.ipm}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CTR</p>
                      <p className="font-medium">{data.ctr}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Spend</p>
                      <p className="font-medium">${data.spend}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="font-medium">{data.impressions.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="font-medium">{data.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CPM</p>
                      <p className="font-medium">${data.cpm}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Cost Per Click</p>
                      <p className="font-medium">${data.cost_per_click}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost Per Install</p>
                      <p className="font-medium">${data.cost_per_install}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Installs</p>
                    <p className="font-medium">{data.installs.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-40 overflow-hidden">
      <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">Creative Preview</h3>
        <div className="flex items-center space-x-2">
          <button onClick={onExpand} className="text-gray-500 hover:text-gray-700">
            <ArrowsPointingOutIcon className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Creative ID</p>
            <p className="text-sm font-medium">{data.creative_id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Creative Name</p>
            <p className="text-sm font-medium">{data.creative_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Campaign</p>
            <p className="text-sm font-medium">{data.campaign}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Performance</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <p className="text-xs text-gray-500">CTR</p>
                <p className="text-sm font-medium">{data.ctr}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">IPM</p>
                <p className="text-sm font-medium">{data.ipm}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
