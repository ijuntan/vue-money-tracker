
<script setup lang="ts">
import { reactive } from "vue";
import Drawer from "primevue/drawer";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const props = defineProps({
    visible: Boolean,
});

const emits = defineEmits(["close"]);

const data = reactive({
    date: new Date(),
    description: "",
    amount: 0,
});

</script>

<template>
    <Drawer
        position="right"
        :visible="props.visible"
        modal
        @update:visible="emits('close')"
    >
        <template #header>
            Add Transaction
        </template>
        <template #default>
            <div>
                <label for="date" class="block mb-2">Date</label>
                <DatePicker id="date" v-model="data.date" placeholder="Select Date" showIcon />
            </div>
            <div>
                <label for="description" class="block mb-2">Description</label>
                <InputText id="description" v-model="data.description" />
            </div>
            <div>
                <label for="amount" class="block mb-2">Amount</label>
                <InputText id="amount" v-model="data.amount" />
            </div>
        </template>
        <template #footer>
            <Button label="Save" />
            <Button label="Cancel" />
        </template>
    </Drawer>
</template>