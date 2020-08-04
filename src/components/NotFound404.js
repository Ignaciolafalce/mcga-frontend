import React from 'React';

function NotFound404(props){
    return(
        <div class="container">
            <h1>Sorry, nothing here!</h1>
            {props.children}
        </div>
    );
}
export default NotFound404;