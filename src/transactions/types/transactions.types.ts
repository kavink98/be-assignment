export type TransactionReceipt = {
    fromAddress: string;
    toAddress: string;
    blockNumber: number;
    blockHash: string;
    transactionHash: string;
    timestamp: number | string;
    amount: number;
    gasUsed?: number;
};