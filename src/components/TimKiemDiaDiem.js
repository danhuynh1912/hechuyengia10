import React from 'react';
import readXlsxFile from 'read-excel-file';
import file from './asstes/tinhthanh.xlsx';

const initRules = [
    {
        id: 1,
        left: ["a", "b"],
        right: "h1",
    },
    {
        id: 2,
        left: ["a"],
        right: "h2",
    },
    {
        id: 3,
        left: ["b", "c"],
        right: "h3",
    },
    {
        id: 4,
        left: ["a", "h3"],
        right: "h4",
    },
    {
        id: 5,
        left: ["c", "d"],
        right: "h5",
    },
    {
        id: 6,
        left: ["d"],
        right: "h6",
    },
    {
        id: 7,
        left: ["h1", "h2"],
        right: "h7",
    },
    {
        id: 8,
        left: ["c"],
        right: "h1",
    },
];

const initGt = ["a", "b", "c"];
const EVENT = {
    PROPERTY: 0,
    KEY: 1,
    VALUE: 2,
    TYPE: 3,
};

function TimKiemDiaDiem() {
    const [rules, setRules] = React.useState(initRules);
    const [events, setEvents] = React.useState({});
    const [hypothesis, setHypothesis] = React.useState([]);
    const [resultFilter, setResultFilter] = React.useState([]);

    // React.useEffect(() => {
    //     debugger;
    //     readXlsxFile(file).then((rows) => {
    //         debugger;
    //     });
    //     debugger;
    // });

    const rulesRefactorData = (rows) => {
        let index = -1;
        const newRules = rows.map((rule) => {
            index++;
            return {
                id: index,
                left: rule[0].includes("^") ?
                    rule[0].split("^") // mặc định sử dụng "^" để phần tách luật vế trái lưu ở ex
                    : [rule[0]],
                right: rule[1]
            };
        });
        setRules(newRules);
    };

    const eventsRefactorData = (rows) => {
        const newEvents = {};
        rows.forEach((event) => {
            if (!newEvents[`${event[EVENT.KEY]}_${event[EVENT.TYPE]}`]) {
                newEvents[`${event[EVENT.KEY]}_${event[EVENT.TYPE]}`] = [];
            }
            newEvents[`${event[EVENT.KEY]}_${event[EVENT.TYPE]}`].push(event);
        });
        setEvents(newEvents);
    }

    const onLoadRules = (e) => {
        readXlsxFile(e.target.files[0]).then((rows) => {
            rulesRefactorData(rows);
        });
    }

    const onLoadEvents = (e) => {
        readXlsxFile(e.target.files[0]).then((rows) => {
            eventsRefactorData(rows);
        });
    }

    const onChangeSelectEvent = (e) => {
        const { value, name } = e.target;
        const index = hypothesis.findIndex((event) => event.includes(name));
        if (index === -1) {
            hypothesis.push(value);
        } else {
            hypothesis[index] = value;
        }
        setHypothesis(hypothesis);
    }

    function filterRules(rules, gt) {
        const lst = [];
        // GT={a,b}
        // r1={a,b,c->k) - không lấy luật này
        // r2={a->k) - Lấy luật này
        // r3={b->k) - Lấy luật này
        // r4={a,b->k) - Lấy luật này
        rules.forEach((r) => {
            if (r.left.length <= gt.length) {
                let count = 0;
                r.left.forEach((item) => {
                    if (gt.includes(item)) {
                        count++;
                    }
                });
                if (r.left.length === count) {
                    lst.push(r);
                }
            }
        });
        return lst;
    }


    function suyDienTien(rules, gt, kl) {
        // Lấy giả thiết lưu vào tập đích
        const td = [...gt];
        // Lấy danh sách tập luật thỏa mãn
        let newRules = filterRules(rules, td);
        const vet = {};
        let i = 1;

        // Lặp cho đến khi đã duyệt qua hết các tập luật thỏa mãn
        while (newRules.length > 0) {
            newRules.forEach((r) => {
                if (td.indexOf(r.right) === -1) {
                    td.push(r.right);
                }
                rules = rules.filter((item) => r.id !== item.id);
                if (!vet[i]) {
                    vet[i] = [];
                }
                vet[i].push(r);
            });
            newRules = filterRules(rules, td);
            i++;
        }
        return vet;
    }

    const handleFilter = () => {
        const result = suyDienTien(rules, hypothesis);
        setResultFilter(result);
    }

    return (
        <div className="col-10">
            <p>load tập luật luật</p>
            <input type="file" onChange={onLoadRules} />
            <p>load sự kiện</p>
            <input type="file" onChange={onLoadEvents} />
            <div className='main-content'>
                <h1 style={{ fontSize: 30, marginBottom: 40 }}>Tìm kiếm địa điểm</h1>
                <div className='box-select-event'>
                    <p style={{ margin: 0 }}>Chọn điều kiện lọc:</p>
                    <div
                        className='select-event'
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        {
                            Object.keys(events).map((eventKey) => {
                                if (eventKey.includes("H")) {
                                    return null;
                                }
                                return (
                                    <select
                                        key={eventKey}
                                        name={eventKey.split("_")[0]} // lấy EVENT.KEY - ko lấy EVENT_TYPE
                                        style={{ padding: 8, margin: "10px 10px 10px 0" }}
                                        onChange={onChangeSelectEvent}
                                    >
                                        <option value={""}>Chọn {eventKey.split("_")[1]}</option>
                                        {
                                            events[eventKey] && events[eventKey].map((event) => {
                                                return (
                                                    <option key={event[EVENT.PROPERTY]} value={event[EVENT.PROPERTY]}>{event[EVENT.VALUE]}</option>
                                                );
                                            })
                                        }
                                    </select>
                                );
                            })
                        }
                    </div>
                    <button onClick={handleFilter} style={{ padding: "5px 18px", border: "1px solid", backgroundColor: "#4a92ff" }}>Lọc kết quả</button>
                </div>
                {
                    Object.keys(resultFilter).length > 0 && (
                        <div className='result' style={{ marginTop: 30 }}>
                            <p>
                                {`Kết quả tìm kiếm: `}
                                {
                                    hypothesis.map((event, index) => {
                                        return (
                                            <React.Fragment key={event}>
                                                {`${event} ${hypothesis.lenght - 1 !== index ? "^ " : ""}`}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </p>
                            {
                                Object.keys(resultFilter).map((browsing) => {
                                    return (
                                        <div style={{ marginBottom: 30 }}>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>Lần duyệt thứ {browsing}, các tập luật thỏa:</p>
                                            <div>
                                                {
                                                    resultFilter[browsing].map((rule) => {
                                                        const lengthHypo = rule.left.length;
                                                        let index = 0;
                                                        return (
                                                            <div style={{ padding: "10px 40px", borderBottom: "1px solid #dee2e6", backgroundColor: "#d4edda" }}>
                                                                <p style={{ margin: 0 }}>
                                                                    {
                                                                        `R${rule.id}: `
                                                                    }
                                                                    {
                                                                        rule.left.map((event) => {
                                                                            index++;
                                                                            return (
                                                                                <React.Fragment key={event}>
                                                                                    {`${event} ${lengthHypo !== index ? "^ " : ""}`}
                                                                                </React.Fragment>
                                                                            );
                                                                        })
                                                                    }
                                                                    {`=> ${rule.right}`}
                                                                </p>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TimKiemDiaDiem;