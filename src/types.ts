export type Transaction = {
    amount: number;
    description: string;
    tag: string;
    date: Date;
};

export interface TransactionResponse{
    id: string;
    amount: number;
    description: string;
    tag: {
        label: string;
        transaction_type: string;
    };
    date: string;
    created_at: string;
    updated_at: string | null;
}

type TransactionDetail = {
    id: string;
    name: string;
    income?: number;
    expense?: number;
}

export interface TransactionTableMap {
    id: string;
    date: Date;
    details: TransactionDetail[];
}

export interface TransactionTableObject {
    [key: string]: TransactionTableMap;
}