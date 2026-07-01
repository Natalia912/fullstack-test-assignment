import type { TicketListParams } from "../types";

export const queryKeys = {
  tickets: (params: TicketListParams) => ["tickets", params] as const,
  ticket: (id: string) => ["tickets", id] as const,
};
