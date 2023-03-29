import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './schemas/wallet.schema';

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Post()
    create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
        return this.walletsService.create(createWalletDto);
    }

    @Get()
    findAll() {
        return this.walletsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.walletsService.findOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string) {
        return this.walletsService.update(id, 15);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.walletsService.remove(id);
    }
}
