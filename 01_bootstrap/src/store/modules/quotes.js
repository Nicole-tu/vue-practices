import axios from "axios";

const initialState = {
  quoteCategories: {},
  quotesData: {},
  fontArry: [
    "monospace",
    "Solway",
    "Roboto",
    "Source Sans Pro",
    "sans-serif",
    "Solway",
    "serif",
    "Dancing Script",
    "Indie Flower",
    "Amatic SC",
    "Mansalva",
    "Caveat",
    "Caveat Brush",
    "Courgette",
    "Kalam",
    "Great Vibes",
    "Sacramento",
    "Gloria Hallelujah",
    "Patrick Hand SC",
    "Patrick Hand",
    "Handlee",
    "Marck Script",
    "Parisienne",
    "Nothing You Could Do",
    "Nanum Pen Script",
    "cursive"
  ]
};

const state = {
  ...initialState,
  initialState() {
    return initialState;
  }
};

const mutations = {
  setQuoteCategories(state, quoteCategories) {
    state.quoteCategories = quoteCategories;
  },
  setQuotesData(state, quotesData) {
    state.quotesData = quotesData;
  }
};

const getters = {
  quoteCategories: state => state.quoteCategories,
  quotesData: state => state.quotesData,
  fontArry: state => state.fontArry
};

const actions = {
  getQuoteCategories({
    commit
  }) {
    axios
      .get("https://quotes.rest/qod/categories")
      .then(response => {
        commit("setQuoteCategories", response.data.contents.categories);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getQuotesData({
    commit
  }, category) {
    return axios
      .get("https://quotes.rest/qod?category=" + category)
      .then(response => {
        commit("setQuotesData", response.data.contents.quotes[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};