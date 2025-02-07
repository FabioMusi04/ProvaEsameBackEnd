import UploadedFile from "../../api/uploadedFiles/model.ts";
import Config from "../../config.ts";

import { ID } from "node-appwrite";
import { storage } from "./index.ts";
import { InputFile } from "node-appwrite/file";
import { generalLogger } from "../logger/winston.ts";

export async function uploadImage(fileBuffer: Buffer, fileName: string, uploaderId: string) {
    try {
        const response = await storage.createFile(
            Config.appwrite.bucketUploadsId,
            ID.unique(),
            InputFile.fromBuffer(
                fileBuffer as Buffer,
                fileName,
            ));

        const uploadedFile = await UploadedFile.create({
            uploaderId,
            documentType: 'image',
            originalName: fileName,
            full: response.$id,
            linkedEntity: null,
            metadata: {},
            thumbnail: {},
        });

        return uploadedFile;
    } catch (error) {
        generalLogger.error('Upload failed:', error);
        throw error;
    }
}
