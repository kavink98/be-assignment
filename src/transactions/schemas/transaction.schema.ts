import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {

    @Prop({ unique: true })
    transactionHash: string;

    @Prop()
    fromAddress: string;

    @Prop()
    toAddress: string;

    @Prop()
    amount: number;

    @Prop()
    gasUsed: number;

    @Prop()
    status: string;

    @Prop()
    timestamp: Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
