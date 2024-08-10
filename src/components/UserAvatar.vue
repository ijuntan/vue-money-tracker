<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Avatar from "primevue/avatar";

const authStore = useAuthStore();
const { avatar_url, full_name } = authStore.currentUser?.user_metadata || {
  avatar_url: null,
  full_name: "user",
};
const first_name = full_name?.split(" ")[0];
const last_name = full_name?.split(" ")[1];

const labelName = `${first_name?.charAt(0)}${last_name?.charAt(0) || ''}`;
</script>

<template>
  <Avatar
    :image="avatar_url"
    :label="avatar_url ? '' : labelName"
    shape="circle"
    class="border"
    alt="Avatar"
    size="large"
  />
</template>
