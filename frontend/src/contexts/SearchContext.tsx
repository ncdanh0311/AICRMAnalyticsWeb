import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface FilterTag {
  id: string;
  label: string;
  type: "category" | "price" | "sort" | "rating" | "status";
  value: any;
}

export interface SearchState {
  query: string;
  categories: string[];
  priceRange: { min: number; max: number };
  sortBy:
    | "newest"
    | "price_asc"
    | "price_desc"
    | "name_asc"
    | "name_desc"
    | "popular";
  rating: number | null;
  inStock: boolean | null;
  activeFilters: FilterTag[];
}

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_PRICE_RANGE"; payload: { min: number; max: number } }
  | { type: "SET_SORT_BY"; payload: SearchState["sortBy"] }
  | { type: "SET_RATING"; payload: number | null }
  | { type: "SET_IN_STOCK"; payload: boolean | null }
  | { type: "ADD_FILTER"; payload: FilterTag }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "CLEAR_ALL_FILTERS" }
  | { type: "RESET_SEARCH" };

const initialState: SearchState = {
  query: "",
  categories: [],
  priceRange: { min: 0, max: 10000000 },
  sortBy: "newest",
  rating: null,
  inStock: null,
  activeFilters: [],
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };

    case "SET_RATING":
      return { ...state, rating: action.payload };

    case "SET_IN_STOCK":
      return { ...state, inStock: action.payload };

    case "ADD_FILTER":
      return {
        ...state,
        activeFilters: [
          ...state.activeFilters.filter((f) => f.id !== action.payload.id),
          action.payload,
        ],
      };

    case "REMOVE_FILTER":
      return {
        ...state,
        activeFilters: state.activeFilters.filter(
          (f) => f.id !== action.payload
        ),
      };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        query: "",
        categories: [],
        priceRange: { min: 0, max: 10000000 },
        sortBy: "newest",
        rating: null,
        inStock: null,
        activeFilters: [],
      };

    case "RESET_SEARCH":
      return initialState;

    default:
      return state;
  }
}

interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
