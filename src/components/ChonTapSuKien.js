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
    const [chiPhi, setChiPhi] = useState([
        { title: 'E1: Giá dưới 1 triệu đồng' },
        { title: 'E2: Giá từ 1 - 3 triệu đồng' },
        { title: 'E3: Già từ 3 - 5 triệu đồng' },
        { title: 'E4: Già từ 5 - 10 triệu đồng' },
    ]);
    const [soLuongNguoi, setSoLuongNguoi] = useState([
        { title: 'F1: 1 - 2 người' },
        { title: 'F2: 3 - 5 người' },
        { title: 'F3: 6 - 10 người' },
        { title: 'F4:Trên 10 người' },
    ]);
    const [diaDiem, setDiaDiem] = useState([
        { title: 'D1: Mùa Xuân' },
        { title: 'D2: Mùa Hạ' },
        { title: 'D3: Mùa Thu' },
        { title: 'D4: Mùa Đông' },
    ]);
    const [tapSuKien, setTapSuKien] = useState([]);
    const [tapKetQua, setTapKetQua] = useState([]);
    const [dangChon, setDangChon] = useState(0);

    useEffect(() => {
        if(checkDaChonSuKien(tinhThanh)) setTabActive(2);
        if(checkDaChonSuKien(thoiGian)) setTabActive(3);
        if(checkDaChonSuKien(phuongTien)) setTabActive(4);
        if(checkDaChonSuKien(mua)) setTabActive(0);
    }, [tapSuKien], [tabActive])

    const chonSuKien = (suKien) => {
        if(dangChon === 0) {
            if(!tapSuKien.includes(suKien)) {
                setTapSuKien([...tapSuKien, suKien]);
            } else {
                let index = tapSuKien.indexOf(suKien);
                tapSuKien.splice(index, 1);
                setTapSuKien([...tapSuKien]);
            }
        } else if (dangChon === 1) {
            if(!tapKetQua.includes(suKien) && !checkDaChonKetQua()) {
                setTapKetQua([...tapKetQua, suKien]);
            } else if(tapKetQua.includes(suKien)){
                let index = tapKetQua.indexOf(suKien);
                tapKetQua.splice(index, 1);
                setTapKetQua([...tapKetQua]);
            }
        }
        
    }

    const checkDaChonSuKien = (loaiSuKien) => {
        for(let i = 0; i < loaiSuKien.length; i++) {
            if (tapSuKien.includes(loaiSuKien[i].title) && dangChon === 0) {
                return true;
            }
        }
        return false;
    }

    const checkDaChonKetQua = () => {
        if (tapKetQua.length) {
            return true;
        }
        return false;
    }

    const chonTabKQ = () => {
        if(!tapSuKien.length) {
            alert("Bạn phải chọn sự kiện!");
        }
        else setDangChon(1);

    }

    return (
        <div className="all col-10">
            <div className="tabchonketqua">
                <div className={dangChon === 0 ? "active" : ""} onClick={() => { setDangChon(0); setTabActive(0); }}>
                    <p>Chọn sự kiện</p>
                </div>
                <div className={dangChon === 1 ? "active" : ""} onClick={chonTabKQ}>
                    <p>Chọn kết quả</p>
                </div>
            </div>
            <div className="chon">
                <div className="chonsukien">
                    <div className="sukientab">
                        <div className={!checkDaChonSuKien(tinhThanh) && tabActive === 1 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(tinhThanh) ? () => { setTabActive(1) } : null} >
                            <h5>Tỉnh thành</h5>
                            { checkDaChonSuKien(tinhThanh) && <img src={suKienChecked} /> }    
                        </div>
                        <div className={!checkDaChonSuKien(thoiGian) && tabActive === 2 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(thoiGian) ? () => { setTabActive(2) } : null} >
                            <h5>Thời gian</h5>
                            { checkDaChonSuKien(thoiGian) && <img src={suKienChecked} /> }    
                        </div>
                        <div className={!checkDaChonSuKien(phuongTien) && tabActive === 3 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(phuongTien) ? () => { setTabActive(3) } : null} >
                            <h5>Phương tiện</h5>
                            { checkDaChonSuKien(phuongTien) && <img src={suKienChecked} /> }    
                        </div>
                        <div className={!checkDaChonSuKien(mua) && tabActive === 4 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(mua) ? () => { setTabActive(4) } : null} >
                            <h5>Mùa</h5>
                            { checkDaChonSuKien(mua) && <img src={suKienChecked} /> }    
                        </div>
                        <div className={!checkDaChonSuKien(mua) && tabActive === 5 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(mua) ? () => { setTabActive(5) } : null} >
                            <h5>Chi phí</h5>
                            { checkDaChonSuKien(chiPhi) && <img src={suKienChecked} /> }    
                        </div>
                        <div className={!checkDaChonSuKien(mua) && tabActive === 6 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(mua) ? () => { setTabActive(6) } : null} >
                            <h5>Số lượng người</h5>
                            { checkDaChonSuKien(soLuongNguoi) && <img src={suKienChecked} /> }    
                        </div>
                        {dangChon === 1 && <div className={!checkDaChonSuKien(mua) && tabActive === 7 ? "tab active-tab":"tab"} onClick={!checkDaChonSuKien(mua) ? () => { setTabActive(7) } : null} >
                            <h5>Địa điểm</h5>
                            { checkDaChonSuKien(diaDiem) && <img src={suKienChecked} /> }    
                        </div>}
                    </div>
                    <div className="timKiemSuKien">
                        <input type="text" placeholder="Nhập sự kiện" />
                    </div>
                    <div className="sukienlist row">
                        { tabActive === 1 && tinhThanh.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 2 && thoiGian.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 3 && phuongTien.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 4 && mua.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 5 && chiPhi.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 6 && soLuongNguoi.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                        { tabActive === 7 && diaDiem.map((item) => <div className="col-6 option">
                            <img onClick={() => chonSuKien(item.title)} src={(dangChon === 1 && tapKetQua.includes(item.title)) || (dangChon === 0 && tapSuKien.includes(item.title)) ? circleChecked : circle} />
                            <p>{item.title}</p>
                        </div>) }
                    </div>
                    <div className="cascSuKienDaChon">
                        { dangChon === 0 && tapSuKien.map((item) => <div className="suKienDaChon">
                            <div className="">
                                <p>{item}</p>
                            </div>
                            <div className="buttonx" onClick={() => chonSuKien(item)}>
                                <img src={x} />
                            </div>
                        </div>) }
                        { dangChon === 1 && tapKetQua.map((item) => <div className="suKienDaChon">
                            <div className="">
                                <p>{item}</p>
                            </div>
                            <div className="buttonx" onClick={() => chonSuKien(item)}>
                                <img src={x} />
                            </div>
                        </div>) }
                    </div>
                    <button className="button-add" onClick={chonTabKQ}>{dangChon === 1 ? "Lưu" : "Thêm"}</button>
                </div>
                { dangChon === 1 && <div className="showTapLuat">
                    <h5>{tapSuKien.join(" + ") + " => " + tapKetQua.join(" + ")}</h5>
                </div> }
            </div>
        </div>
    )
}

export default ChonTapSuKien;