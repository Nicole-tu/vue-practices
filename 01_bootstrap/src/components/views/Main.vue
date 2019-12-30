<template>
  <div>
    <nav-bar />
    <div class="content-wrapper">
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9">
              <router-view></router-view>
            </div>
            <div class="col-md-3">
              <right-side />
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer />
  </div>
</template>
<script>
import NavBar from "@/components/layouts/Header";
import RightSide from "@/components/layouts/RightSide";

export default {
  name: "Main",
  components: { NavBar, RightSide },
  data() {
    return {};
  }
};
</script>
