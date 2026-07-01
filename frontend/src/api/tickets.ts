import request from "./client";
import type {
  Ticket,
  TicketCreatePayload,
  TicketUpdatePayload,
  TicketStatusUpdatePayload,
  TicketListResponse,
  TicketListParams,
} from "../types";

export function listTickets(
  params: TicketListParams = {},
): Promise<TicketListResponse> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const qs = query.toString();
  return request<TicketListResponse>(`/tickets${qs ? `?${qs}` : ""}`);
}

export function createTicket(payload: TicketCreatePayload): Promise<Ticket> {
  return request<Ticket>("/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTicket(
  id: string,
  payload: TicketUpdatePayload,
): Promise<Ticket> {
  return request<Ticket>(`/tickets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateTicketStatus(
  id: string,
  payload: TicketStatusUpdatePayload,
): Promise<Ticket> {
  return request<Ticket>(`/tickets/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteTicket(id: string): Promise<void> {
  return request<void>(`/tickets/${id}`, { method: "DELETE" });
}
