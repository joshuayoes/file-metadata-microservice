import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { FileModule } from "../src/file/file.module";

describe("File Module", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FileModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe("POST /fileanalyse", () => {
    it(`should respond with metadata from valid request`, () => {
      return request(app.getHttpServer())
        .post("/fileanalyse")
        .set("Content-Type", "multipart/form-data")
        .attach("upfile", Buffer.from([""]), "image.jpg")
        .expect(201)
        .expect({
          name: "image.jpg",
          type: "image/jpeg",
          size: 1,
        });
    });

    it(`should respond with 400 response on invalid request`, () => {
      return request(app.getHttpServer())
        .post("/fileanalyse")
        .send("some-invalid-request")
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
