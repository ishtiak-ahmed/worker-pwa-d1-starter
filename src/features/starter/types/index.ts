export interface StarterItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface StarterState {
  appName: string;
  themeMode: "light" | "dark";
  counter: number;
  items: StarterItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  toggleTheme: () => void;
  incrementCounter: () => void;
  decrementCounter: () => void;
  setInitialItems: (items: StarterItem[]) => void;
  fetchItems: () => Promise<void>;
  addItem: (title: string) => Promise<void>;
  toggleItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}
