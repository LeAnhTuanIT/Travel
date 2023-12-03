import {configureStore} from "@reduxjs/toolkit"
import { userReducer} from "./reducers/user" 
import { tourReducer } from "./reducers/tour"
import { paymentReducer } from "./reducers/payments"
import { reviewReducer } from "./reducers/review"


const Store = configureStore({
    reducer: {
        user: userReducer,
        tours: tourReducer,
        payments: paymentReducer,
        reviews: reviewReducer
    }
})

export default Store