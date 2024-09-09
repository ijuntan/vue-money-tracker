<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DatePicker from "primevue/datepicker";
import { onMounted, onUnmounted, ref } from "vue";
import { startOfMonth, format } from "date-fns";
import Button from "primevue/button";
import { data } from "./dummyTransaction";
import AddTransaction from "@/components/AddTransaction.vue";
import { fetchTransactions } from "@/services/transaction";
import { TransactionResponse, TransactionTableMap, TransactionTableObject } from "@/types";

const dateFilter = ref([startOfMonth(new Date()), new Date()]);
const currency = "$";

const transactions = ref([]);

const addTransactionModal = ref(false);

const expandedRows = ref({});

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

const onKeyUp = (e: KeyboardEvent) => {
  if (e.key === "t") {
    addTransactionModal.value = !addTransactionModal.value;
  }
};

onMounted(() => {
  expandAll();
  // id: format(new Date(), "yyyyMMdd"),
  //   date: new Date(),
  //   details: [
  //     {
  //       id: 1,
  //       name: "Income 1",
  //       income: 10000,
  //     },
  fetchTransactions()
  .then((res) => {
    if(res) {
      const data = res.reduce<TransactionTableObject>((acc, t) => {
        const formattedDate = format(t.date, "yyyyMMdd");
        if (acc[formattedDate]) {
          acc[formattedDate].details.push({
            id: t.id,
            name: t.description,
            income: t.tag.transaction_type === "INC" ? t.amount : null,
            expense: t.tag.transaction_type === "EXP" ? t.amount : null,
          });
        } else {
          acc[formattedDate] = {
            id: format(t.date, "yyyyMMdd"),
            date: new Date(t.date),
            details: [
              {
                id: t.id,
                name: t.description,
                income: t.tag.transaction_type === "INC" ? t.amount : null,
                expense: t.tag.transaction_type === "EXP" ? t.amount : null,
              },
            ],
          };
        }
        return acc;
      }, {});
      
      transactions.value = Object.values(data);
    }
  });
  // Check for key up T for add transaction modal
  window.addEventListener("keyup", onKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keyup", onKeyUp);
});
</script>

<template>
  <div class="dashboard-layout">
    <div class="transaction-table">
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="transactions"
        dataKey="id"
        scrollable
        scroll-height="600px"
      >
        <template #header>
          <div class="flex items-end justify-between">
            <div>
              <label for="dateFilter" class="block mb-2"
                >Transaction range</label
              >
              <DatePicker
                v-model="dateFilter"
                id="dateFilter"
                selection-mode="range"
                placeholder="Select Date"
                date-format="dd/mm"
                show-icon
              />
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

        <Column expander class="bg-slate-100" style="width: 3rem"></Column>
        <Column field="date" header="Date" class="bg-slate-100">
          <template #body="{ data }">
            <div>
              {{ format(data.date, "dd MMMM yyyy") }}
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
                  data.income && currency + " " + data.income
                }}</span>
              </template>
            </Column>

            <Column field="expense">
              <template #header>
                <span class="text-red-400 font-bold"> Expense </span>
              </template>
              <template #body="{ data }">
                <span class="text-red-400">{{
                  data.expense && currency + " " + data.expense
                }}</span></template
              >
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>

    <AddTransaction
      :visible="addTransactionModal"
      @close="addTransactionModal=false"
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
  transition: all 0.5s
}

:deep(.p-datatable-header) {
  border-radius: 10px;
}
</style>
