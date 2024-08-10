<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <div>
        <Navbar/>
        <main>
            <div>Navbar</div>
            <RouterView/>
        </main>
    </div>
</template>

<style>
</style>