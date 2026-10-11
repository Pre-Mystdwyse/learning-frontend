
interface BurgerButtonProps {
    isOpen: boolean,
    onClick: () => void,
}

export function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {

    return (
        <button
        className="relative z-60 flex h-6 w-8 flex-col justify-between md:hidden"
        onClick={onClick}
      >
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isOpen ? 'translate-y-2.5 rotate-45' : ''}`}
        ></div>
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
        ></div>
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isOpen ? '-translate-y-2.5 -rotate-45' : ''}`}
        ></div>
      </button>
    )
}