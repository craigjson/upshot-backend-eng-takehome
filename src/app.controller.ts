import { Controller, Get } from "@nestjs/common";

@Controller()
export class DefaultController {
  constructor() {}

  @Get()
  getHello(): string {
    return "Hello, API is up and running!";
  }
}
