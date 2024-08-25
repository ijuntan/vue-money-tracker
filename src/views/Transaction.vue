<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DatePicker from "primevue/datepicker";
import { onMounted, ref } from "vue";
import { startOfMonth, format, addDays } from "date-fns";
import Button from "primevue/button";

const dateFilter = ref([startOfMonth(new Date()), new Date()]);

const currency = "$";

const transactions = ref([
  {
    id: format(new Date(), "yyyyMMdd"),
    date: new Date(),
    details: [
      {
        id: 1,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 2,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 3,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 4,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 5,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 6,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 7,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 8,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 9,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 10,
        name: "Expense 2",
        expense: 5000,
      },
      ],
  },
  {
    id: format(addDays(new Date(), -1) ,"yyyyMMdd"),
    date: addDays(new Date(), -1),
    details: [
      {
        id: 1,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 2,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 3,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 4,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 5,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 6,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 7,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 8,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 9,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 10,
        name: "Expense 2",
        expense: 5000,
      },
      ],
  },
]);

const expandedRows = ref({});

const expandAll = () => {
  expandedRows.value = transactions.value.reduce(
    (acc, t) => (acc[t.id] = true) && acc,
    {} as { [key: string]: boolean }
  )
};
const collapseAll = () => {
    expandedRows.value = {};
};

onMounted(() => {
  expandAll();
});

</script>

<template>
  <div class="dashboard-layout">
    <div>
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
              <Button label="Transaction" icon="pi pi-plus" @onclick="() => {}" />
            </div>
          </div>
        </template>

        <Column expander style="width: 3rem"></Column>
        <Column field="date" header="Date">
          <template #body="{ data }">
            {{ format(data.date, "dd MMMM yyyy") }}
          </template>
        </Column>

        <template #expansion="slotProps">
          <DataTable 
            :value="slotProps.data.details"
            scrollable
            scroll-height="500px"
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
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-radius: 10px;
}

.dashboard-layout > div {
  background-color: white;
  flex: 1;
  border-radius: 10px;
  padding: 0.5rem;
}

:deep(.p-datatable-header) {
  border-radius: 10px;
}
</style>
