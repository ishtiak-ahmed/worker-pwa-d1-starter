import { create } from "zustand";
import type { StarterState, StarterItem } from "../types";

export const useStarterStore = create<StarterState>((set, get) => ({
  appName: "Worker PWA D1 Starter",
  themeMode: "dark",
  counter: 0,
  items: [],
  isLoading: false,
  error: null,

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),

  incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
  decrementCounter: () => set((state) => ({ counter: state.counter - 1 })),

  setInitialItems: (initialItems: StarterItem[]) => {
    if (initialItems && initialItems.length > 0) {
      set({ items: initialItems });
    }
  },

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = errData.error || `HTTP ${res.status}`;
        if (msg.includes("no such table")) {
          throw new Error("Database table 'items' does not exist yet. Please run migrations ('npm run db:migrate:remote' or 'npm run db:migrate:local').");
        }
        throw new Error(msg);
      }
      const data = (await res.json()) as StarterItem[];
      set({ items: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch items from D1 API", isLoading: false });
    }
  },

  addItem: async (title: string) => {
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || "Failed to create item in D1 DB");
      }
      const newItem = (await res.json()) as StarterItem;
      set((state) => ({ items: [...state.items, newItem] }));
    } catch (err: any) {
      set({ error: err.message || "Failed to add item" });
    }
  },

  toggleItem: async (id: string) => {
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;

    const newCompleted = !currentItem.completed;

    // Optimistic UI update
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, completed: newCompleted } : item
      ),
    }));

    try {
      const res = await fetch("/api/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: newCompleted }),
      });
      if (!res.ok) {
        // Revert on error
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, completed: currentItem.completed } : item
          ),
        }));
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || "Failed to update item in D1 DB");
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to toggle item" });
    }
  },

  removeItem: async (id: string) => {
    const previousItems = get().items;

    // Optimistic UI removal
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));

    try {
      const res = await fetch(`/api/items?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        // Revert on error
        set({ items: previousItems });
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || "Failed to delete item from D1 DB");
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to remove item" });
    }
  },
}));
