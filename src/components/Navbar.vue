<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
const menuItems = [
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-th-large",
    to: "/v1/dashboard",
  },
  {
    label: "Transaction",
    icon: "pi pi-fw pi-wallet",
    to: "/v1/transaction",
  },
  {
    label: "Statistics",
    icon: "pi pi-fw pi-chart-bar",
    to: "/v1/statistic",
  },
];

const miniNavbar = ref(false);

const toggleNavbar = () => {
  miniNavbar.value = !miniNavbar.value;
};
</script>

<template>
  <div
    :class="`navbar duration-500 ${
      miniNavbar ? 'mini-navbar' : 'normal-navbar'
    }`"
  >
    <div class="h-10">
      
    </div>
    <div class="button-group">
      <router-link v-for="item in menuItems" :to="item.to">
        <button
          :class="`menu-button 
          ${currentRoute.path === item.to ? 'menu-active' : ''} 
          ${
            currentRoute.path === '/v1' && item.to === '/v1/dashboard'
              ? 'menu-active'
              : ''
          } 
          `"
        >
          <i :class="item.icon" class="menu-icon"></i>
          <span v-show="!miniNavbar" class="menu-label">{{ item.label }}</span>
        </button>
      </router-link>
    </div>

    <button class="close-button" @click="toggleNavbar()">
      <i
        :class="`pi pi-fw pi-angle-left duration-500 ${
          miniNavbar ? '-rotate-180' : ''
        }`"
        style="color: slateblue"
      ></i>
    </button>
  </div>
</template>

<style scoped>
.navbar {
  position: relative;
  background-color: var(--p-primary-color);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 15px 15px -15px rgb(0 0 0 / 0.3);
}

.mini-navbar {
  width: 4.5rem;
}

.normal-navbar {
  width: calc(10rem + 10vw);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem;
  width: 100%;
  color: white;
  border-radius: 10px;
}

.menu-active {
  background-color: white;
  color: var(--p-primary-color);
}

.menu-button:hover {
  background-color: rgb(0 0 0 / 0.3);
}

.menu-icon, .menu-label {
  font-size: 1.1rem;
}

.close-button {
  position: absolute;
  top: 0.9rem;
  right: -0.95rem;
  padding: 4px 6px 2px 6px;
  background-color: white;
  border: 2px solid var(--p-primary-color);
  border-radius: 100%;
}

.close-button:hover {
  filter: brightness(0.95);
}
</style>
