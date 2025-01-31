"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ARScreenProps {
  isOpen: boolean
  onClose: () => void
  dish: {
    name: string
    price: number
    serves: number
    isVeg: boolean
    image: string
    modelSrc: string
    iosSrc: string
  }
}

export function ARScreen({ isOpen, onClose, dish }: ARScreenProps) {
  const [viewMode, setViewMode] = useState<"static" | "3d" | "ar">("static")
  const [error, setError] = useState<string | null>(null)
  const modelViewerRef = useRef<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && !customElements.get("model-viewer")) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      script.type = "module"
      document.body.appendChild(script)

      script.onload = () => {
        setError(null)
      }

      script.onerror = () => {
        setError("Failed to load 3D viewer. Please check your internet connection and try again.")
      }

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (overlayRef.current) {
        overlayRef.current.classList.add("active")
      }
      if (screenRef.current) {
        screenRef.current.classList.add("active")
      }
    } else {
      document.body.style.overflow = ""
      if (overlayRef.current) {
        overlayRef.current.classList.remove("active")
      }
      if (screenRef.current) {
        screenRef.current.classList.remove("active")
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const load3D = () => {
    setViewMode("3d")
    setError(null)
  }

  const loadAR = () => {
    if (modelViewerRef.current && "activateAR" in modelViewerRef.current) {
      setViewMode("ar")
      ;(modelViewerRef.current as any).activateAR()
    } else {
      setError("AR is not supported on this device or browser.")
    }
  }

  return (
    <>
      <style jsx global>{`
        .ar-screen {
          position: fixed;
          bottom: -100%;
          left: 0;
          width: 100%;
          height: 80%;
          background: white;
          transition: bottom 0.5s ease-in-out;
          z-index: 1000;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
        }

        .ar-screen.active {
          bottom: 0;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out;
        }

        .overlay.active {
          opacity: 1;
          visibility: visible;
        }

        model-viewer {
          width: 100%;
          height: 100%;
          display: none;
        }
      `}</style>

      <div ref={overlayRef} className="overlay" onClick={onClose} />
      <div ref={screenRef} className="ar-screen">
        <div className="h-full flex flex-col">
          <div className="viewer-container h-[50vh] bg-gray-100">
            {viewMode === "static" && (
              <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-contain" />
            )}
            {(viewMode === "3d" || viewMode === "ar") &&
              typeof window !== "undefined" &&
              customElements.get("model-viewer") && (
                <model-viewer
                  ref={modelViewerRef as any}
                  src={dish.modelSrc}
                  ios-src={dish.iosSrc}
                  ar={viewMode === "ar"}
                  ar-modes="scene-viewer quick-look"
                  camera-controls
                  alt={`A 3D model of ${dish.name}`}
                  style={{ display: "block" }}
                  className="w-full h-full"
                />
              )}
          </div>

          {error && <div className="p-4 bg-red-50 text-red-600 text-sm">{error}</div>}

          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <button
                onClick={loadAR}
                className="flex-1 py-3 rounded-full bg-orange-500 text-white font-medium text-center"
              >
                VIEW ON YOUR TABLE
              </button>
              <button
                onClick={load3D}
                className="flex-1 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-medium text-center"
              >
                3D
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{dish.name}</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-orange-500 font-semibold">₹{dish.price}</p>
                    <p className="text-sm text-gray-500">Serves {dish.serves}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn("w-4 h-4 border-2 rounded-full", dish.isVeg ? "border-green-500" : "border-red-500")}
                  >
                    <div className={cn("w-2 h-2 m-0.5 rounded-full", dish.isVeg ? "bg-green-500" : "bg-red-500")} />
                  </div>
                  <span className="text-sm text-gray-500">{dish.isVeg ? "Veg" : "Non-Veg"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

