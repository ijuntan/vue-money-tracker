<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/supabase";
import { RouterView } from "vue-router";
import router from "./routes";
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";

const authStore = useAuthStore()
authStore.loadUser()

supabase.auth.onAuthStateChange(e => {
  if(e === 'SIGNED_IN') {
    authStore.loadUser()
  }
  else if(e === 'SIGNED_OUT') {
    authStore.clearUser()
    router.push({ name: 'LandingPage' })
  }
})

</script>

<template>
  <RouterView/>
  <Toast/>
  <ConfirmPopup/>
</template>

<style>

</style>
