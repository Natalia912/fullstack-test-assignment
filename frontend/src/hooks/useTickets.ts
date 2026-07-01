import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/tickets";
import { queryKeys } from "../api/query-keys";
import type {
  TicketListParams,
  TicketCreatePayload,
  TicketUpdatePayload,
  TicketStatusUpdatePayload,
} from "../types";

export function useTicketList(params: TicketListParams) {
  return useQuery({
    queryKey: queryKeys.tickets(params),
    queryFn: () => api.listTickets(params),
    placeholderData: (prev) => prev, // keeps old page visible while refetching (avoids flicker on filter/page change)
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TicketCreatePayload) => api.createTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useUpdateTicket(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TicketUpdatePayload) => api.updateTicket(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TicketStatusUpdatePayload;
    }) => api.updateTicketStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
