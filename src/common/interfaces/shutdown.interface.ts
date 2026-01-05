export interface ShutdownInterface {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  startDate?: string | null;
  endDate?: string | null;
  status: 'open' | 'closed' | 'started' | 'paused' | 'finished';
  createdAt: string;
  updatedAt: string;
}
