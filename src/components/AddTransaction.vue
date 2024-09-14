<script setup lang="ts">
import { onMounted, reactive, watch, computed } from "vue";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Select from "primevue/select";
import { useGlobalStore } from "@/stores/global";
import { addTransaction } from "@/services/transaction";
import { Transaction } from "@/types";

const global = useGlobalStore();

const props = defineProps({
  visible: Boolean,
});

const emits = defineEmits(["close"]);

const data = reactive<Transaction>({
  date: new Date(),
  description: "",
	tag: "",
  amount: 0,
});

const tagOptions = computed(() => global.tagOptions);

const resetData = () => {
	data.date = new Date();
	data.description = "";
	data.tag = "";
	data.amount = 0;
};

const handleAddTransaction = async() => {
	try {
		await addTransaction(data);
		resetData();
		emits("close");
	} catch (error) {
		console.error(error);
	}
}
watch(
	() => props.visible,
	(val) => {
		if (val) {
			resetData();

			setTimeout(() => {
				const descriptionInput:(HTMLElement|null) = document.querySelector("#description");
				if (descriptionInput) {
					descriptionInput.focus();
				}
			}, 100);
		}
	}
);

onMounted(() => {
	window.addEventListener("keyup", (e) => {
		if (e.key === "Escape") {
			emits("close");
		}
	});
});
</script>

<template>
  <Transition>
    <div v-show="props.visible" class="container">
      <div class="text-lg font-semibold">Add Transaction</div>
      <div>
        <label for="date" class="block mb-2">Date</label>
        <DatePicker
          id="date"
					name="date"
          v-model="data.date"
          placeholder="Select Date"
          showIcon
        />
      </div>

      <div>
        <label for="description" class="block mb-2">Description</label>
        <InputText 
					id="description"
					name="description"
					v-model="data.description"
					@keyup.enter="$event.target.parentElement.nextSibling.children[1].focus()"
				/>
      </div>

      <div>
        <label for="amount" class="block mb-2">Amount</label>
        <InputText 
					id="amount"
					name="amount"
					v-model="data.amount"
					@keyup.enter="emits('close')"
				/>
      </div>

			<div>
				<label for="tag" class="block mb-2">Tag</label>
				<Select 
					id="tag"
					name="tag"
					class="w-full"
					:options="tagOptions"
					option-label="name"
					option-value="id"
					v-model="data.tag"
				/>
			</div>

      <div class="flex gap-2">
        <Button label="Save"
					@click="handleAddTransaction"
				/>
        <Button
					class="p-button-secondary"
					label="Cancel"
					@click="emits('close')" 
				/>
      </div>
    </div>
  </Transition>
  <!-- <Drawer
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
    </Drawer> -->
</template>

<style scoped>
.container {
  display: flex;
  flex: 0;
  background-color: white;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  margin: 1rem 0rem;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
