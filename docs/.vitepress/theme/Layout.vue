<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";

const { page } = useData();
</script>

<style scoped></style>

<template>
  <div class="error-page" v-if="page.isNotFound">
    <!--    <img alt="Logo" src="/logo-fit.svg">-->
    <div class="content">
      <h1>Oh no!</h1>
      <p class="description">The page you have requested could not be found.</p>
      <div class="action-buttons">
        <a class="action-button" href="/">
          <IconifyIcon icon="fa-solid:arrow-circle-left" />
          <span>Go Back Home</span>
        </a>
      </div>
    </div>
  </div>
  <DefaultTheme.Layout v-else />
</template>
