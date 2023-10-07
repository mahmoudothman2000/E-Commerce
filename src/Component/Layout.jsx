import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from 'react-detect-offline'


export default function Layout() {



  return (
    <>
    
      <Navbar />
        <Outlet></Outlet>
        <Offline>
          <div className="network">
            <i className="fa-solid fa-wifi fs-4 text-danger mx-2"></i> Network offline
          </div>
        </Offline>

        <Online>
          <div className="network">
            <i className="fa-solid fa-wifi fs-4 text-main mx-2"></i> Network Online
          </div>
        </Online>
      <Footer />

    </>
  )
}







