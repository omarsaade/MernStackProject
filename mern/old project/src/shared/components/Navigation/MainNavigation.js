import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import './MainNavigation.css'





function MainNavigation() {



    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }




    return (
        <Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'><NavLinks /></nav>
            </SideDrawer>
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>YourPlaces</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    )
}

export default MainNavigation



























// =============



// import React, { Fragment, useState } from 'react'
// import { Link } from 'react-router-dom'
// import MainHeader from './MainHeader'
// import NavLinks from './NavLinks'
// import SideDrawer from './SideDrawer'
// import Backdrop from '../UIElements/Backdrop'
// import './MainNavigation.css'





// function MainNavigation() {



//     const [drawerIsOpen, setDrawerIsOpen] = useState(false);

//     const openDrawerHandler = () => {
//         setDrawerIsOpen(true);
//     }

//     const closeDrawerHandler = () => {
//         setDrawerIsOpen(false);
//     }




//     return (
//         <Fragment>
//             {/* el bar el fo2anieh TAHET "mobile" ykun el 2yes tahet 768px */}
//             {/* {drawerIsOpen && <SideDrawer>
//             <nav className='main-navigation__drawer-nav'><NavLinks /></nav>
//         </SideDrawer>} */}
//             {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
//             <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
//                 <nav className='main-navigation__drawer-nav'><NavLinks /></nav>
//             </SideDrawer>
//             {/* el bar el fo2anieh lama ykun el 2yes fo2 768px */}
//             <MainHeader>
//                 <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
//                     <span />
//                     <span />
//                     <span />
//                 </button>
//                 <h1 className='main-navigation__title'>
//                     <Link to='/'>YourPlaces</Link>
//                 </h1>
//                 <nav className='main-navigation__header-nav'>
//                     <NavLinks />
//                 </nav>
//             </MainHeader>
//         </Fragment>
//     )
// }

// export default MainNavigation
