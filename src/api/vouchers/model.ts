import { ConfigurableSchema } from '../../utils/lib/mongoose/index.ts';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import mongooseToSwagger from 'mongoose-to-swagger';

export interface IVoucher extends Document {
  name: string;
  description: string;
  image: Schema.Types.ObjectId;
  basePricePerNightPerPerson: number;
  availableMonths: string[];
  locations: string[];
  maxPeople: number;
  userId: Schema.Types.ObjectId;
  expiredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type VoucherModel = Model<IVoucher, {}, {}>;

const voucherSchema = new ConfigurableSchema<IVoucher, VoucherModel>({
  name: {
    type: String,
    required: true,
    q: true,
  },
  description: {
    type: String,
    required: true,
    q: true,
  },
  basePricePerNightPerPerson: {
    type: Number,
    required: true,
  },
  availableMonths: {
    type: [String],
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  expiredAt: {
    type: Date,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
}, {
  timestamps: true,
  configuration: {
    indexes: [
      {
        fields: { name: 1 },
        options: { unique: true },
      },
    ],
  },
  virtuals: {
    isExpired: {
      get() {
        const expiredAt = this.expiredAt;
        return expiredAt ? expiredAt.getTime() < new Date().getTime() : false;
      },
    },
  },
  
});

const Voucher = mongoose.model<IVoucher, VoucherModel>('Voucher', voucherSchema);
export const swaggerSchema = mongooseToSwagger(Voucher);

export default Voucher;
