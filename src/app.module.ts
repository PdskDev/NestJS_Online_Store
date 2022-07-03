import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductsService } from './models/products.service';
import { AdminModule } from './admin/admin.module';
import { User } from './models/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './models/users.service';
import { CartModule } from './cart/cart.module';
import { Item } from './models/item.entity';
import { Order } from './models/order.entity';
import { OrderService } from './models/order.service';
import { AccountModule } from './account/account.module';

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
      entities: [Product, User, Item, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User, Item, Order]),
    AdminModule,
    AuthModule,
    CartModule,
    AccountModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService, UsersService, OrderService],
  exports: [ProductsService, UsersService, OrderService],
})
export class AppModule {}
