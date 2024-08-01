<!--
***********************************
Layout containing all dashboard routes
***********************************
-->
<script setup>

</script>

<template>
  <div class="app-container bg-blue-950">

    <div class="flex flex-row justify-start items-stretch flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  overflow: none;
}
</style>
