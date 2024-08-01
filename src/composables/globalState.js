import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";

export const useGlobalLoading = createGlobalState(() => {
  // state
  const loading = ref(false);

  // actions
  function setLoading(newValue) {
    loading.value = newValue;
  }

  return { loading, setLoading };
});
