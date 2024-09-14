<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import { onMounted } from "vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

onMounted(() => {
  document.title = "Shěng 省";
	global.fetchTagOptions();
});
</script>

<template>
  <div class="layout">
    <Header />
    <main>
      <Navbar />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  background-color: #eefbd5;
}

main > div + div {
  flex: 1;
}
</style>
