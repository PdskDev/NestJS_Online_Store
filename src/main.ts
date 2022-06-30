/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as session from 'express-session';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //Create Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); //to store static files
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //to store views templates

  hbs.registerPartials(join(__dirname, '..', 'views/layouts')); // Define partial layouts folder
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts')); // Watch changes in views files
  app.setViewEngine('hbs'); // setup Handlebar as template engine

  app.use(
    session({
      secret: '_Session_@Secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(function (req, res, next) {
    res.locals.session = req.session;
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      res.locals.flashErrors = flashErrors;
      req.session.flashErrors = null;
    }
    next();
  });

  await app.listen(3000);
}
bootstrap();
