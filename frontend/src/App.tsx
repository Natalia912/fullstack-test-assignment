import { useTicketList } from "./hooks/useTickets";
import { TicketTable } from "./components/TicketTable";
import { FilterBar } from "./components/FilterBar";
import { Pagination } from "./components/Pagination";
import { CreateTicketForm } from "./components/CreateTicketForm";
import { LoginForm } from "./components/LoginForm";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { EmptyState } from "./components/EmptyState";
import { ErrorMessage } from "./components/ErrorMessage";
import { useFilters } from "./hooks/useFilterts";

export default function App() {
  const { params, setParams, searchInput, setSearchInput } = useFilters();
  const { data, isLoading, isError, error } = useTicketList(params);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Учёт заявок</h1>
        <LoginForm />
      </header>

      <CreateTicketForm />

      <FilterBar
        params={params}
        onChange={setParams}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
      />

      <main>
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage message={(error as Error).message} />}
        {data && data.items.length === 0 && <EmptyState />}
        {data && data.items.length > 0 && (
          <>
            <TicketTable tickets={data.items} />
            <Pagination
              page={data.page}
              pageSize={data.page_size}
              total={data.total}
              onPageChange={(page) => setParams((p) => ({ ...p, page }))}
            />
          </>
        )}
      </main>
    </div>
  );
}
