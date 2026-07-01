import { useState } from "react";
import type { TicketListParams } from "../types";
import { useDebounce } from "./useDebounce";

const DEFAULT_PARAMS: TicketListParams = {
  page: 1,
  page_size: 3,
  sort_by: "created_at",
  order: "desc",
};

export function useFilters() {
  const [params, setParams] = useState<TicketListParams>(DEFAULT_PARAMS);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  const queryParams: TicketListParams = {
    ...params,
    search: debouncedSearch || undefined,
  };

  return {
    params: queryParams,
    setParams,
    searchInput,
    setSearchInput,
  };
}
