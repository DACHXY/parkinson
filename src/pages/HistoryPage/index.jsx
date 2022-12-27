import React, {
  useState, useRef, useEffect,
} from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import PopUp from '../../components/PopUp';
import { jsonRequest } from '../../axios';
import { URLgenerate } from '../../constant';
import { setVideoList } from '../../stores/videoSlice';

// icon
import { Male, Female, Filter } from '../../components/Icon';
import { useInterval } from '../../hooks/useHook';

function DefineGender(gender) {
  switch (gender) {
    case '男':
      return <Male className="small-icon" />;
    case '女':
      return <Female className="small-icon" />;
    case 'male':
      return <Male className="small-icon" />;
    case 'female':
      return <Female className="small-icon" />;
    case '龍哥':
      return '-respect';
    default:
      return <span>其他</span>;
  }
}

function ResultItem({ item }) {
  return (
    <Link className="result-item" to={`${item.video_id}`}>
      <img className="result-item-thumbnail" src={URLgenerate(item.thumbnail_url)} alt="Thumbnail" />
      <div className="result-item-information">
        <div className="result-item-information-left">
          <div className="result-item-date">{item.date}</div>
          <section className="flex-row" style={{ gap: 10, justifyContent: 'start', alignItems: 'center' }}>
            {DefineGender(item.gender)}
            <div className="result-item-subject">{item.subject}</div>
          </section>
          <div className="result-item-status">{item.left.toString() === '-1' ? '狀態: 處理中' : '狀態: 處理完成'}</div>
          <div className="result-item-location">{`地點: ${item.location}`}</div>
          {
            item.left.toString() !== '-1'
            && (
              <>
                <div className="result-item-result">{`左: ${item.left}`}</div>
                <div className="result-item-result">{`右: ${item.right}`}</div>
              </>
            )
          }

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
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const videoInfo = useSelector((store) => store.videoInfo.videoList);
  const dispatch = useDispatch();
  const filterSelect = useRef();
  const filterInitial = {
    '受試者': [],
    '日期': [],
    '檢測項目': [],
  };

  const [filterItems, setFilterItems] = useState();
  const [popUpState, setPopUpState] = useState(false);

  useInterval(() => {
    jsonRequest.get('/subject/list/video', {
      headers: {
        'authorization': `Bearer ${sessionToken}`,
      },
    }).then((res) => { dispatch(setVideoList(res.data)); });
  }, 5000);

  useEffect(() => {
    jsonRequest.get('/subject/list/video', {
      headers: {
        'authorization': `Bearer ${sessionToken}`,
      },
    }).then((res) => { dispatch(setVideoList(res.data)); });
  }, []);

  function handleFilterClick() {
    setPopUpState(true);
  }

  function handleFilterApply() {
    setPopUpState(false);
  }

  return (
    <div>
      {popUpState
      && (
      <PopUp>
        <div className="filter-selector-title">
          <h3>過濾器</h3>
        </div>
        <div className="filter-selector-content flex-row">
          <select className="filter-selector" ref={filterSelect}>
            {Object.keys(filterItems).map((key) => <option>{key}</option>)}
          </select>
          <input type="text" />
        </div>
        <div className="filter-selector-button">
          <button onClick={handleFilterApply} type="button">Apply Filter</button>
          <button onClick={() => setPopUpState(false)} type="button">cancel</button>
        </div>
      </PopUp>
      )}
      <Header />
      <div className="page-frame">
        <h1 className="page-title">檢測紀錄</h1>
        <div className="history-filter-section">
          <button onClick={handleFilterClick} type="button" className="history-filter-button">
            <Filter className="history-filter-icon" />
            過濾器
          </button>
          <div className="history-filter-items" />
        </div>
        <div className="history-item-list-container">
          {videoInfo.length === 0 ? <span style={{ color: '#4f4f4f', fontFamily: 'system-ui' }}>沒有紀錄</span> : videoInfo.map((item) => (
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
