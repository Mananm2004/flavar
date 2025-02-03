interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCategories = [
  { name: "Quick Bites", count: 2 },
  { name: "Main Course", count: 10 },
  { name: "Momo's", count: 12 },
  { name: "Rolls", count: 7 },
  { name: "Tandoor Breads", count: 4 },
  { name: "Sizzlers", count: 6 },
  { name: "Indian Starters", count: 8 },
];

export function MenuPopup({ isOpen, onClose }: MenuPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent black background overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Popup Menu */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 
                      bg-orange-500 text-white p-4 rounded-xl shadow-xl z-50 w-64">
        <div className="space-y-3">
          {/* Title */}
          <h2 className="text-lg font-bold text-white">Quick Bites</h2>
          
          {/* Menu Items */}
          {menuCategories.map((category) => (
            <div key={category.name} className="flex justify-between items-center text-white text-sm">
              <span>{category.name}</span>
              <span className="font-semibold">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

