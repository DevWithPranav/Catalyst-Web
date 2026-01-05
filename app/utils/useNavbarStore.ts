import { create } from 'zustand';

interface NavbarState {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false,
  toggleNavbar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavbarStore;