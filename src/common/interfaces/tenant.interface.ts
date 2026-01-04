export interface WhiteLabelInterface {
  logoUrl: string;
  primaryColor: string;
}

export interface TenantInterface {
  id: string;
  name: string;
  slg: string;
  whiteLabel: WhiteLabelInterface;
  maxUsers: number;
  maxShutdowns: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
