import React from 'react'
import './style.css'

export const InputSearch = props => (
    // <div class="form-group has-search">
    //     <span class="fa fa-search form-control-feedback" ></span>
    //     <input type="text" class="form-control" placeholder="Pesquisar" />
    // </div>
    <div className="row">
        <div className="col-md-12">
            <div className="input-group">
                <input className="form-control py-2 border-right-0 border" type="search" id="example-search-input" placeholder="Pesquisar" />
                <span className="input-group-append">
                    <div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
                </span>
            </div>
        </div>
    </div>
)
