import { Note } from "@/types/index";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CollectionKeys } from "@/constants/collectionKeys";

interface NoteState {
  notes: Note[];
  newNote: (state: Note) => void;
  removeNote: (state: string) => void;
  editNote: (state: Note) => void;
  loadNotes: () => Promise<any>;
  saveNotes: () => Promise<any>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  newNote: (note: Note) => {
    console.log('new', note)
    set(() => ({
      notes: [note, ...get().notes],
    }));
  },
  removeNote: (id: string) => {
    console.log('removed', get().notes.filter((x) => x.id !== id))
    set(() => ({
      notes: get().notes.filter((x) => x.id !== id),
    }));
  },
  editNote: (note: Note) => {
    set(() => ({
      notes: [note, ...get().notes.filter((x) => x.id !== note.id)],
    }));
  },
  loadNotes: async () => {
    try {
      const storedData = await AsyncStorage.getItem(CollectionKeys.Notes);
      if (storedData !== null) {
        set({ notes: JSON.parse(storedData) });
      }
      return get().notes;
    } catch (e) {
      console.log("src/app/noteStore");
      console.error("Failed to load stored notes:", e);
    }
  },
  // Save state to AsyncStorage whenever it changes
  saveNotes: async () => {
    try {
      const notes = get().notes;
      console.log('saveNotes', notes)

      await AsyncStorage.setItem(CollectionKeys.Notes, JSON.stringify(notes));
    } catch (e) {
      console.log("src/app/noteStore");
      console.error("Failed to save notes:", e);
    }
  },
}));
