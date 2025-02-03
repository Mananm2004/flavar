import { useState, useEffect, useRef } from "react";

interface ARScreenProps {
  isOpen: boolean;
  onClose: () => void;
  dish: {
    name: string;
    price: number;
    serves: number;
    description: string;
    isVeg: boolean;
    image: string;
    modelSrc: string;
    iosSrc: string;
  };
}

export function ARScreen({ isOpen, onClose, dish }: ARScreenProps) {
  const [viewMode, setViewMode] = useState<"static" | "3d" | "ar">("static");
  const [error, setError] = useState<string | null>(null);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !customElements.get("model-viewer")) {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      script.type = "module";
      document.body.appendChild(script);

      script.onload = () => {
        setError(null);
      };

      script.onerror = () => {
        setError(
          "Failed to load 3D viewer. Please check your internet connection and try again."
        );
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (!isOpen) return null;

  const load3D = () => {
    setViewMode("3d");
    setError(null);
  };

  const loadAR = () => {
    if (modelViewerRef.current && "activateAR" in modelViewerRef.current) {
      setViewMode("ar");
      (modelViewerRef.current as any).activateAR();
    } else {
      setError("AR is not supported on this device or browser.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 overflow-hidden max-h-[90vh]">
        <div className="h-[50vh] bg-gray-100">
          {viewMode === "static" && (
            <img
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          )}
          {(viewMode === "3d" || viewMode === "ar") && (
            <model-viewer
              ref={modelViewerRef as any}
              src={dish.modelSrc}
              ios-src={dish.iosSrc}
              ar={viewMode === "ar"}
              ar-modes="scene-viewer quick-look"
              camera-controls
              alt={`A 3D model of ${dish.name}`}
              className="w-full h-full"
              exposure="0.5"
              shadow-intensity="1"
            />
          )}
        </div>

        <div className="p-6">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex gap-4 mb-6">
            <button
              onClick={loadAR}
              className={`flex-1 py-3 rounded-full font-medium ${
                viewMode === "ar"
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              View in AR
            </button>
            <button
              onClick={load3D}
              className={`flex-1 py-3 rounded-full font-medium ${
                viewMode === "3d"
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              3D
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 ${
                    dish.isVeg ? "bg-green-500" : "bg-red-500"
                  } rounded-full mr-2`}
                />
                <span className="text-sm text-gray-500">
                  {dish.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-primary font-semibold text-lg">
                ₹{dish.price}
              </p>
              <p className="text-gray-500 text-sm">Serves {dish.serves}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {dish.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
