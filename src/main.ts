import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //Create Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); //to store static files
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //to store views templates

  hbs.registerPartials(join(__dirname, '..', 'views/layouts')); // Define partial layouts folder
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts')); // Watch changes in views files
  app.setViewEngine('hbs'); // setup Handlebar as template engine

  await app.listen(3000);
}
bootstrap();
