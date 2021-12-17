import React, {useState} from 'react';
import { Button } from 'reactstrap';
import {DropdownItem, Input, InputGroup, Dropdown, DropdownToggle, DropdownMenu, FormGroup, Label } from 'reactstrap';
import "./App.css";
import Select from 'react-select';

// Component
import ChonTapSuKien from './components/ChonTapSuKien';

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const arrEventOption = [
    {
      id: 1,
      name: 'Tỉnh thành du lịch',
    },
    {
      id: 2,
      name: 'Thời gian du lịch',
    },
    {
      id: 3,
      name: 'Phương tiện du lịch',
    },
    {
      id: 4,
      name: 'Mùa du lịch',
    },
    {
      id: 5,
      name: 'Chi phí du lịch',
    },
    {
      id: 6,
      name: 'Số lượng người du lịch',
    },
    {
      id: 7,
      name: 'Các đặc điểm địa danh du lịch',
    },
  ];

  const [eventOption, setEventOption] = useState(arrEventOption);
  const [typeOption, setTypeOption] = useState('');

  const place = [
    { id: 'A1', label: 'A1: Hà Nội' },
    { id: 'A2', label: 'A2: Hà Giang' },
    { id: 'A3', label: 'A3: Yên Bái' }
  ]

  const time = [
    { id: 'B1', label: 'B1: Đi 1 ngày' },
    { id: 'B2', label: 'B2: Đi nhiều ngày' },
  ]

  const phuongTien = [
    { id: 'C1', label: 'C1: Xe máy' },
    { id: 'C2', label: 'C2: Xe khách' },
    { id: 'C3', label: 'C3 Tàu thủy' },
  ]

  const seasons = [
    { id: 'D1', label: 'D1: Mùa Xuân' },
    { id: 'D2', label: 'D2: Mùa Hạ' },
    { id: 'D3', label: 'D3: Mùa Thu' },
    { id: 'D4', label: 'D4: Mùa Đông' },
  ]

  const cost = [
    { id: 'E1', label: 'E1: Giá dưới 1 triệu đồng' },
    { id: 'E2', label: 'E2: Giá từ 1 - 3 triệu đồng' },
    { id: 'E3', label: 'E3: Già từ 3 - 5 triệu đồng' },
    { id: 'E4', label: 'E4: Già từ 5 - 10 triệu đồng' },
  ]

  const total = [
    { id: 'F1', label: 'F1: 1 - 2 người' },
    { id: 'F2', label: 'F2: 3 - 5 người' },
    { id: 'F3', label: 'F3: 6 - 10 người' },
    { id: 'F4', label: 'F4:Trên 10 người' },
  ]

  const detailsPlace = [
    { id: 'G1', label: 'G1: Vùng núi' },
    { id: 'G2', label: 'G2: Vùng biển' },
    { id: 'G3', label: 'G3: Sông nước' },
    { id: 'G4', label: 'G4: Khu di tích' },
  ]

  const [list, setList] = useState(place) 

  const changeTypeOption = (nameTypeOption, idTypeOption) => {
    setTypeOption(nameTypeOption);
    switch (idTypeOption) {
      case 1:
        setList(place);
        break;
      case 2:
        setList(time);
        break;
      case 3: 
        setList(phuongTien);
        break;
      case 4: 
        setList(seasons);
        break;
      case 5: 
        setList(cost);
        break;
      case 6: 
        setList(total);
        break;
      case 7: 
        setList(detailsPlace);
        break;
      default:
        break;
    }
  }

  return (
    <div className="main">
      <div className="header">
        <InputGroup>
          <Dropdown isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)}>
            <DropdownToggle caret>
             {typeOption}
            </DropdownToggle>
            <DropdownMenu>
              {eventOption.map(item => (
                <div><DropdownItem onClick={() => changeTypeOption(item.name, item.id)}>{item.name}</DropdownItem></div>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Select
            placeholder={`Chọn sự kiện... ${typeOption}`}
            className="selectOption"
            options={list}
          />
          <Button>
            CHỌN SỰ KIỆN
          </Button>
        </InputGroup>
      </div>
      <ChonTapSuKien />
    </div>
    
  );
}

export default App;
