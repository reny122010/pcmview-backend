export interface ShutdownInterface {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}
