import React from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import 'rc-drawer/assets/index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { ThemeStore } from '../hooks/ThemeStore'
import Theme from '../theme/Theme'

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeStore>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ThemeStore>
  )
}
export default MyApp
