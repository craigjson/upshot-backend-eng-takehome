import { NestFactory } from "@nestjs/core";
import { AuctionModule } from "./modules/auction/auction.module";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8888);
  console.log("Application is running on: http://localhost:8888");
}
bootstrap();
