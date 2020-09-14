import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "./file.service";

describe("FileService", () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should have defined analyse method", () => {
    expect(service.analyse).toBeDefined();
  });

  it("should have analyse method that return expected payload", async () => {
    const file: RequestFile = {
      originalname: "image.jpg",
      mimetype: "image/jpeg",
      size: 200,
      fieldname: "upfile",
      buffer: Buffer.from([""]),
      encoding: "someencoding",
    };

    expect(service.analyse(file)).toStrictEqual(
      { name: file.originalname, type: file.mimetype, size: file.size },
    );
  });
});
