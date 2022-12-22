import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
  // 购物车商品
  cartList: []
}

export default new Vuex.Store({
  state,
  getters,
  // 修改state的对象
  mutations,
  actions,
  modules: {
  }
})
