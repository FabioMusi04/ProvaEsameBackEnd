import { generateControllers } from "../../utils/lib/generator/index.ts";
import { Response } from "express";
import Reservations from "./model.ts";
import { IUser } from "../users/model.ts";

const actions = generateControllers(Reservations, 'Reservations');

actions.create = async ({ body, user }, res: Response) => {
  try {
    const offer = await Reservations.create({
      ...body,
      userId: (user as IUser)._id,
    });
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { actions };