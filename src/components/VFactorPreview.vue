<template>
  <div class="factor-preview">
    <div class="card container">
      <div class="row">
        <span class="col-md-6">Balance: </span>
        <span class="col-md-6">{{ factor.amount }}</span>
      </div>

      <div class="row">
        <span class="col-md-6">Id: </span>
        <span class="col-md-6">
          <span v-if="factor.val_id === null">-</span>
          <span v-else>{{ factor.val_id }}</span>
        </span>
      </div>

      <div class="row">
        <span class="col-md-6">Type: </span>
        <span class="col-md-6">
          <span v-if="factor.val_type === null">Account Charge</span>
          <span v-else>{{ factor.val_type }}</span>
        </span>
      </div>

      <div class="row">
        <span class="col-md-6">Date: </span>
        <span class="col-md-6">{{ factor.created_at | date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RwvFactorPreview",
  props: {
    factor: {
      type: Object,
      required: true,
      created_at: Date,
      val_type: String,
      val_id: Number,
      amount: Number
    }
  }
};
</script>
