import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={-1}
      />
      <div className="relative w-full max-w-lg rounded-3xl border border-ink/10 bg-white/95 p-6 shadow-soft dark:border-white/10 dark:bg-[#1a1a22]/95">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink dark:text-white/90">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate dark:border-white/10 dark:text-white/50 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
