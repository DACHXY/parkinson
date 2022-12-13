import React, { useState, useRef } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Filter } from '../../components/Icon';
import PopUp from '../../components/PopUp';

function ResultItem({ item }) {
  return (
    <Link className="result-item" to={`${item.video_id}`}>
      <img className="result-item-thumbnail" src={item.thumbnail} alt="Thumbnail" />
      <div className="result-item-information">
        <div className="result-item-information-left">
          <div className="result-item-date">{item.date}</div>
          <div className="result-item-subject">{item.subject}</div>
        </div>
        <div className="result-item-information-right">
          <div className="result-item-detct">{item.detect}</div>
          <div className="result-item-video_id">{`id: ${item.video_id}`}</div>
        </div>
      </div>
    </Link>
  );
}

function HistoryPage() {
  const filterSelect = useRef();
  const [filterItems, setFilterItems] = useState({
    '受試者': [],
    '日期': [],
    '檢測項目': [],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [popUpState, setPopUpState] = useState(false);

  function handleFilterClick() {
    setPopUpState(true);
  }

  function handleFilterApply() {
    setPopUpState(false);
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
    {
      video_id: '27422aa912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
    {
      video_id: '27422cs912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
    {
      video_id: '27422as912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
    {
      video_id: '27422bs912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
    {
      video_id: '27422ls912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
    {
      video_id: '27422sk912381kjxcls',
      thumbnail: 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
      detect: '尊敬你ㄟ',
      subject: '龍哥',
      date: '2022-10-23',
    },
  ];

  return (
    <div>
      {popUpState
      && (
      <PopUp>
        <div className="filter-selector-title">
          <h3>過濾器</h3>
        </div>
        <div className="filter-selector-content">
          <select style={{ display: 'none' }} ref={filterSelect}>
            {Object.keys(filterItems).map((key) => <option>{key}</option>)}
          </select>
        </div>
        <div className="filter-selector-button">
          <button onClick={handleFilterApply} type="button">Apply Filter</button>
          <button onClick={() => setPopUpState(false)} type="button">cancel</button>
        </div>
      </PopUp>
      )}
      <Header />
      <div className="history-frame">
        <h1 className="history-title">檢測紀錄</h1>
        <div className="history-filter-section">
          <button onClick={handleFilterClick} type="button" className="history-filter-button">
            <Filter className="history-filter-icon" />
            過濾器
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
