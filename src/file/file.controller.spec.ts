import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

describe("FileController", () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [FileService],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should have /fileanalyse POST route", () => {
    expect(controller.fileAnalyse).toBeDefined();
  });

  it("should return expected payload with filetype", async () => {
    const file: RequestFile = {
      originalname: "image.jpg",
      mimetype: "image/jpeg",
      size: 200,
      fieldname: "upfile",
      buffer: Buffer.from([""]),
      encoding: "someencoding",
    };

    expect(controller.fileAnalyse(file)).toStrictEqual(
      { name: file.originalname, type: file.mimetype, size: file.size },
    );
  });

  it("should return expected payload with filetype", async () => {
    const file = {} as RequestFile;

    expect(() => controller.fileAnalyse(file)).toThrowError(
      new BadRequestException("Invalid File"),
    );
  });
});
