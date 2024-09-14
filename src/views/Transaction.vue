<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DatePicker from "primevue/datepicker";
import { onMounted, onUnmounted, ref } from "vue";
import { startOfMonth, format } from "date-fns";
import Button from "primevue/button";
import AddTransaction from "@/components/AddTransaction.vue";
import { fetchTransactions } from "@/services/transaction";
import { TransactionTableMap, TransactionTableObject } from "@/types";

const dateFilter = ref([startOfMonth(new Date()), new Date()]);
const currency = "$";

const transactions = ref<TransactionTableMap[]>([]);

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

  fetchTransactions()
  .then((res) => {
    if(res) {
      const dateMap = new Map();
      res.forEach((data) => {
        const formattedDate = format(data.date, "yyyyMMdd");
        if(dateMap.has(formattedDate)) {
          dateMap.get(formattedDate).details.push({
            id: data.id,
            name: data.description,
            income: data.tag.transaction_type === "INC" ? data.amount : undefined,
            expense: data.tag.transaction_type === "EXP" ? data.amount : undefined,
          });
        }
        else {
          dateMap.set(formattedDate, { id: formattedDate, date: data.date, details: [{
            id: data.id,
            name: data.description,
            income: data.tag.transaction_type === "INC" ? data.amount : undefined,
            expense: data.tag.transaction_type === "EXP" ? data.amount : undefined,
          }]});
        }
      })
      transactions.value = Array.from(dateMap.values());
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
        removable-sort
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

        <Column expander class="bg-slate-100/50" style="width: 3rem"></Column>
        <Column sortable field="date" header="Date" class="bg-slate-100/50">
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
  transition: all 0.5s;
  margin: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

:deep(.p-datatable-header) {
  border-radius: 10px;
}
</style>
