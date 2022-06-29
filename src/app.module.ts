import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductsService } from './models/products.service';
import { AdminModule } from './admin/admin.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssword01',
      database: 'nest_online_store',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class AppModule {}
