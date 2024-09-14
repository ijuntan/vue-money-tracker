import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/supabase";
import { Transaction, TransactionResponse } from "@/types";

const fetchTransactions = async () => {
	const { data, error } = await supabase
		.from("transaction")
		.select(`
			id,
			amount,
			tag (
				label,
				transaction_type
			),
			date,
			description,
			created_at,
			updated_at
		`)
		.eq("user_id", useAuthStore().currentUser?.id)
		.order("date", { ascending: false})
		.returns<TransactionResponse[]>()
		;

	if (error) {
		console.error("Error fetching transactions", error);
		return;
	}

	return data;
}

const addTransaction = async (transaction:Transaction) => {
	const t = {
		...transaction,
		user_id: useAuthStore().currentUser?.id
	}

  const { data, error } = await supabase
    .from("transaction")
    .insert(t);

  if (error) {
    console.error("Error adding transaction", error);
    return;
  }

  return (data as (TransactionResponse[]|null));
};

interface TransactionWithId extends Transaction {
  id: string;
}

const updateTransaction = async (transaction:TransactionWithId) => {
	const t = {
		amount: transaction.amount,
		tag: transaction.tag,
		time: transaction.date,
		description: transaction.description,
	}

	const { data, error } = await supabase
		.from("transaction")
		.update(t)
		.eq("id", transaction.id);

	if (error) {
		console.error("Error updating transaction", error);
		return;
	}

	return data;
}

const deleteTransaction = async (transactionId:string) => {
	const { data, error } = await supabase
		.from("transaction")
		.delete()
		.eq("id", transactionId);

	if (error) {
		console.error("Error deleting transaction", error);
		return;
	}

	return data;
}

export { 
	fetchTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction
};
