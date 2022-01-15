import React, { useEffect, useState } from 'react';
import './styles/index.local.css';
import circle from './images/circle.png';
import circleChecked from './images/circleChecked.png';
import x from './images/x.png';
import suKienChecked from './images/suKienChecked.png';

import {
    saveDataType,
    getDataFromLocalStorage,
    setDataFromLocalStorage,
} from './TimKiemDiaDiem';

function ThemTapLuat() {
    const [tabActive, setTabActive] = useState(1);
    const [tinhThanh, setTinhThanh] = useState([]);
    const [thoiGian, setThoiGian] = useState([]);
    const [phuongTien, setPhuongTien] = useState([]);
    const [mua, setMua] = useState([]);
    const [chiPhi, setChiPhi] = useState([]);
    const [soLuongNguoi, setSoLuongNguoi] = useState([]);
    const [diaDiem, setDiaDiem] = useState([]);
    const [loaiHinh, setLoaiHinh] = useState([]);

    const [tapSuKien, setTapSuKien] = useState([]);
    const [tapKetQua, setTapKetQua] = useState([]);
    const [dangChon, setDangChon] = useState(0);
    const [rules, setRules] = React.useState([]);
    const addEvent = React.useRef(null);

    const reset = () => {
        setTabActive(1);
        setTapSuKien([]);
        setTapKetQua([]);
        setDangChon(0);
    };

    React.useEffect(() => {
        const events = getDataFromLocalStorage(saveDataType.EVENTS);
        const rules = getDataFromLocalStorage(saveDataType.RULES);
        const tinhThanhState = events.filter((event) => event.includes('A'));
        const thoiGianState = events.filter((event) => event.includes('B'));
        const phuongTienState = events.filter((event) => event.includes('C'));
        const muaState = events.filter((event) => event.includes('D'));
        const chiPhiState = events.filter((event) => event.includes('E'));
        const soLuongNguoiState = events.filter((event) => event.includes('F'));
        const diaDiemState = events.filter((event) => event.includes('H'));
        const loaiHinhState = events.filter((event) => event.includes('I'));
        setTinhThanh(tinhThanhState);
        setThoiGian(thoiGianState);
        setPhuongTien(phuongTienState);
        setMua(muaState);
        setChiPhi(chiPhiState);
        setSoLuongNguoi(soLuongNguoiState);
        setDiaDiem(diaDiemState);
        setLoaiHinh(loaiHinhState);
        setRules(rules);
    }, []);

    useEffect(() => {
        if (checkDaChonSuKien(tinhThanh)) setTabActive(2);
        if (checkDaChonSuKien(thoiGian)) setTabActive(3);
        if (checkDaChonSuKien(phuongTien)) setTabActive(4);
        if (checkDaChonSuKien(mua)) setTabActive(5);
        if (checkDaChonSuKien(chiPhi)) setTabActive(6);
        if (checkDaChonSuKien(soLuongNguoi)) setTabActive(7);
        if (checkDaChonSuKien(loaiHinh)) setTabActive(0);
    }, [tapSuKien])

    const handleEnter = (e) => {
        // an nut Enter
        if (e.which === 13) {
            const value = addEvent.current.value;
            let templateEvent;
            let events;
            if (dangChon === 1) {
                events = [...diaDiem];
                templateEvent = [...events[events.length - 1]];
                templateEvent[0] = `H${events.length + 1}`;
                templateEvent[2] = value;
                events.push(templateEvent);
                setDiaDiem(events);
                addEvent.current.value = '';
                // Xử lý thêm event vào localStorage
                const eventsOld = getDataFromLocalStorage(saveDataType.EVENTS);
                eventsOld.push(templateEvent);
                setDataFromLocalStorage(saveDataType.EVENTS, eventsOld);
                return;
            }
            switch (tabActive) {
                case 1:
                    events = [...tinhThanh];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `A${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setTinhThanh(events);
                    break;
                case 2:
                    events = [...thoiGian];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `B${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setThoiGian(events);
                    break;
                case 3:
                    events = [...phuongTien];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `C${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setPhuongTien(events);
                    break;
                case 4:
                    events = [...mua];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `D${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setMua(events);
                    break;
                case 5:
                    events = [...chiPhi];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `E${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setChiPhi(events);
                    break;
                case 6:
                    events = [...soLuongNguoi];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `F${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setSoLuongNguoi(events);
                    break;
                case 7:
                    events = [...loaiHinh];
                    templateEvent = [...events[events.length - 1]];
                    templateEvent[0] = `I${events.length + 1}`;
                    templateEvent[2] = value;
                    events.push(templateEvent);
                    setLoaiHinh(events);
                    break;
                default:
                    debugger;
                    break;
            }
            // Xử lý thêm event vào localStorage
            const eventsOld = getDataFromLocalStorage(saveDataType.EVENTS);
            eventsOld.push(templateEvent);
            setDataFromLocalStorage(saveDataType.EVENTS, eventsOld);
            addEvent.current.value = '';
        }
    }

    const checkExist = (event) => {
        return tapSuKien.findIndex((item) => {
            return item[0] === event[0];
        });
    };

    const chonSuKien = (suKien) => {
        if (dangChon === 0) {
            const findIndex = checkExist(suKien);
            if (findIndex === -1) {
                setTapSuKien([...tapSuKien, suKien]);
            } else {
                const newTapSuKien = [...tapSuKien];
                newTapSuKien.splice(findIndex, 1);
                setTapSuKien(newTapSuKien);
            }
        } else if (dangChon === 1) {
            setTapKetQua([suKien]);
        }

    }

    const checkDaChonSuKien = (loaiSuKien) => {
        const checkDaChon = tapSuKien.findIndex((event) => {
            return loaiSuKien && loaiSuKien[0] && event[1] === loaiSuKien[0][1];
        });
        if (checkDaChon === -1) {
            return false;
        } else {
            return true;
        }
    }

    const checkDaChonTapKetQua = (eventChoose) => {
        const checkDaChon = tapKetQua.findIndex((event) => {
            return event[0] === eventChoose[0];
        });
        if (checkDaChon === -1) {
            return false;
        } else {
            return true;
        }
    }

    const chonTabKQ = (save) => {
        if (save && tapKetQua.length > 0 && tapSuKien.length > 0) {
            const left = tapSuKien.map((event) => {
                return event[0];
            })
            const leftString = left.join("^");
            const rightString = tapKetQua[0][0];
            const newRule = [leftString, rightString];
            rules.push(newRule);
            setRules(rules);
            setDataFromLocalStorage(saveDataType.RULES, rules);
            reset();
        }
        if (!tapSuKien.length) {
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
                        {
                            dangChon === 0 && (
                                <React.Fragment>
                                    <div className={!checkDaChonSuKien(tinhThanh) && tabActive === 1 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(tinhThanh) ? () => { setTabActive(1) } : null} >
                                        <h5>Tỉnh thành</h5>
                                        {checkDaChonSuKien(tinhThanh) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(thoiGian) && tabActive === 2 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(thoiGian) ? () => { setTabActive(2) } : null} >
                                        <h5>Thời gian</h5>
                                        {checkDaChonSuKien(thoiGian) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(phuongTien) && tabActive === 3 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(phuongTien) ? () => { setTabActive(3) } : null} >
                                        <h5>Phương tiện</h5>
                                        {checkDaChonSuKien(phuongTien) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(mua) && tabActive === 4 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(mua) ? () => { setTabActive(4) } : null} >
                                        <h5>Mùa</h5>
                                        {checkDaChonSuKien(mua) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(chiPhi) && tabActive === 5 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(chiPhi) ? () => { setTabActive(5) } : null} >
                                        <h5>Chi phí</h5>
                                        {checkDaChonSuKien(chiPhi) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(soLuongNguoi) && tabActive === 6 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(soLuongNguoi) ? () => { setTabActive(6) } : null} >
                                        <h5>Số lượng người</h5>
                                        {checkDaChonSuKien(soLuongNguoi) && <img src={suKienChecked} />}
                                    </div>
                                    <div className={!checkDaChonSuKien(loaiHinh) && tabActive === 7 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(loaiHinh) ? () => { setTabActive(7) } : null} >
                                        <h5>Loại hình</h5>
                                        {checkDaChonSuKien(loaiHinh) && <img src={suKienChecked} />}
                                    </div>
                                </React.Fragment>
                            )
                        }
                        {dangChon === 1 && <div className={!checkDaChonSuKien(diaDiem) && tabActive === 8 ? "tab active-tab" : "tab"} onClick={!checkDaChonSuKien(diaDiem) ? () => { setTabActive(8) } : null} >
                            <h5>Địa điểm</h5>
                            {checkDaChonSuKien(diaDiem) && <img src={suKienChecked} />}
                        </div>}
                    </div>
                    <div className="timKiemSuKien">
                        <input type="text" placeholder="Thêm sự kiện" ref={addEvent} onKeyDown={handleEnter} />
                    </div>
                    <div className="sukienlist row">
                        {
                            dangChon === 0 && (
                                <React.Fragment>
                                    {tabActive === 1 && tinhThanh.map((item) => {
                                        return (<div className="col-6 option">
                                            <img onClick={() => chonSuKien(item)} src={circle} />
                                            <p>{item[2]}</p>
                                        </div>)
                                    })}
                                    {tabActive === 2 && thoiGian.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                    {tabActive === 3 && phuongTien.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                    {tabActive === 4 && mua.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                    {tabActive === 5 && chiPhi.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                    {tabActive === 6 && soLuongNguoi.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                    {tabActive === 7 && loaiHinh.map((item) => <div className="col-6 option">
                                        <img onClick={() => chonSuKien(item)} src={circle} />
                                        <p>{item[2]}</p>
                                    </div>)}
                                </React.Fragment>
                            )
                        }
                        {dangChon === 1 && diaDiem.map((item) => {
                            return (<div className="col-6 option">
                                <img onClick={() => chonSuKien(item)} src={checkDaChonTapKetQua(item) ? circleChecked : circle} />
                                <p>{item[2]}</p>
                            </div>)
                        })}
                    </div>
                    <div className="cascSuKienDaChon">
                        {dangChon === 0 && tapSuKien.map((item) => <div className="suKienDaChon">
                            <div className="">
                                <p>{item[2]}</p>
                            </div>
                            <div className="buttonx" onClick={() => chonSuKien(item)}>
                                <img src={x} />
                            </div>
                        </div>)}
                        {dangChon === 1 && tapKetQua.map((item) => <div className="suKienDaChon">
                            <div className="">
                                <p>{item[2]}</p>
                            </div>
                        </div>)}
                    </div>
                    <button className="button-add" onClick={() => chonTabKQ(dangChon === 1 ? true : false)}>{dangChon === 1 ? "Lưu" : "Thêm"}</button>
                </div>
                {dangChon === 1 && <div className="showTapLuat">
                    <h5>
                        {
                            tapSuKien.map((event, index) => {
                                return (
                                    <React.Fragment>
                                        {`${event[2]} ${tapSuKien.length - 1 === index ? " => " : "+"}`}
                                    </React.Fragment>
                                );
                            })
                        }
                        {
                            tapKetQua[0] && tapKetQua[0][2]
                        }
                    </h5>
                </div>}
            </div>
        </div>
    )
}

export default ThemTapLuat;