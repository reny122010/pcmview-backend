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
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

TenantSchema.index({ slg: 1 }, { unique: true });

export const TENANT_MODEL_NAME = 'Tenant';
