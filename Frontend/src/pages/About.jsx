import { useState } from "react"
import Title from "../components/Title"
import { assets } from "../assets/frontend_assets/assets"
import NewsLetter from '../components/NewsLetter.jsx'

const About = () => {

  return (
    <div className="border-t pt-6">
      <div className="text-2xl text-center py-6">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="py-8 flex sm:flex-row flex-col gap-10 gap-y-20">
        <img src={assets.about_img} className="w-full sm:w-[40%] object-cover" />
        <div className="flex flex-col gap-8 text-gray-500 justify-center w-full">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora officiis placeat dolore! repellat ipsum at suscipit quasi sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis impedit aliquid sunt facere deleniti voluptates modi nam quis consectetur exercitationem repudiandae itaque culpa, officiis porro ducimus repellat voluptatum magni quia.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit in incidunt maxime accusantium aliquam blanditiis vero minus commodi neque, quo ipsa non beatae harum dolorum consectetur! Odit aliquam ad accusantium . Porro necessitatibus reprehenderit delectus, est laboriosam nostrum minima autem blanditiis nesciunt quaerat, fugiat voluptatem dolore, eius consequuntur totam modi odio facilis aliquam.</p>
          <p className="font-medium text-gray-800">Our Mission</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis officiis tenetur vel, minus pariatur neque minima non earum nostrum incidunt veniam delectus beatae, ipsa hic sequi maiores, laudantium provident culpa.</p>
        </div>
      </div>
      <div>
        <div className="py-10 text-3xl">
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className="flex md:flex-row flex-col text-sm text-gray-500">
          <div className="flex-1 border flex justify-center flex-col gap-2 px-10 py-20">
            <h1 className="text-sm text-gray-900 font-medium">Quality Assurance:</h1>
            <p className="">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="flex-1 border flex justify-center flex-col gap-2 px-10 py-20">
            <h1 className="text-sm text-gray-900 font-medium">Convenience:</h1>
            <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="flex-1 border flex justify-center flex-col gap-2 px-10 py-20">
            <h1 className="text-sm text-gray-900 font-medium">Exceptional Customer Service:</h1>
            <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About