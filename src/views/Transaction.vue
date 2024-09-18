<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DatePicker from "primevue/datepicker";
import Chip from "primevue/chip";
import { computed, onMounted, ref } from "vue";
import { startOfMonth, format } from "date-fns";
import Button from "primevue/button";
import AddTransaction from "@/components/AddTransaction.vue";
import { deleteTransaction, fetchTransactions } from "@/services/transaction";
import { AddTransactionResponse, TransactionTableMap } from "@/types";
import { useGlobalStore } from "@/stores/global";
import { thousandSeparator } from "@/utils/numberFormatter";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const dateFilter = ref([startOfMonth(new Date()), new Date()]);
const currency = "$";
const transactions = ref<TransactionTableMap[]>([]);

const addTransactionModal = ref(false);

const expandedRows = ref({});

const global = useGlobalStore();
const tagOptions = computed(() => global.tagOptions);

const handleDeleteTransaction = (event: Event, id: string) => {
  confirm.require({
    target: event.target as HTMLElement,
    message: 'Are you sure you want to delete?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Save'
    },
    accept: async() => {
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      try {
        await deleteTransaction(id);
        transactions.value = transactions.value.map((t) => {
            t.details = t.details.filter((d) => d.id !== id);
            t.incTotal = t.details.reduce((acc, d) => d.income ? acc + d.income : acc, 0);
            t.expTotal = t.details.reduce((acc, d) => d.expense ? acc + d.expense : acc, 0);
            return t;
          });
        transactions.value = transactions.value.filter((t) => t.details.length > 0);
      } catch (error) {
        console.error(error);
      }
    },
  });
};

const addTransactionLocally = (transaction: AddTransactionResponse) => {
  const transactionDate = format(transaction.date, "yyyyMMdd");
  const tag = tagOptions.value.find((t) => t.id === transaction.tag);
  const transactionIndex = transactions.value.findIndex((t: TransactionTableMap) => t.id === transactionDate);
  if(transactionIndex > -1) {
    transactions.value[transactionIndex].details.unshift({
      id: transaction.id,
      name: transaction.description,
      income: tag?.transaction_type === "INC" ? transaction.amount : undefined,
      expense: tag?.transaction_type === "EXP" ? transaction.amount : undefined,
    });
    if(tag?.transaction_type === "INC")
      transactions.value[transactionIndex].incTotal += transaction.amount;
    else if(tag?.transaction_type === "EXP")
      transactions.value[transactionIndex].expTotal += transaction.amount;

    transactions.value.sort((a, b) => a.date > b.date ? -1 : 1);
  }
  else {
    transactions.value.unshift({
      id: format(transaction.date, "yyyyMMdd"),
      date: new Date(transaction.date),
      incTotal: tag?.transaction_type === "INC" ? transaction.amount : 0,
      expTotal: tag?.transaction_type === "EXP" ? transaction.amount : 0,
      details: [{
        id: transaction.id,
        name: transaction.description,
        income: tag?.transaction_type === "INC" ? transaction.amount : undefined,
        expense: tag?.transaction_type === "EXP" ? transaction.amount : undefined,
      }]
    });
  }
};

const expandAll = () => {
  if (transactions.value.length < 1) return;

  expandedRows.value = transactions.value.reduce(
    (acc, t) => (acc[t.id] = true) && acc,
    {} as { [key: string]: boolean }
  )
};

const collapseAll = () => {
    expandedRows.value = {};
};

const handleFetchTransactions = async () => {
  try {
    const res = await fetchTransactions();
    if(res) {
      const dateMap = new Map();
      res.forEach((data) => {
        const formattedDate = format(data.date, "yyyyMMdd");
        if(dateMap.has(formattedDate)) {
          if(data.tag.transaction_type === "INC")
            dateMap.get(formattedDate).incTotal += data.amount;
          else if(data.tag.transaction_type === "EXP")
            dateMap.get(formattedDate).expTotal += data.amount;

          dateMap.get(formattedDate).details.push({
            id: data.id,
            name: data.description,
            income: data.tag.transaction_type === "INC" ? data.amount : undefined,
            expense: data.tag.transaction_type === "EXP" ? data.amount : undefined,
          });
        }
        else {
          dateMap.set(formattedDate, { 
            id: formattedDate,
            date: data.date,
            incTotal: data.tag.transaction_type === "INC" ? data.amount : 0,
            expTotal: data.tag.transaction_type === "EXP" ? data.amount : 0,
            details: [{
              id: data.id,
              name: data.description,
              income: data.tag.transaction_type === "INC" ? data.amount : undefined,
              expense: data.tag.transaction_type === "EXP" ? data.amount : undefined,
            }]
          });
        }
      })
      transactions.value = Array.from(dateMap.values());
    }
    else
      transactions.value = [];
  } catch (error) {
    console.error(error);
  }
};

onMounted(async() => {
  await handleFetchTransactions();
  expandAll();
});
</script>

<template>
  <div class="dashboard-layout">
    <div class="transaction-table">
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="transactions"
        dataKey="id"
        removable-sort
        scrollable
        scroll-height="600px"
      >
        <template #header>
          <div class="flex items-end justify-between">
            <div class="flex items-end gap-2">
              <div>
                <label for="dateFilter" class="block mb-2">
                  Transaction range
                </label>
                <DatePicker
                  v-model="dateFilter"
                  id="dateFilter"
                  selection-mode="range"
                  placeholder="Select Date"
                  date-format="dd/mm"
                  show-icon
                />
              </div>
              <Button icon="pi pi-refresh" @click="handleFetchTransactions"/>
            </div>

            <div class="flex gap-2">
              <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
              <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />  
              <Button 
                :label="addTransactionModal ? '' : 'Transaction'"
                :icon="addTransactionModal ? 'pi pi-chevron-right' : 'pi pi-plus'"
                @click="() => addTransactionModal=!addTransactionModal"
              />
            </div>
          </div>
        </template>

        <Column expander class="bg-slate-100/50" style="width: 3rem"></Column>
        <Column sortable field="date" header="Date" class="bg-slate-100/50">
          <template #body="{ data }">
            <div class="flex gap-2 items-center justify-between">
              <div>
                {{ format(data.date, "dd MMMM yyyy") }}
              </div>

              <div class="flex gap-2">
                <Chip class="!bg-blue-500 !text-white">
                  {{ "Total Income: " + currency + " " + thousandSeparator(data.incTotal) }}
                </Chip>
                <Chip class="!bg-red-500 !text-white">
                  {{ "Total Expense: " + currency + " " + thousandSeparator(data.expTotal) }}
                </Chip>
                <Chip class="border">
                  {{ "Net Balance: " + currency + " " + thousandSeparator(data.incTotal - data.expTotal) }}
                </Chip>

              </div>
            </div>
          </template>
        </Column>

        <template #expansion="slotProps">
          <DataTable 
            :value="slotProps.data.details"
          >
            <Column field="name" header="Transaction"></Column>

            <Column field="income">
              <template #header>
                <span class="text-blue-500 font-bold"> Income </span>
              </template>
              <template #body="{ data }">
                <span class="text-blue-500">{{
                  data.income && currency + " " + thousandSeparator(data.income)
                }}</span>
              </template>
            </Column>

            <Column field="expense">
              <template #header>
                <span class="text-red-400 font-bold"> Expense </span>
              </template>
              <template #body="{ data }">
                <span class="text-red-400">{{
                  data.expense && currency + " " + thousandSeparator(data.expense)
                }}</span>
              </template>
            </Column>

            <Column field="" header="Actions" class="w-[150px]">
              <template #body="{ data }">
                <div class="flex gap-2">
                  <Button icon="pi pi-pencil" class="icon-button"/>
                  <Button
                    icon="pi pi-trash"
                    class="icon-button"
                    severity="danger"
                    @click="handleDeleteTransaction($event, data.id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>

    </div>

    <AddTransaction
      :visible="addTransactionModal"
      @close="addTransactionModal=false"
      @add-transaction-locally="addTransactionLocally"
    />
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  width: 100%;
  gap: 1rem;
  border-radius: 10px;
  overflow-x: hidden;
}

.transaction-table {
  background-color: white;
  flex: 1;
  border-radius: 10px;
  padding: 0.5rem;
  transition: all 0.5s;
  margin: 1rem 0rem 1rem 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

:deep(.p-datatable-header) {
  border-radius: 10px;
}

:deep(.p-button.icon-button) {
  padding: 0.2rem 0.1rem;
}

:deep(.p-chip) {
  padding: 0.3rem 0.6rem;
}
</style>