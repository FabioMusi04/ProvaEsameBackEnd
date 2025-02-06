import { ConfigurableSchema } from '../../utils/lib/mongoose/index.ts';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import mongooseToSwagger from 'mongoose-to-swagger';
import { ReservationStatusEnum, ReservationStatusValues } from '../../utils/enum.ts';

export interface IReservation extends Document {
  userId: Schema.Types.ObjectId;
  voucherId: Schema.Types.ObjectId;
  peopleCount: number;
  nights: number;
  month: string;
  totalPrice: number;
  status: ReservationStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ReservationModel = Model<IReservation, {}, {}>;

const reservationSchema = new ConfigurableSchema<IReservation, ReservationModel>({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voucherId: {
    type: Types.ObjectId,
    ref: 'Voucher',
    required: true,
  },
  peopleCount: {
    type: Number,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ReservationStatusValues,
    default: ReservationStatusEnum.PENDING,
  },
}, {
  timestamps: true,
});

const Reservation = mongoose.model<IReservation, ReservationModel>('Reservation', reservationSchema);
export const reservationSwaggerSchema = mongooseToSwagger(Reservation);

export default Reservation;
