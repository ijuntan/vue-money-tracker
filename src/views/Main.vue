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
    padding: 0.5rem;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #e0e0e0;
}
</style>