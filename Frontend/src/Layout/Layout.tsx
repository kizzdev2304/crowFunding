import Footer from '../components/Footer'
import Header from '../components/Header'
import { PropsChildren } from '../types'
const Layout = ({ children }: PropsChildren) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default Layout
