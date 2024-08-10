<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "@/supabase";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import UserAvatar from "./UserAvatar.vue";

const avatarMenu = ref<any>(null);

const toggleAvatarMenu = (e: any) => {
  avatarMenu?.value?.toggle(e);
};

const signOut = async () => {
  await supabase.auth.signOut();
};

const avatarMenuItems = ref([
  {
    label: "Sign Out",
    icon: "pi pi-sign-out",
    command: signOut,
  },
]);
</script>

<template>
  <Menubar class="menubar">
    <template #end>
      <button @click="toggleAvatarMenu">
        <UserAvatar />
      </button>

      <Menu
        ref="avatarMenu"
        id="overlay_avatar_menu"
        aria-haspopup="true"
        aria-controls="overlay_avatar_menu"
        :model="avatarMenuItems"
        :popup="true"
      />
    </template>
  </Menubar>
</template>

<style scoped>
.menubar {
    background-color: var(--p-primary-color);
    border: 0;
    border-radius: 0;
    box-shadow: 0 15px 15px -15px rgb(0 0 0 / 0.3);
    z-index: 100;
}
</style>
