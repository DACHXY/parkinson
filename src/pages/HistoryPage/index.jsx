import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Filter } from '../../components/Icon';

function ResultItem({ item, status }) {
  return (
    <Link className={`result-item ${status}`} to={`${item.video_id}`}>
      <img className="result-item-thumbnail" src={item.thumbnail} alt="Thumbnail" />
      <div className="result-item-information">
        <div className="result-item-information-left">
          <div className="result-item-date">{item.date}</div>
          <div className="result-item-subject">{item.subject}</div>
        </div>
        <div className="result-item-information-right">
          <div className="result-item-detct">{item.detect}</div>
          <div className="result-item-video_id">{`serial: ${item.video_id}`}</div>
        </div>
      </div>
    </Link>
  );
}

function HistoryPage() {
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const [filterItems, setFilterItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  function onFilterClick() {

  }

  const resultList = [
    {
      video_id: '19ij1nsa981kjxclf08',
      thumbnail: 'https://i.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
      detect: '手部震動',
      subject: 'Onando',
      date: '2022-10-22',
    },
    {
      video_id: '27422ss912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
  ];

  return (
    <div>
      <Header />
      <div className="history-frame">
        <h1 className="history-title">檢測紀錄</h1>
        <div className="history-filter-section">
          <button type="button" className="history-filter-button">
            <Filter className="history-filter-icon" />
            過濾
            <input type="text" className="history-filter-input" />
          </button>
          <div className="history-filter-items" />
        </div>
        <div className="history-item-list-container">
          {resultList.filter((item) => !searchParams.get('detect') || item.detect === searchParams.get('detect')).map((item) => (
            <ResultItem
              key={item.video_id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
