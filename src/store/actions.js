import { ADD_COUNTER, ADD_TO_CART } from '@/store/mutations-types'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldproduct = null
      context.state.cartList.forEach(item => {
        if (item.iid == payload.iid) {
          oldproduct = item
        }
      })
      if (oldproduct) {
        // oldproduct.count += 1
        context.commit(ADD_COUNTER, oldproduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  },
}
