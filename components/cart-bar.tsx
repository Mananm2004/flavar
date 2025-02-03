import { ArrowRight } from "lucide-react";

interface CartBarProps {
  itemCount: number;
  onViewCart: () => void;
}

export function CartBar({ itemCount, onViewCart }: CartBarProps) {
  return (
    <div className="fixed bottom-4 left-[1%] right-[1%] max-w-[93%] mx-auto z-50">
      <div className="bg-[#1CA672] text-white flex justify-between items-center p-4 rounded-[14px] shadow-lg">
        <span className="font-medium">
          {itemCount} Item{itemCount !== 1 ? "s" : ""} Added
        </span>
        <button onClick={onViewCart} className="flex items-center gap-2 font-medium">
          View Cart
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
