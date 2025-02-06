import { ConfigurableSchema } from '../../utils/lib/mongoose/index.ts';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import mongooseToSwagger from 'mongoose-to-swagger';

export interface IOffer extends Document {
  voucherId: Schema.Types.ObjectId;
  month: string;
  discountPercentage: number;
  minNights: number;
  minPeople: number;
  finalPricePerNightPerPerson: number;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type OfferModel = Model<IOffer, {}, {}>;

const offerSchema = new ConfigurableSchema<IOffer, OfferModel>({
  voucherId: {
    type: Types.ObjectId,
    ref: 'Voucher',
    required: true,
    immutable: true,
  },
  month: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  minNights: {
    type: Number,
    required: true,
  },
  minPeople: {
    type: Number,
    required: true,
  },
  finalPricePerNightPerPerson: {
    type: Number,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
}, {
  timestamps: true,
});

const Offer = mongoose.model<IOffer, OfferModel>('Offer', offerSchema);
export const swaggerSchema = mongooseToSwagger(Offer);

export default Offer;
