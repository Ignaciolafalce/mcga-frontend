import React from 'React';

function Layout(props){
    return(
        <div class="container">
            {props.children}
        </div>
    );
}
export default Layout;