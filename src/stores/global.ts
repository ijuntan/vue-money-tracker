import { defineStore } from "pinia";
import { supabase } from "@/supabase";
import { ref } from "vue";
import { useAuthStore } from "./auth";

type TagOption = {
    id: string;
    name: string;
};

export const useGlobalStore = defineStore("global", () => {
	const authStore = useAuthStore();
  const tagOptions = ref<TagOption[]>([]);

	const fetchTagOptions = async () => {
		const { data, error } = await supabase
			.from("tag")
			.select("id, label")
			.eq("user_id", authStore.currentUser?.id);

		if (error) {
			console.error("Error fetching tags", error);
			return;
		}

		tagOptions.value = data.map((data) => ({
			id: data.id,
			name: data.label
		})) || [];
	};

  return {
    tagOptions,
		fetchTagOptions
  };
});