import { X } from "lucide-react";

interface CartScreenProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: number;
    name: string;
    price: number;
    serves: number;
    isVeg: boolean;
  }>;
  quantities: { [key: number]: number };
  onUpdateQuantity: (itemId: number, delta: number) => void; // ✅ Changed from setQuantities
}

export function CartScreen({
  isOpen,
  onClose,
  items,
  quantities,
  onUpdateQuantity, // ✅ Correct function prop
}: CartScreenProps) {
  // ✅ Calculate total dynamically
  const total = items.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Cart Container */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto shadow-lg">
        
        {/* Cart Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Carts</h2> 
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {/* Veg/Non-Veg indicator */}
                  <div className={`w-2 h-2 ${item.isVeg ? "bg-green-500" : "bg-red-500"} rounded-full`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <p className="text-sm text-gray-500">₹ {item.price}</p> 
              </div>

              {/* Quantity Control */}
              <div className="flex items-center border border-red-500 rounded-[9px] px-2 py-1">
                <button className="text-red-500 font-bold px-2" onClick={() => onUpdateQuantity(item.id, -1)}>
                  - {/* ✅ Calls onUpdateQuantity with -1 */}
                </button>
                <span className="text-red-500 font-semibold mx-2">{quantities[item.id] || 0}</span>
                <button className="text-red-500 font-bold px-2" onClick={() => onUpdateQuantity(item.id, 1)}>
                  + {/* ✅ Calls onUpdateQuantity with +1 */}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Total & Confirm Button Section */}
        <div className="sticky bottom-0 p-4 bg-[#1CA672] flex items-center justify-between rounded-b-none rounded-t-2xl">
          <span className="text-white text-lg font-semibold">Total: ₹{total}</span>
          <button className="bg-white text-[#1CA672] px-4 py-2 font-medium rounded-[9px] shadow-md">
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
}
