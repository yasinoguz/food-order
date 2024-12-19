import { configureStore } from "@reduxjs/toolkit";
import cardreducer from "./cardslice"

export default configureStore({
    reducer: {
        card: cardreducer
    },
})