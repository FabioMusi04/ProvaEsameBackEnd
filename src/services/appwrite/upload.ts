import UploadedFile from "../../api/uploadedFiles/model.ts";
import Config from "../../config.ts";

import { ID } from "node-appwrite";
import { storage } from "./index.ts";
import { InputFile } from "node-appwrite/file";
import { generalLogger } from "../logger/winston.ts";
import { IVoucher } from "../../api/vouchers/model.ts";
import { LinkedEntityTypeEnum } from "../../utils/enum.ts";

export async function uploadImage(fileBuffer: Buffer, fileName: string, voucher: IVoucher) {
    try {
        const response = await storage.createFile(
            Config.appwrite.bucketUploadsId,
            ID.unique(),
            InputFile.fromBuffer(
                fileBuffer as Buffer,
                fileName,
            ));

        const uploadedFile = await UploadedFile.create({
            uploaderId: voucher.userId,
            documentType: 'image',
            originalName: fileName,
            full: response.$id,
            linkedEntity: {
                linkedEntityType: LinkedEntityTypeEnum.VOUCHER_IMAGE,
                linkedEntityId: voucher._id,
            },
            metadata: {},
            thumbnail: {},
        });

        return uploadedFile;
    } catch (error) {
        generalLogger.error('Upload failed:', error);
        throw error;
    }
}
