import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';

@Injectable()
export class WalletsService {

    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) { }

    create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        const createdWallet = new this.walletModel(createWalletDto);
        return createdWallet.save();

    }

    findAll() {
        return this.walletModel.find().exec();
    }

    findOne(id: string) {
        return this.walletModel.findOne({ address: id }).exec()
    }

    update(id: string, amount: number) {
        console.log(id, amount);
        return this.walletModel.findOneAndUpdate({ address: id }, { $inc: { balance: amount } }).exec();
    }

    remove(id: string) {
        return `This action removes a #${id} wallet`;
    }
}
