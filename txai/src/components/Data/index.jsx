import { Fragment } from "react"
import "./styles.css"

export default function Data({ dataName, dataEmail, dataAdmin }) {

    return (
        <Fragment>
            <div className='container-data'>
                <div className='data-name'>{dataName}</div>
                <div className='data-email'>{dataEmail}</div>
                <div className='data-admin'>{dataAdmin}</div>
            </div>
            <hr />
        </Fragment>
    )
}