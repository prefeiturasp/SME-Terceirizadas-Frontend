import React from 'react'
import { Header } from '../Main/Header';
import { Sidebar } from '../Main/Sidebar';

export default props => (
    <div id="wrapper">
        <Header />
        <Sidebar />
        <div id="content-wrapper" className="pt-5">
            <div className="d-flex flex-column p-4 mt-5">
                <span className="page-title">{props.titulo}</span>
                {props.children}
            </div>
        </div>
    </div>
)