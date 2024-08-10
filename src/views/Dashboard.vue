<script lang="ts" setup>
import { supabase } from '@/supabase';
import Button from 'primevue/button';
import router from '@/routes';

const signOut = async () => {
  await supabase.auth.signOut();
  router.push('/');
};
</script>

<template>
  <Button @click="signOut()">
    Sign out
  </Button>
</template>