<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/supabase";
import { RouterView } from "vue-router";
import router from "./routes";

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
</template>

<style>

</style>
