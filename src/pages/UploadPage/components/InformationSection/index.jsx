import React, { useState, useEffect } from 'react';
import './index.scss';

// components
import OptionalSelection from '../OptionalSelection';
import { InformationInput } from '../InformationInput';
import { ACTION } from '../UploadSection/reducer';

function InformationSection({ reducer }) {
  const [detect, setDetection] = useState([false, false, false, false]);
  const [state, dispatch] = reducer;

  const selections = [
    { text: '手指拍打', key: 0 },
    { text: '手掌握合', key: 1 },
    { text: '前臂迴旋', key: 2 },
    { text: '抬腳', key: 3 },
  ];

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    setDate(state.date);
  }, []);

  useEffect(() => {
    dispatch({
      type: ACTION.setReducer,
      payload: {
        ...state, date, location, name, gender,
      },
    });
  }, [date, location, name, gender]);

  return (
    <div className="information-section">
      <h1>影片資訊</h1>
      <div className="flex-row selection-frame">
        <section className="left-section">
          <h2 style={{ paddingLeft: 10 }}> 基本資料 </h2>
          <li className="basic-information-list">
            <InformationInput text="受試者" type="text" setState={[name, setName]} />
            <InformationInput text="性別" type="text" setState={[gender, setGender]} />
            <InformationInput text="拍攝日期" type="datetime-local" setState={[date, setDate]} />
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
                  reducer={[state, dispatch]}
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
