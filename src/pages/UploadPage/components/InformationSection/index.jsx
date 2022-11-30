import React, { useState } from 'react';
import './index.scss';

// components
import OptionalSelection from '../OptionalSelection';
import { InformationInput } from '../InformationInput';

function InformationSection() {
  const [detect, setDetection] = useState([false, false, false, false]);

  const selections = [
    { text: '手指拍打', key: 0 },
    { text: '手掌握合', key: 1 },
    { text: '前臂迴旋', key: 2 },
    { text: '抬腳', key: 3 },
  ];

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="information-section">
      <h1>影片資訊</h1>
      <div className="flex-row selection-frame">
        <section className="left-section">
          <h2 style={{ paddingLeft: 10 }}> 基本資料 </h2>
          <li className="basic-information-list">
            <InformationInput text="拍攝日期" type="date" setState={[date, setDate]} />
            <InformationInput text="地點" type="text" setState={[location, setLocation]} />
          </li>
        </section>
        <section className="right-section">
          <section>
            <h2 style={{ paddingLeft: 10 }}>檢測項目</h2>
            <li className="optional-selection-list">
              {selections.map((item) => (
                <OptionalSelection
                  text={item.text}
                  key={item.key}
                  setState={[detect, setDetection]}
                  index={item.key}
                />
              ))}
            </li>
          </section>
        </section>
      </div>
    </div>
  );
}

export default InformationSection;
