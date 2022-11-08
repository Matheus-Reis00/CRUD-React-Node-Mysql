import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Data from "../../components/Data"
import "./style.css"

export default function IsMaster() {

    const [alldata, setAllData] = useState()

    function renderAllUsers() {
        return alldata.map(data => {
            return (
                <Data
                    dataName={data.name}
                    dataEmail={data.mail}
                    dataAdmin={data.isMaster}
                />
            )
        })
    }

    useEffect(async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_URL_SERVER}/user/showall`)
        setAllData(data)
    }, [])

    return (
        <Fragment>
            <div className='container-ismaster'>
                <header>
                    <div>Nome</div>
                    <div>Email</div>
                    <div>Admin</div>
                </header>
                <div className='data'>
                    {alldata && renderAllUsers()}
                </div>
            </div>
        </Fragment>
    )
}