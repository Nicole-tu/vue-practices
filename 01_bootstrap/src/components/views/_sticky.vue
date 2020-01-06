<template>
  <div class="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
    <div class="card">
      <div class="card-body note">
        <textarea class="sticky-content" v-model="post" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: ""
    };
  }
};
</script>
