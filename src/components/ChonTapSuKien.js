import React, { useEffect, useState } from 'react';
import './styles/index.local.css';
import circle from './images/circle.png';
import circleChecked from './images/circleChecked.png';
import x from './images/x.png';
import suKienChecked from './images/suKienChecked.png';

function ChonTapSuKien() {
    const [tabActive, setTabActive] = useState(1);
    const [tinhThanh, setTinhThanh] = useState([
        { title: 'Ha Noi' },
        { title: 'Ha Nam' },
        { title: 'Da Nang' },
        { title: 'TP HCM' },
        { title: 'Hai Phong' },
        { title: 'Hai Duong' },
        { title: 'Thanh Hoa' },
        { title: 'Lang Son' },
        { title: 'Bac Giang' },
        { title: 'Bac Ninh' },
        { title: 'Vinh Phuc' },
        { title: 'Hanoi' },
        { title: 'Hanoi' },
        { title: 'Hanoi' },
        { title: 'Hanoi' },
        { title: 'Hanoi' },
    ]);
    const [thoiGian, setThoiGian] = useState([
        { title: 'Đi một ngày' },
        { title: 'Đi nhiều ngày' },
    ]);
    const [phuongTien, setPhuongTien] = useState([
        { title: 'C1: Xe máy' },
        { title: 'C2: Xe khách' },
        { title: 'C3 Tàu thủy' },
    ]);
    const [mua, setMua] = useState([
        { title: 'D1: Mùa Xuân' },
        { title: 'D2: Mùa Hạ' },
        { title: 'D3: Mùa Thu' },
        { title: 'D4: Mùa Đông' },
    ]);
    const [tapSuKien, setTapSuKien] = useState([]);

    useEffect(() => {
        if(checkDaChon(tinhThanh)) setTabActive(2);
        if(checkDaChon(thoiGian)) setTabActive(3);
        if(checkDaChon(phuongTien)) setTabActive(4);
        if(checkDaChon(mua)) setTabActive(0);
    }, [tapSuKien], [tabActive])

    const chonSuKien = (suKien) => {
        if(!tapSuKien.includes(suKien)) {
            setTapSuKien([...tapSuKien, suKien]);
        } else {
            let index = tapSuKien.indexOf(suKien);
            tapSuKien.splice(index, 1);
            setTapSuKien([...tapSuKien]);
        }
    }

    const checkDaChon = (loaiSuKien) => {
        for(let i = 0; i < loaiSuKien.length; i++) {
            if (tapSuKien.includes(loaiSuKien[i].title)) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="container chonsukien">
            <div className="sukientab">
                <div className={!checkDaChon(tinhThanh) && tabActive === 1 ? "tab active-tab":"tab"} onClick={!checkDaChon(tinhThanh) ? () => { setTabActive(1) } : null} >
                    <h5>Tỉnh thành</h5>
                    { checkDaChon(tinhThanh) && <img src={suKienChecked} /> }    
                </div>
                <div className={!checkDaChon(thoiGian) && tabActive === 2 ? "tab active-tab":"tab"} onClick={!checkDaChon(thoiGian) ? () => { setTabActive(2) } : null} >
                    <h5>Thời gian</h5>
                    { checkDaChon(thoiGian) && <img src={suKienChecked} /> }    
                </div>
                <div className={!checkDaChon(phuongTien) && tabActive === 3 ? "tab active-tab":"tab"} onClick={!checkDaChon(phuongTien) ? () => { setTabActive(3) } : null} >
                    <h5>Phương tiện</h5>
                    { checkDaChon(phuongTien) && <img src={suKienChecked} /> }    
                </div>
                <div className={!checkDaChon(mua) && tabActive === 4 ? "tab active-tab":"tab"} onClick={!checkDaChon(mua) ? () => { setTabActive(4) } : null} >
                    <h5>Mùa</h5>
                    { checkDaChon(mua) && <img src={suKienChecked} /> }    
                </div>
            </div>
            <div className="timKiemSuKien">
                <input type="text" placeholder="Nhập sự kiện" />
            </div>
            <div className="sukienlist row">
                { tabActive === 1 && tinhThanh.map((item) => <div className="col-6 option">
                    <img onClick={() => chonSuKien(item.title)} src={tapSuKien.includes(item.title) ? circleChecked : circle} />
                    <p>{item.title}</p>
                </div>) }
                { tabActive === 2 && thoiGian.map((item) => <div className="col-6 option">
                    <img onClick={() => chonSuKien(item.title)} src={tapSuKien.includes(item.title) ? circleChecked : circle} />
                    <p>{item.title}</p>
                </div>) }
                { tabActive === 3 && phuongTien.map((item) => <div className="col-6 option">
                    <img onClick={() => chonSuKien(item.title)} src={tapSuKien.includes(item.title) ? circleChecked : circle} />
                    <p>{item.title}</p>
                </div>) }
                { tabActive === 4 && mua.map((item) => <div className="col-6 option">
                    <img onClick={() => chonSuKien(item.title)} src={tapSuKien.includes(item.title) ? circleChecked : circle} />
                    <p>{item.title}</p>
                </div>) }
            </div>
            <div className="cascSuKienDaChon">
                { tapSuKien.map((item) => <div className="suKienDaChon">
                    <div className="">
                        <p>{item}</p>
                    </div>
                    <div className="buttonx" onClick={() => chonSuKien(item)}>
                        <img src={x} />
                    </div>
                </div>) }
            </div>
            <button className="button-add">Thêm</button>
        </div>
    )
}

export default ChonTapSuKien;