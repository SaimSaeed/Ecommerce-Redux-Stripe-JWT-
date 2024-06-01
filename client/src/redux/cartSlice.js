import {createSlice} from "@reduxjs/toolkit"


const cartSlice  = createSlice({
name:"cart",
initialState:{
    // Products are stored in array
    products:[],
    // Quantity that will be showed on cart
    quantity:0,
    // Total value of products
    total:0,

},
reducers:{
    addProduct: (state,action)=>{
        // Increase the number of products added to cart
        // This is cart quantity
           state.quantity+=1
        //    Pushing Product to cart
           state.products.push(action.payload)
        //    Total price calculate
        // the price from payload and the quantity from payload
        // cart quantity and payload quantity are not the same
           state.total += action.payload.price  * action.payload.quantity

    }
}
})

export const {addProduct} = cartSlice.actions

export default cartSlice.reducer