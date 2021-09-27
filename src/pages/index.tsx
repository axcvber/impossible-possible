import { Header } from '../components/Header/Header'
import SEO from '../components/SEO'
import AboutUs from '../sections/AboutUs'
import Faq from '../sections/Faq'
import Form from '../sections/Form'
import Hero from '../sections/Hero'
import Reviews from '../sections/Reviews'
import Services from '../sections/Services'

export interface IReviews {
  reviews: Array<{
    username: string
    review: string
  }>
}

const Home: React.FC<IReviews> = ({ reviews }) => {
  return (
    <>
      <SEO />
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <Reviews reviews={reviews} />
      <Faq />
      <Form />
    </>
  )
}

export default Home

export async function getServerSideProps() {
  const data = await fetch(`${process.env.DOMAIN_NAME}/api/getReviews`)
  const reviews = await data.json()
  return { props: { reviews } }
}
