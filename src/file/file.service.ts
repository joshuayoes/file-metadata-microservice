import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
  analyse(file: RequestFile) {
    const { originalname, mimetype, size } = file;

    return {
      name: originalname,
      type: mimetype,
      size,
    };
  }
}
