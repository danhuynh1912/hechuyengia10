import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


function Menu() {
    const pathname = window.location.pathname;
    const [value, setValue] = useState(false);
    const onClickNav = () => {
        let _value = !value;
        setValue(_value);
    }

    return (
        <div className="menu col-2">
            <h3>Nhóm 10</h3>
            <div className="nav">
                <div className={pathname === "/" ? "activeNav" : ""} onClick={onClickNav}>
                    <Link to="/">Tìm kiếm địa điểm</Link>
                </div>
                <div className={pathname === "/themsukien" ? "activeNav" : ""} onClick={onClickNav}>
                    <Link to="/themsukien">Thêm sự kiện</Link>
                </div>
                {/* <div className={pathname === "/timkiemluat" ? "activeNav" : ""} onClick={onClickNav}>
                    <Link to="/timkiemluat">Tìm kiếm tập luật</Link>
                </div> */}
                <div className={pathname === "/themluat" ? "activeNav" : ""} onClick={onClickNav}>
                    <Link to="/themluat">Thêm tập luật</Link>
                </div>
            </div>
        </div>
    )
} 

export default Menu;