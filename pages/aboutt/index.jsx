import React from 'react'
import Footer from "../../compoents/layout/footer"
import Header from "../../compoents/layout/Header"
import About from "../../pages/about"
function index() {
    return (
        <div>

            <Header />
            <div className='mt-10'>
                <About />
            </div>

            <Footer />

        </div>
    )
}

export default index