import Communities from '../componets/helper/Communities'
import Connect from '../componets/helper/connect'
import Footer from '../componets/helper/Footer'
import Hero from '../componets/helper/Hero'
import Top from '../componets/helper/Top'

export default function Home() {
  return (
    <div>
      <Hero/>
      <Communities/>
      <Top/>
      <Connect/>
      <Footer/>
    </div>
  )
}
