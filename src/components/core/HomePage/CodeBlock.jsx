import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import CTAbutton from './Button'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({
    position,heading,subHeading,ctaButton1,ctaButton2,codeBlock,codeColor,backGroundGredient
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/* section 1 */}
      <div className='w-[50%] flex flex-col gap-5 '>
         {heading}
         {subHeading}

         <div className='flex gap-7 mt-7'>
         <CTAbutton active={ctaButton1.active} linkTo={ctaButton1.linkto}>
         <div className='flex gap-2 items-center'>
                    {ctaButton1.btnText}
                    <FaArrowRight/>
         </div>
         </CTAbutton>
         
         <CTAbutton active={ctaButton2.active} linkTo={ctaButton2.linkto}>
                    {ctaButton2.btnText}
         </CTAbutton>

         </div>

      </div>

      {/* section 2 */}

      <div className='flex w-[100%] py-4 lg:w-[500px] h-fit   flex-row border'>


      <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div  className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
          sequence={[codeBlock,2000," "]}
          repeat={Infinity}
          cursor={true}

          style={
            {
              whiteSpace : "pre-line",
              display:"block"
            }
          }
          omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlock
