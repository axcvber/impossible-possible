import React from 'react'
import Image from 'next/image'
const Logo = () => {
  return <Image src={'/logo.webp'} width={50} height={50} loading='eager' alt='Logo' />
}

export default Logo
