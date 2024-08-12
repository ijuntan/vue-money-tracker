<script lang="ts" setup>
import { computed, ref } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";

import { Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const yearLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthLabels = new Array(30).fill(0).map((_, i) => i + 1);
const weekLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const accountsData = ref([]);

const currentRange = ref("week");
const rangeOptions = ref([
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
]);

const transactionData = ref([
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "Admin",
    created_at: "2021-01-01",
  },
]);

const lineData = computed(() => {
  return {
    labels:
      currentRange.value === "year"
        ? yearLabels
        : currentRange.value === "month"
        ? monthLabels
        : weekLabels,
    datasets: [
      {
        label: "Cash",
        data: [150000, 250000, 30000, 0, 0, 0, 0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "郵局",
        data: [10000, 150000, 0, 20000, 3000, 150000, 0],
        fill: false,
        borderColor: "rgb(75, 150, 50)",
        backgroundColor: "rgb(75, 150, 50)",
        tension: 0.1,
      },
    ],
  };
});
</script>

<template>
  <div class="dashboard-layout">
    <div class="flex gap-[1rem]">
      <Card class="flex-[1.2]">
        <template #title>
          <SelectButton
            v-model="currentRange"
            :options="rangeOptions"
            optionLabel="label"
            option-value="value"
            :allow-empty="false"
            aria-labelledby="multiple"
          />
        </template>
        <template #content>
          <Line
            :data="lineData"
            :options="{
              plugins: {
                legend: {
                  position: 'bottom',
                  align: 'start',
                  labels: {
                    boxHeight: 6,
                    boxWidth: 6,
                    usePointStyle: true,
                  },
                },
              },
            }"
          />
        </template>
      </Card>

      <Card class="flex-1">
        <template #title>
          <SelectButton
            v-model="currentRange"
            :options="rangeOptions"
            optionLabel="label"
            option-value="value"
            :allow-empty="false"
            aria-labelledby="multiple"
          />
        </template>
        <template #content>
          <Bar
            :data="lineData"
            :options="{
              plugins: {
                legend: {
                  position: 'bottom',
                  align: 'start',
                  labels: {
                    boxHeight: 6,
                    boxWidth: 6,
                    usePointStyle: true,
                  },
                },
              },
            }"
          />
        </template>
      </Card>
    </div>
    <Card>
      <template #title> Transactions </template>
      <template accountscontent>
        <DataTable :value="transactionData">
          <template #header>
            <div class="flex">
              <IconField>
                <InputIcon class="pi pi-search" />
                <InputText placeholder="Search" />
              </IconField>
            </div>
          </template>
          <Column field="name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="role" header="Role"></Column>
          <Column field="created_at" header="Created At"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
