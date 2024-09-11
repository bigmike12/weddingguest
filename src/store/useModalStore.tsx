import { create } from "zustand";

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  openModal: (title: string, content: React.ReactNode, width?: string) => void;
  closeModal: () => void;
  width?: string;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  openModal: (title: string, content: React.ReactNode, width?: string) =>
    set({ isOpen: true, title, content, width }),
  closeModal: () => set({ isOpen: false, title: "", content: null }),
}));

export default useModalStore;
