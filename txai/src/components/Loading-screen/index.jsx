import React from 'react';
import './styles.css'
import GridLoader from "react-spinners/GridLoader";

export default function LoadingScreen() {
    return (
        <div className='container-loading'>
            <GridLoader size='50'/>
            <p>Loading</p>
        </div>
    )
}

