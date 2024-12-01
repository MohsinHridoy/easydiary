
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
const Root = () => {
  return (
    <>
    
    {/* <Navbar></Navbar> */}
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Root
