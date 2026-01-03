export interface WhiteLabelInterface {
  logoUrl: string;
  primaryColor: string;
}

export interface TenantInterface {
  id: string;
  name: string;
  slg: string;
  whiteLabel: WhiteLabelInterface;
  createdAt: string;
  updatedAt: string;
}
