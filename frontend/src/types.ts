export type Status = "new" | "in_progress" | "done";
export type Priority = "low" | "normal" | "high";

export interface Ticket {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  created_at: string; // ISO datetime string
  updated_at: string;
}

export interface TicketCreatePayload {
  title: string;
  description?: string | null;
  priority?: Priority; // defaults to "normal" on backend if omitted
}

export interface TicketUpdatePayload {
  title?: string;
  description?: string | null;
  priority?: Priority;
}

export interface TicketStatusUpdatePayload {
  status: Status;
}

export interface TicketListResponse {
  items: Ticket[];
  total: number;
  page: number;
  page_size: number;
}

export interface TicketListParams {
  status?: Status;
  priority?: Priority;
  search?: string;
  sort_by?: "created_at" | "priority";
  order?: "asc" | "desc";
  page?: number;
  page_size?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiErrorResponse {
  detail: string | { msg: string; loc: (string | number)[] }[];
}
