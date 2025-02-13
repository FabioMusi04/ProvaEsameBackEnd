import mongoose, { Schema } from "mongoose";
import User, { IUser } from "../../../api/users/model.ts";
import connectToDatabase from "../mongo.ts";
import { generalLogger } from "../../logger/winston.ts";
import { LinkedEntityTypeEnum, UsersRoleEnum } from "../../../utils/enum.ts";
import Voucher, { IVoucher } from "../../../api/vouchers/model.ts";
import { IOffer } from "../../../api/offers/model.ts";
import Offer from "../../../api/offers/model.ts";
import { uploadImage } from "../../appwrite/upload.ts";
import fs from "fs";

const seedData = async () => {
  try {
    await connectToDatabase();

    await User.deleteMany({});
    await Voucher.deleteMany({});
    generalLogger.info("Cleared existing data.");

    const userDatas: Partial<IUser>[] = [
      { username: "admin", email: "admin@admin.com", firstName: "admin", lastName: "admin", password: "adminadmin", role: UsersRoleEnum.ADMIN, isActive: true },
      { username: "user", email: "user@user.com", firstName: "user", lastName: "user", password: "useruser", role: UsersRoleEnum.USER, isActive: true },
    ];

    for (const userData of userDatas) {
      const user = new User({
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        role: userData.role,
        isActive: userData.isActive,
      });
      const newUser = await user.save();
      userDatas[userDatas.indexOf(userData)] = newUser;
    }
    generalLogger.info("Users seeded.");

    const vouchersData: Partial<IVoucher>[] = [
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Summer Getaway",
      description: "Enjoy a summer vacation at a beautiful beach resort.",
      basePricePerNightPerPerson: 150,
      availableMonths: ["June", "July", "August"],
      locations: ["Malibu", "Miami"],
      maxPeople: 4,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Winter Wonderland",
      description: "Experience the magic of winter in a cozy cabin.",
      basePricePerNightPerPerson: 200,
      availableMonths: ["December", "January", "February"],
      locations: ["Aspen", "Whistler"],
      maxPeople: 6,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Spring Retreat",
      description: "Relax and rejuvenate with a springtime retreat.",
      basePricePerNightPerPerson: 120,
      availableMonths: ["March", "April", "May"],
      locations: ["Napa Valley", "Charleston"],
      maxPeople: 2,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Autumn Adventure",
      description: "Explore the beauty of autumn with an outdoor adventure.",
      basePricePerNightPerPerson: 180,
      availableMonths: ["September", "October", "November"],
      locations: ["Vermont", "Smoky Mountains"],
      maxPeople: 5,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "City Escape",
      description: "Take a break from the city with a weekend getaway.",
      basePricePerNightPerPerson: 100,
      availableMonths: ["Year-round"],
      locations: ["New York", "San Francisco"],
      maxPeople: 2,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Luxury Spa",
      description: "Indulge in a luxurious spa experience.",
      basePricePerNightPerPerson: 250,
      availableMonths: ["Year-round"],
      locations: ["Beverly Hills", "Palm Springs"],
      maxPeople: 2,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Mountain Hiking",
      description: "Challenge yourself with a mountain hiking adventure.",
      basePricePerNightPerPerson: 130,
      availableMonths: ["June", "July", "August"],
      locations: ["Rocky Mountains", "Appalachian Trail"],
      maxPeople: 4,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Desert Oasis",
      description: "Discover the beauty of the desert with a unique stay.",
      basePricePerNightPerPerson: 140,
      availableMonths: ["September", "October", "November"],
      locations: ["Sedona", "Joshua Tree"],
      maxPeople: 3,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Cultural Tour",
      description: "Immerse yourself in the local culture with a guided tour.",
      basePricePerNightPerPerson: 160,
      availableMonths: ["Year-round"],
      locations: ["New Orleans", "Santa Fe"],
      maxPeople: 4,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Island Hopping",
      description: "Explore multiple islands with this exciting package.",
      basePricePerNightPerPerson: 220,
      availableMonths: ["June", "July", "August"],
      locations: ["Hawaii", "Caribbean"],
      maxPeople: 6,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Historical Sites",
      description: "Visit historical sites and learn about their significance.",
      basePricePerNightPerPerson: 110,
      availableMonths: ["Year-round"],
      locations: ["Washington D.C.", "Philadelphia"],
      maxPeople: 3,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Wine Tasting",
      description: "Enjoy a wine tasting experience in renowned vineyards.",
      basePricePerNightPerPerson: 170,
      availableMonths: ["Year-round"],
      locations: ["Napa Valley", "Sonoma"],
      maxPeople: 2,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Safari Adventure",
      description: "Experience the thrill of a safari adventure.",
      basePricePerNightPerPerson: 300,
      availableMonths: ["June", "July", "August"],
      locations: ["Kenya", "South Africa"],
      maxPeople: 5,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Ski Trip",
      description: "Hit the slopes with this exciting ski trip package.",
      basePricePerNightPerPerson: 210,
      availableMonths: ["December", "January", "February"],
      locations: ["Aspen", "Lake Tahoe"],
      maxPeople: 4,
      userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
      _id: new mongoose.Types.ObjectId(),
      name: "Beach Resort",
      description: "Relax at a luxurious beach resort.",
      basePricePerNightPerPerson: 190,
      availableMonths: ["Year-round"],
      locations: ["Maldives", "Bahamas"],
      maxPeople: 2,
      userId: userDatas[0]._id as Schema.Types.ObjectId,
      }
    ];

    for (const voucherData of vouchersData) {
      const voucher = new Voucher({
        _id: voucherData._id,
        name: voucherData.name,
        description: voucherData.description,
        basePricePerNightPerPerson: voucherData.basePricePerNightPerPerson,
        availableMonths: voucherData.availableMonths,
        locations: voucherData.locations,
        maxPeople: voucherData.maxPeople,
        userId: voucherData.userId,
        expiredAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
      await voucher.save();
    }

    generalLogger.info("Vouchers seeded.");

    const offersData: Partial<IOffer>[] = [
      {
        voucherId: vouchersData[0]._id as Schema.Types.ObjectId,
        month: "June",
        discountPercentage: 10,
        minNights: 3,
        minPeople: 2,
        finalPricePerNightPerPerson: 135,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[1]._id as Schema.Types.ObjectId,
        month: "December",
        discountPercentage: 15,
        minNights: 4,
        minPeople: 3,
        finalPricePerNightPerPerson: 170,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[2]._id as Schema.Types.ObjectId,
        month: "April",
        discountPercentage: 20,
        minNights: 2,
        minPeople: 1,
        finalPricePerNightPerPerson: 96,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[3]._id as Schema.Types.ObjectId,
        month: "October",
        discountPercentage: 12,
        minNights: 3,
        minPeople: 2,
        finalPricePerNightPerPerson: 158,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[4]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 5,
        minNights: 1,
        minPeople: 1,
        finalPricePerNightPerPerson: 95,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[5]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 25,
        minNights: 2,
        minPeople: 1,
        finalPricePerNightPerPerson: 187.5,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[6]._id as Schema.Types.ObjectId,
        month: "July",
        discountPercentage: 18,
        minNights: 3,
        minPeople: 2,
        finalPricePerNightPerPerson: 106.6,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[7]._id as Schema.Types.ObjectId,
        month: "October",
        discountPercentage: 22,
        minNights: 2,
        minPeople: 2,
        finalPricePerNightPerPerson: 109.2,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[8]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 10,
        minNights: 3,
        minPeople: 2,
        finalPricePerNightPerPerson: 144,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[9]._id as Schema.Types.ObjectId,
        month: "July",
        discountPercentage: 15,
        minNights: 4,
        minPeople: 3,
        finalPricePerNightPerPerson: 187,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[10]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 8,
        minNights: 2,
        minPeople: 2,
        finalPricePerNightPerPerson: 101.2,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[11]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 12,
        minNights: 3,
        minPeople: 2,
        finalPricePerNightPerPerson: 149.6,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[12]._id as Schema.Types.ObjectId,
        month: "July",
        discountPercentage: 20,
        minNights: 5,
        minPeople: 4,
        finalPricePerNightPerPerson: 240,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[13]._id as Schema.Types.ObjectId,
        month: "January",
        discountPercentage: 18,
        minNights: 4,
        minPeople: 3,
        finalPricePerNightPerPerson: 172.2,
        userId: userDatas[1]._id as Schema.Types.ObjectId,
      },
      {
        voucherId: vouchersData[14]._id as Schema.Types.ObjectId,
        month: "Year-round",
        discountPercentage: 10,
        minNights: 2,
        minPeople: 2,
        finalPricePerNightPerPerson: 171,
        userId: userDatas[0]._id as Schema.Types.ObjectId,
      }
    ];

    for (const offerData of offersData) {
      const offer = new Offer({
        voucherId: offerData.voucherId,
        month: offerData.month,
        discountPercentage: offerData.discountPercentage,
        minNights: offerData.minNights,
        minPeople: offerData.minPeople,
        finalPricePerNightPerPerson: offerData.finalPricePerNightPerPerson,
        userId: offerData.userId,
      });
      await offer.save();
    }

    generalLogger.info("Offers seeded.");

    const images = [
      {
        linkedEntityType: LinkedEntityTypeEnum.VOUCHER_IMAGE,
        path: "./images/imageVoucher.jpg",
      },
      {
        linkedEntityType: LinkedEntityTypeEnum.VOUCHER_COVER_IMAGE,
        path: "./images/imageCoverVoucher.jpg",
      }
    ];
    for(let i = 0; i < vouchersData.length; i++) {
      const buffer = fs.readFileSync(images[0].path);
      const buffer2 = fs.readFileSync(images[1].path);
      await uploadImage(buffer, images[0].path, vouchersData[i] as IVoucher, images[0].linkedEntityType);
      await uploadImage(buffer2, images[1].path, vouchersData[i] as IVoucher, images[1].linkedEntityType);
    }

    

    generalLogger.info("Database disconnected. Seed process complete!");
    await mongoose.connection.close();
    process.exit(1);
  } catch (error) {
    generalLogger.error("Error seeding data:", error);
  }
};

seedData();
