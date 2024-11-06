import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { database } from "./config";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...database,
      dialect: "mysql",
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
  ],
})
export class AppModule {}
