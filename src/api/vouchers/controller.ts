import { generateControllers } from "../../utils/lib/generator/index.ts";
import { Response } from "express";
import Vouchers from "./model.ts";
import { IUser } from "../users/model.ts";

const actions = generateControllers(Vouchers, "voucher");

actions.create = async ({ body, user }, res: Response) => {
  try {
    const voucher = await Vouchers.create({
      ...body,
      userId: (user as IUser)._id,
    });
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { actions };