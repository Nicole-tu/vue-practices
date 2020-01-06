<template>
  <div class="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
    <div class="card">
      <div class="card-body sticky" :style="{ 'background-color': post.color }">
        <textarea class="sticky-content" v-model="post.content" />
        <div class="sticky-bottom row">
          <span class="col-md-3">
            <a href="javascript:" @click="favorSticky">
              <font-awesome-icon
                :icon="[post.favorIcon, 'star']"
                color="#ffd21e"
              />
            </a>
          </span>
          <span class="col-md-3">
            <a href="javascript:" @click="decoSticky"
              ><font-awesome-icon :icon="['fas', 'palette']"
            /></a>
          </span>
          <span class="col-md-3"
            ><a href="javascript:" @click="saveSticky"
              ><font-awesome-icon :icon="['fas', 'check']" color="green"/></a
          ></span>
          <span class="col-md-3"
            ><a href="javascript:" @click="removeSticky"
              ><font-awesome-icon :icon="['fas', 'trash-alt']" color="red"/></a
          ></span>
        </div>
      </div>
      <div v-if="showPalette">
        <chrome-picker :value="color" @input="updateValue"></chrome-picker>
      </div>
    </div>
  </div>
</template>

<script>
import ChromePicker from "@/components/views/_chromeColor";
export default {
  components: { ChromePicker },
  data() {
    return {
      color: "#fff7ac",
      sticky: {},
      showPalette: false
    };
  },
  props: {
    post: Object
  },
  methods: {
    removeSticky(key) {
      this.$emit("removeSticky", key);
    },
    saveSticky() {
      this.$emit("saveSticky", this.sticky);
    },
    decoSticky() {
      this.showPalette = true;
      this.sticky.color = this.color;
      this.$emit("saveSticky", this.sticky);
    },
    favorSticky(el) {
      this.sticky.favor = !this.sticky.favor;
      if (this.sticky.favor) {
        this.sticky.favorIcon = "fas";
      } else {
        this.sticky.favorIcon = "far";
      }

      this.$emit("saveSticky", this.sticky);
    },
    updateValue(value) {
      this.color = value;
    }
  },
  create() {
    this.sticky = this.post;
  }
};
</script>
