import { ref } from "vue";

export default function useCounter() {
  const count = ref(0);

  function increment() {
    // .value is needed in JavaScript
    count.value++;
  }

  // don't forget to expose the function as well.
  return {
    count,
    increment,
  };
}
