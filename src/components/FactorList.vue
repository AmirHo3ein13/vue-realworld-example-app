<template>
  <div>
    <div v-if="isLoadingFactors" class="factor-preview">Loading factors...</div>
    <div v-else>
      <div v-if="factors.length === 0" class="factor-preview">
        No factors are here... yet.
      </div>
      <RwvFactorPreview
        v-for="(factor, index) in factors"
        :factor="factor"
        :key="index"
      />
      <VPagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvFactorPreview from "./VFactorPreview";
import VPagination from "./VPagination";
import { FETCH_FACTORS } from "../store/actions.type";

export default {
  name: "RwvFactorList",
  components: {
    RwvFactorPreview,
    VPagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      return {
        filters
      };
    },
    pages() {
      if (this.isLoading || this.factorsCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.factorsCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["factors", "isLoadingFactors", "factorsCount"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchFactors();
    }
  },
  mounted() {
    this.fetchFactors();
  },
  methods: {
    fetchFactors() {
      this.$store.dispatch(FETCH_FACTORS, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
