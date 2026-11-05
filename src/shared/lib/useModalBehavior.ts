import { useEffect } from "react";

export interface UseModalBehaviorOptions {
    isOpen: boolean,
    onClose: () => void,
}

export const useModalBehavior = ({ isOpen, onClose }: UseModalBehaviorOptions) => {
    useEffect(() => {
        if (!isOpen) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.overscrollBehavior = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
};