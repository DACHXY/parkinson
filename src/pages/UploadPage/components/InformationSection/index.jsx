import React from 'react';
import './index.scss';

// components
import OptionalSelection from '../OptionalSelection';

function InformationSection() {
  const selections = [
    { text: '手指拍打', key: 0 },
    { text: '手掌握合', key: 1 },
    { text: '前臂迴旋', key: 2 },
    { text: '抬腳', key: 3 },
  ];
  return (
    <div className="information-section">
      <h1>Information Section</h1>
      <div className="flex-row">
        <section className="left-section">
          <li />
        </section>
        <section className="right-section">
          <section>
            <h2 style={{ paddingLeft: 10 }}>檢測項目</h2>
            <li className="optional-selection-list">
              {selections.map((item) => <OptionalSelection text={item.text} key={item.key} />)}
            </li>
          </section>
        </section>
      </div>
    </div>
  );
}

export default InformationSection;
