import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { NAV_LINKS } from "../model/nav.config"
import { useModalBehavior } from "@/shared/hooks"

interface MobileMenuProps {
    isOpen: boolean,
    onClose: () => void,
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    useModalBehavior({ isOpen, onClose });
    if (!isOpen) return null;

    return createPortal(
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-slate-900/95 text-3xl text-white backdrop-blur-md md:hidden">
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.label}
                    to={link.path}
                    onClick={onClose}
                    className="transition-colors hover:text-violet-400"
                >
                    {link.label}
                </Link>
            ))}
          </div>,
          document.body,
        );
}