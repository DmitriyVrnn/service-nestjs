import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthModule } from './modules/auth/auth.module';
import { TopPageModule } from './modules/top-page/top-page.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { getMongoConfig } from './configs/mongo.config';
import { ProductService } from './module/product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
  ],
  providers: [ProductService],
})
export class AppModule {}
