import React from 'react'
import Footer from "../../compoents/layout/footer"
import Header from "../../compoents/layout/Header"
import Reservation from "../../compoents/Reservation"
function index() {
    return (
        <div>

            <Header />
            <div className='mt-10'>
                <Reservation />
            </div>

            <Footer />



        </div>
    )
}

export default index