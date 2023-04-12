import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import Web3 from 'web3';

@Injectable()
export class WalletsService {
    private web3: Web3

    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    }

    create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        const createdWallet = new this.walletModel(createWalletDto);
        return createdWallet.save();

    }

    async findAll(): Promise<string[]> {
        return this.web3.eth.getAccounts();
    }

    async getBalance(id: string): Promise<string> {
        const balance = await this.web3.eth.getBalance(id);
        return this.web3.utils.fromWei(balance, 'ether');
    }

    update(id: string, amount: number) {
        return this.walletModel.findOneAndUpdate({ address: id }, { $inc: { balance: amount } }).exec();
    }

    remove(id: string) {
        return `This action removes a #${id} wallet`;
    }
}
