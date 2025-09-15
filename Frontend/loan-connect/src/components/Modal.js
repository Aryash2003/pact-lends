import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-96">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
