<script setup>

import { useGlobalLoading } from "@/composables";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";

const { loading } = useGlobalLoading();
</script>

<template>
  <LoadingOverlay :loading="loading" />

  <router-view />
</template>
