import {ADD_COUNTER, ADD_TO_CART} from '@/store/mutations-types'
export default {
  addCart(context,payload) {
    let oldproduct = null
    context.state.cartList.forEach(item => {
      if(item.iid == payload.iid) {
        oldproduct = item
      }
    });
    if(oldproduct) {
      // oldproduct.count += 1
      context.commit(ADD_COUNTER,oldproduct)
    }else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }
    
  }
}