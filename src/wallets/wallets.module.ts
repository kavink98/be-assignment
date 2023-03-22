import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
    controllers: [WalletsController],
    providers: [WalletsService]
})
export class WalletsModule { }
