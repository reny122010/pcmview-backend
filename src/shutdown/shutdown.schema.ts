import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ShutdownDocument = HydratedDocument<Shutdown>;

@Schema({ timestamps: true })
export class Shutdown {
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  startDate?: Date;

  @Prop({ required: false })
  endDate?: Date;
}

export const ShutdownSchema = SchemaFactory.createForClass(Shutdown);

ShutdownSchema.index({ tenantId: 1, startDate: 1 });

export const SHUTDOWN_MODEL_NAME = 'Shutdown';
