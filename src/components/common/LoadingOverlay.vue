<script setup>
import ProgressBar from 'primevue/progressbar';

const props = defineProps({
  loading: {
    type: Boolean,
  },
});
</script>
<template>
  <ProgressBar mode="indeterminate" class="h-1 top-0 w-full left-0" style="height: 2px"
    v-if="props.loading" />
</template>
