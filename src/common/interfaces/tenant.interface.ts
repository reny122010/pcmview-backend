export interface WhiteLabelInterface {
  logoUrl: string;
  primaryColor: string;
}

export interface TenantInputInterface {
  name: string;
  slg: string;
  whiteLabel: WhiteLabelInterface;
}

export interface TenantInterface extends TenantInputInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}
