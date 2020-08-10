import React from 'react';
import MainNav from './MainNav';

function Layout(props){
    return(
        <div className="">
            <MainNav></MainNav>
            {props.children}
            <div className="fixed-bottom text-center bg-dark p-2" style={{color:'white'}}>MCGA - UAI 2020</div>
        </div>
    );
}
export default Layout;