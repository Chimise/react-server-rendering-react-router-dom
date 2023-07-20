import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Header from '../Header.js'


const NotFoundPage = (props) => {
    const error = useRouteError();
    return (<div>
        <Header />
        <div>
            <h2>404</h2>
            <h3>{error ?? props.error}</h3>
            <Link to='/'>Go back to the home page</Link>
        </div>
    </div>)
}

NotFoundPage.defaultProps = {
    error: 'Page not found'
}


export default NotFoundPage;
