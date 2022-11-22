import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { container as containerStyles, koFiLogo as koFiLogoStyles, chip as chipStyles } from './styles.module.css'

const KoFiButton = () => {
  return (
    <OutboundLink href="https://ko-fi.com/meganesulli" className={`${chipStyles} ${containerStyles}`}>
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          className={koFiLogoStyles }
          alt="Ko-fi logo"
        />
        Support me
    </OutboundLink>
  )
}

export default KoFiButton