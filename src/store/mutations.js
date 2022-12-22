import {ADD_COUNTER, ADD_TO_CART} from '@/store/mutations-types'
export default {
  // 数量加一
  [ADD_COUNTER](state,payload) {
    payload.count++
  },

  // 新增商品
  [ADD_TO_CART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}