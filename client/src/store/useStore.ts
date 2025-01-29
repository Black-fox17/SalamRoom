import { create } from 'zustand';
import { Room, Furniture } from '../types';

interface State {
  currentRoom: Room | null;
  selectedFurniture: Furniture | null;
  isLoading: boolean;
  setCurrentRoom: (room: Room | null) => void;
  setSelectedFurniture: (furniture: Furniture | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<State>((set) => ({
  currentRoom: null,
  selectedFurniture: null,
  isLoading: false,
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setSelectedFurniture: (furniture) => set({ selectedFurniture: furniture }),
  setLoading: (loading) => set({ isLoading: loading }),
}));