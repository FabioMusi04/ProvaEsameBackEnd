import { generateControllers } from "../../utils/lib/generator/index.ts";
import { Response } from "express";
import Vouchers, { IVoucher } from "./model.ts";
import { IUser } from "../users/model.ts";
import { uploadImage } from "../../services/appwrite/upload.ts";

const actions = generateControllers(Vouchers, "voucher");

actions.create = async ({ body, user, file }, res: Response) => {
  try {

    const voucher: IVoucher = await Vouchers.create({
      ...body,
      userId: (user as IUser)._id,
    });

    if (!file) {
      throw new Error("File is undefined");
    }
  
    await uploadImage(file.buffer as Buffer, file.filename as string, voucher);

    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { actions };