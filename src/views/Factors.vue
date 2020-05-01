<template>
  <div class="home-factors container">
    <RwvFactorList :items-per-page="10"></RwvFactorList>
  </div>
</template>

<script>
import RwvFactorList from "@/components/FactorList";

export default {
  name: "RwvFactors",
  components: {
    RwvFactorList
  }
};
</script>
