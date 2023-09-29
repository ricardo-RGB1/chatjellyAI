import { create } from "zustand";

interface userProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<userProModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


// This will allow using the modal anywhere in the app - specifically the ability to open and close the modal from anywhere in the app.