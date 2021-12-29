import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import './styles/searchTapLuat.css';
import empty from './images/empty.svg';


function TimKiemTapLuat() {
    const [searching, setSearching] = useState(false);
    const [tapLuatSearch, setTapLuatSearch] = useState([]);
    const onSearchClick = () => {
        let _searching = !searching;
        setSearching(_searching);
    }

    return (
        <div className="col-10">
            <div className="row">
                <div className="col-6 half-div half-1">
                    <div className="search-result">
                        <div className="list-tl">
                            { !tapLuatSearch.length? <div className="empty"><img src={empty} className="img-empty" /><p>NOTTHING HERE</p></div> : null}
                        </div>
                    </div>
                </div>
                <div className="col-6 half-div half-2">
                    <div class={searching? "search-form active1":"search-form"}>
                        <div>
                            <input type="text" className="timkiemTL" placeholder="Nhập tên sự kiện"/>
                            <button onClick={onSearchClick}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimKiemTapLuat;