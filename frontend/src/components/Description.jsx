import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Description = () => {
  return (
    <motion.div 
     initial = {{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity: 1, y: 0}}
    viewport = {{once: true}}
    
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>turn your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'> 
        <img src={assets.sample_img_1} alt=""  className='w-80 xl:w-96 rounded-lg'/>

        <div className='text-3xl font-medium mb-4'>
          <h2>Introducing  the Ai powered text to image generator</h2>
          <p className='text-gray-600 mb-4'>Welcome to Promptify
                        This tool helps you create images just by describing them in words. It's powered by AI and designed to be simple and fun.

                        Type what you imagine, click generate, and get an image based on your prompt.
                        No design skills needed — just your creativity.

Try it out and see what your ideas can become.</p>
          <p className='text-gray-600'>No need for drawing or editing skills. Just think it. Type it. See it.

Start exploring your creativity today.</p>
        </div>
      </div>


    </motion.div>
  )
}
//export
export default Description
