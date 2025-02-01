"use client"

interface MenuItem {
  name: string
  count: number
}

const MENU_ITEMS: MenuItem[] = [
  { name: "Quick Bites", count: 2 },
  { name: "Main Course", count: 10 },
  { name: "Momo's", count: 12 },
  { name: "Rolls", count: 7 },
  { name: "Tandoor Breads", count: 4 },
  { name: "Sizzlers", count: 6 },
  { name: "Indian Starters", count: 6 },
]

interface MenuSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuSheet({ isOpen, onClose }: MenuSheetProps) {
  if (!isOpen) return null

  return (
    <>
      <style jsx global>{`
        .menu-sheet {
          position: fixed;
          bottom: -100%;
          right: 20px;
          width: 280px;
          background: #fd6b22;
          transition: bottom 0.3s ease-in-out;
          z-index: 1000;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .menu-sheet.active {
          bottom: 100px;
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
      `}</style>

      <div className="overlay active" onClick={onClose} />
      <div className="menu-sheet active">
        <div className="p-6 space-y-4">
          {MENU_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-white">
              <span className="text-base font-medium">{item.name}</span>
              <span className="text-sm opacity-80">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

