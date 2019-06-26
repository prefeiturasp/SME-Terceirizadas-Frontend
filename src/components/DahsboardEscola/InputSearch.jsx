import React from 'react'
import './style.css'

export const InputSearch = props => (
    <div className="row">
        <div className="col-md-12">
            <span class="float-right">
                <input class="input-search" placeholder="Pesquisar" />
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>
)
