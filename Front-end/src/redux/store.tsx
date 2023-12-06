import {configureStore} from "@reduxjs/toolkit"
import { userReducer} from "./reducers/user" 
import { tourReducer } from "./reducers/tour"
import { paymentReducer } from "./reducers/payments"
import { reviewReducer } from "./reducers/review"
import { BlogsReducer } from "./reducers/blog"

const Store = configureStore({
    reducer: {
        user: userReducer,
        tours: tourReducer,
        payments: paymentReducer,
        reviews: reviewReducer,
        blogs: BlogsReducer
    }
})

export default Store