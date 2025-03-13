import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  description: string;
}
// membre, expert

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.__v;
    return ret;
  },
});
