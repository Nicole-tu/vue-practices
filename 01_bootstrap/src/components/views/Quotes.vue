<template>
  <div class="quotes-page">
    <br />
    <h3>The best quotes of the day...</h3>
    <p></p>
    <div>
      <ul class="list-group list-group-horizontal quotes-categories">
        <li
          class="list-group-item"
          :class="{ active: quote.isActive }"
          v-for="quoteCates in quoteCategories"
          :key="quoteCates"
          :id="quoteCates"
        >
          <a href="javascript:;" @click="changeQuote(quoteCates)">
            <font-awesome-icon :icon="quoteIcon" />
            {{ quoteCates }}
          </a>
        </li>
      </ul>
    </div>
    <div class="switch">
      <span class="switch-title">
        Show picture
      </span>
      <div class="switch-button">
        <input
          id="switch-toggle"
          class="cmn-toggle cmn-toggle-round-flat"
          type="checkbox"
          v-model="showPicture"
        />
        <label for="switch-toggle"></label>
      </div>
    </div>
    <div class="text-center">
      <div class="quotes-tips" v-show="showTips">
        Get your quote from the above categories...
      </div>
      <div class="quotes-area" v-show="showQuotes">
        <div v-if="!showPicture" :style="quote.style">
          <blockquote class="quotes-blockquote-pure blockquote text-center">
            <p class="mb-0">
              {{ quote.quote }}
            </p>
            <footer class="blockquote-footer">
              {{ quote.author }}
            </footer>
          </blockquote>
        </div>
        <div v-else>
          <img class="quotes-img" :src="quote.background" />
          <blockquote class="quotes-blockquote-img blockquote text-right">
            <p class="mb-0">
              {{ quote.quote }}
            </p>
            <footer class="blockquote-footer">
              {{ quote.author }}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showQuotes: false,
      showTips: true,
      showPicture: false,
      quote: {},
      quoteIcon: "angle-double-right"
    };
  },
  computed: {
    quoteCategories() {
      return Object.keys(this.$store.getters.quoteCategories);
    },
    quotesData() {
      return this.$store.getters.quotesData;
    },
    fontArry() {
      return this.$store.getters.fontArry;
    }
  },
  methods: {
    getQuoteCategories() {
      this.$store.dispatch("getQuoteCategories");
    },
    changeQuote(category) {
      this.$store.dispatch("getQuotesData", category).then(() => {
        this.showTips = false;
        this.showQuotes = true;
        this.quote = Object.assign(this.quotesData, {
          style: this.randomStyle()
        });
      });
    },
    randomStyle() {
      let font = this._.sample(this.fontArry);
      let color = this.getRandomColor();
      let bgColor = this.getComplementaryColor(color);
      return `font-family: ${font}; color:${color}; background-color: ${bgColor}; opacity: 0.8;`;
    },
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getComplementaryColor(hexCode) {
      var rgb = [];
      hexCode = hexCode.substr(1); //去除前缀 # 号
      if (hexCode.length === 3) {
        // 处理 "#abc" 成 "#aabbcc"
        hexCode = hexCode.replace(/(.)/g, "$1$1");
      }
      hexCode.replace(/../g, function(color) {
        rgb.push(255 - parseInt(color, 0x10)); //按16进制将字符串转换为数字
      });
      return "rgb(" + rgb.join(",") + ")";
    }
  },
  created() {
    this.getQuoteCategories();
  }
};
</script>
