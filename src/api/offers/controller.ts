import { generateControllers } from "../../utils/lib/generator/index.ts";
import { Response } from "express";
import Offers from "./model.ts";
import { IUser } from "../users/model.ts";

const actions = generateControllers(Offers, "Offer");

actions.create = async ({ body, user }, res: Response) => {
  try {
    const offer = await Offers.create({
      ...body,
      userId: (user as IUser)._id,
    });
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { actions };