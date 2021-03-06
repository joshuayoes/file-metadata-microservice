import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { FileService } from "./file.service";

@Controller("fileanalyse")
export class FileController {
  constructor(private fileService: FileService) {}

  @Post("/")
  @UseInterceptors(FileInterceptor("upfile"))
  fileAnalyse(@UploadedFile() upfile: RequestFile) {
    const isUnexpectedFile = !upfile?.originalname ||
      !upfile?.mimetype ||
      !upfile?.size;

    if (isUnexpectedFile) {
      throw new BadRequestException("Invalid File");
    }

    const response = this.fileService.analyse(upfile);

    return response;
  }
}
