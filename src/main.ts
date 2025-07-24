import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT ?? 3030;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); 
  app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Dermiantin Project")
    .setDescription("Dermantin REST API")
    .setVersion("1.0")
    .addTag("Auth, TypeOrm")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
bootstrap();
