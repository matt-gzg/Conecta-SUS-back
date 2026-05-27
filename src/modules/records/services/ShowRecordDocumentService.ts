import fs from "fs";
import path from "path";
import AppError from "@shared/errors/AppError";
import uploadConfig from "@config/upload";

interface IRequest {
    filename: string;
}

export default class ShowRecordDocumentService {
    public async execute({ filename }: IRequest): Promise<string> {
        const baseDir = path.resolve(uploadConfig.directory);
        const documentPath = path.resolve(baseDir, filename);

        if (documentPath !== baseDir && !documentPath.startsWith(`${baseDir}${path.sep}`)) {
            throw new AppError('Invalid document path');
        }

        await fs.promises.access(documentPath, fs.constants.R_OK);
        return documentPath;
    }
}
