<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "@/supabase";

import Card from "primevue/card";
import Button from "primevue/button";

const loginLoading = ref(false);

const loginWithGoogle = async () => {
  try {
    loginLoading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw error;
  } catch (error) {
    console.error(error)
  } finally {
    loginLoading.value = false
  }
};
</script>

<template>
  <div class="flex h-screen flex-col xl:flex-row">
      <img
        :src="'landing-page.jpg'"
        alt="Landing Page"
        class="h-2/5 xl:h-screen w-full xl:w-2/5 object-cover"
      />

    <div
      class="flex-1 flex flex-col items-center justify-center h-full bg-slate-100"
    >
      <Card class="w-80 md:w-96 text-center">
        <template #title> Welcome to Shěng 省 </template>
        <template #content>
          <Button @click="loginWithGoogle()" rounded raised class="mt-2">
            <span class="font-bold">Sign in with Google</span>
            <i class="pi pi-google"></i>
            <i v-if="loginLoading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </Button>
        </template>
      </Card>
    </div>
  </div>
</template>
