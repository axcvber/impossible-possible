import React, { ReactChild } from 'react'
import { Link } from 'react-scroll'

interface IRSLink {
  to: string
  children: ReactChild
  activeClass?: string
  onClick?: () => void
}

const RSLink: React.FC<IRSLink> = ({ to, children, activeClass, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      ignoreCancelEvents
      activeClass={activeClass}
      smooth={true}
      spy={true}
      offset={-62}
      isDynamic={true}
      duration={600}
    >
      {children}
    </Link>
  )
}

export default RSLink
