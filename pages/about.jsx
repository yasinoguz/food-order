import React from 'react'
import Image from 'next/image'
import Title from "../ui/title"


function about() {
  return (
    <div className='bg-secondary  '>
           <div className='container  mx-auto flex sm:flex-row flex-col items-center  text-white gap-8 py-12'>

            <div>
                 <div className='relative sm:w-[430px] sm:h-[540px] w-[300px] h-[440px] '>
                  <Image src={"/images/about.png"} alt='' layout='fill' />
                 </div>
            </div>
              
                  
                 <div className='md:w-1/2'>
                 <Title addclas="text-[40px] ">We Are Feane</Title>
               <p className="my-5 flex flex-col items-center">
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don`t look even slightly
               believable. If you are going to use a passage of Lorem Ipsum, you
                need to be sure there isn`t anything embarrassing hidden in the
                middle of text. All
          </p>
          <button className="btn-primary">Read More</button>




                 </div>

           </div>
    </div>
  )
}

export default about