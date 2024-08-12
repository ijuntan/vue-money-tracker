<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <div class="layout">
        <Header/>
        <main>
            <Navbar/>
            <RouterView/>
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
    background-color: #eefbd5;
    padding: 1rem;
    gap: 1rem;
    display: flex;
}

main > div + div {
    flex: 1;
}
</style>