<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import { ref } from "vue";
import { startOfMonth, endOfMonth, format } from "date-fns";
import Button from "primevue/button";

const dateFilter = ref([
  startOfMonth(new Date()),
  new Date()
]);

const transactions = ref([{
  date: new Date(),
  name: "Transaction 1",
  income: 10000,
}])
</script>

<template>
  <div class="dashboard-layout">
    <div>
      <DataTable
        :value = "transactions"
        row-group-mode="subheader"
        groupRowsByy="date"
      >
        <template #header>
          <div class="flex items-end justify-between">
            <div>
              <label for="dateFilter" class="block mb-2">Transaction range</label>
              <DatePicker
                v-model="dateFilter"
                id="dateFilter"
                selection-mode="range"
                placeholder="Select Date"
                date-format="dd/mm"
                show-icon
              />
            </div>

            <Button
              label="Transaction"
              icon="pi pi-plus"
              @onclick="() => {}"
            />
          </div>
        </template>
        
        <Column field="date">
          <template #body="{ data }">
            {{ format(data.date, "dd MMMM yyyy") }}
          </template>
        </Column>
        <Column field="name" header="Transaction">
          <template #body>
            
          </template>
        </Column>

        <Column field="income">
          <template #header>
            <span class="text-blue-500 font-bold"> Income </span>
          </template>
          <template #body>
            
          </template>
        </Column>

        <Column field="expense">
          <template #header>
            <span class="text-red-500 font-bold"> Expense </span>
          </template>
          <template #body>
            
          </template>
        </Column>
      </DataTable>
    </div>

    <div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  gap: 1rem;
  border-radius: 10px;
}

.dashboard-layout > div {
  flex: 2;
  background-color: white;
  border-radius: 10px;
  padding: 0.5rem;
}

.dashboard-layout > div + div {
  flex: 1
}

:deep(.p-datatable-header) {
  border-radius: 10px;
}
</style>
