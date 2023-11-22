import {configureStore} from "@reduxjs/toolkit"
import { userReducer} from "./reducers/user" 
import { tourReducer } from "./reducers/tour"
import { paymentReducer } from "./reducers/payments"


const Store = configureStore({
    reducer: {
        user: userReducer,
        tours: tourReducer,
        payments: paymentReducer
    }
})

export default Store