import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: { //data itself
    products: [],
    productsInBag: []
  },

  mutations: {
    loadProducts(state, products){ //change data in state (CAN NOT BE ASYNC)
      state.products = products;
    },

    loadBag(state, products){ //change data in state (CAN NOT BE ASYNC)
      state.productsInBag = products;
    },

    addToBag(state, product){
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },

    removeFromBag(state, productId){
      var updatedBag = state.productsInBag.filter(item => item.id != productId);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    }
  },

  actions: {

    loadProducts({commit}){ //this is calling mutation (CAN BE ASYNC)
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts',response.data)
      })
    },

    loadBag({commit}){ //this is calling mutation (CAN BE ASYNC)
      if(localStorage.getItem("productsInBag")){
        commit('loadBag',JSON.parse(localStorage.getItem("productsInBag")))
      }  
    },

    addToBag({commit}, product){
      commit('addToBag', product);
    },

    removeFromBag({commit}, productId){

      if(confirm('Are you sure you want to remove item from bag?')){
        commit('removeFromBag', productId)
      }
    }

  },

  modules: {
  }
})
