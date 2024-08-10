import { defineStore } from "pinia";

import { supabase } from "@/supabase";
import { computed, ref } from "vue";
import { User } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);

  const isAuthenticated = computed(() => currentUser.value !== null);

  const loadUser = async () => {
    currentUser.value = (await supabase.auth.getUser()).data.user;
  };

  const loadSession = async () => {
    return (await supabase.auth.getSession()).data;
  };

  const clearUser = () => {
    currentUser.value = null;
  };

  return {
    currentUser,
    isAuthenticated,
    loadUser,
    loadSession,
    clearUser,
  };
});
