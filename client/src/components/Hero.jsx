import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { WebContext } from '../context/WebContext'


const Hero = () => {

    {/*Logic tìm kiếm*/}
    const {setSearchFilter, setIsSearched} = useContext(WebContext)
    const titleRef = useRef(null)
    const locationRef = useRef(null)
    const onSearch = () => {
        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setIsSearched(true)
    }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
        {/* Banner*/}
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Tìm việc khó, có botCV lo</h2>
            <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Hãy để botCV đồng hành cùng bạn trên hành trình chinh phục sự nghiệp.</p>
            <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                {/* Phần content tiêu đề + thanh tìm kiếm theo tên jobs*/}
                <div className='flex items-center'>
                    <img className='h-4 sm:h-5' src={assets.search_icon} alt="Tìm kiếm" />
                    <input type="text" placeholder='Vị trí tuyển dụng' className='max-sm:text-sx p-2 rounded outline-none w-full' ref={titleRef}/>
                </div>
                {/* thanh tìm kiếm theo địa chỉ */}
                <div className='flex items-center'>
                    <img className='h-4 sm:h-5' src={assets.location_icon} alt="Địa điểm" />
                    <input type="text" placeholder='Địa điểm' className='max-sm:text-sx p-2 rounded outline-none w-full' ref={locationRef}/>
                </div>
                <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white text-[11px] m-1'>Tìm kiếm</button>
            </div>
        </div>

        {/* Logo cac cong ty*/}
        <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
            <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                <p className='font-medium'>Công ty</p>
                <img className='h-6' src={assets.microsoft_logo} alt="" />
                <img className='h-6' src={assets.walmart_logo} alt="" />
                <img className='h-6' src={assets.accenture_logo} alt="" />
                <img className='h-6' src={assets.samsung_logo} alt="" />
                <img className='h-6' src={assets.amazon_logo} alt="" />
                <img className='h-6' src={assets.adobe_logo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero