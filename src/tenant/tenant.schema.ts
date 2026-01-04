import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ _id: false })
export class WhiteLabel {
  @Prop({ required: false })
  logoUrl?: string;

  @Prop({ required: false })
  primaryColor?: string;
}
export const WhiteLabelSchema = SchemaFactory.createForClass(WhiteLabel);

@Schema({ timestamps: true, strict: false })
export class Tenant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slg: string;

  @Prop({ type: WhiteLabelSchema, required: false })
  whiteLabel?: WhiteLabel;

  @Prop({ type: Number, required: true, default: 0 })
  maxUsers: number;

  @Prop({ type: Number, required: true, default: 0 })
  maxShutdowns: number;

  @Prop({ type: Boolean, required: true, default: false })
  active: boolean;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

TenantSchema.index({ slg: 1 }, { unique: true });
TenantSchema.index({ name: 1 });
TenantSchema.index({ createdAt: -1 });

export const TENANT_MODEL_NAME = 'Tenant';
