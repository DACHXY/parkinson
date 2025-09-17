import React, { useState } from 'react';
import './index.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import { jsonRequest, formDataRequest } from '../../../axios';
import { URLgenerate } from '../../../constant';
import { TitleInputbar } from '../../../components/Input';
import SubmitButtonLoading from '../../../components/Button';
import PopUp from '../../../components/PopUp';

function HistoryItemPage() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const videoInfo = useSelector((store) => store.videoInfo.videoList
    .find((item) => item.video_id === videoId));
  const [date, setDate] = useState(videoInfo.date);
  const [subject, setSubject] = useState(videoInfo.subject);
  const [gender, setGender] = useState(videoInfo.gender);
  const [location, setLocation] = useState(videoInfo.location);
  const [ifDelete, setIfDelete] = useState(false);
  const [modifySubmit, setModifySubmit] = useState(false);
  const [succeedPopup, setSucceedPopup] = useState(false);

  const handleDelete = () => {
    setIfDelete(true);
    jsonRequest.delete(`subject/delete/video?video_id=${videoId}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then((res) => {
        setIfDelete(true);
        navigate('/history');
      });
  };

  const handleChangeInfo = () => {
    setModifySubmit(true);
    const formData = new FormData();
    const information = {
      video_id: videoId,
      gender,
      subject,
      date,
      location,
    };
    formData.append('information', JSON.stringify(information));
    formDataRequest.put('subject/update/video', formData, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then((res) => {
        setModifySubmit(false);
        if (res.status === 200) {
          setSucceedPopup(true);
        }
      });
  };

  return (
    <div>
      {succeedPopup && (
        <PopUp className="popup-frame-button-only">
          <h1>修改成功!</h1>
          <div className="pop-up-button-section">
            <button type="button" onClick={() => setSucceedPopup(false)} className="pop-up-button">好的</button>
          </div>
        </PopUp>
      )}
      <Header />
      <div className="flex-col" style={{ gap: 40 }}>
        <div className="result-frame">
          <div className="flex-col" style={{ gap: 20 }}>
            <img className="result-thumbnail" src={URLgenerate(videoInfo.thumbnail_url)} alt="Thumbnail" />
            <section className="result-information-left">
              <div className="result-detect">{videoInfo.detect}</div>
              <div className="result-item-video_id">{`id: ${videoInfo.video_id}`}</div>
            </section>
          </div>
          <section className="result-information">
            <section className="result-information-right">
              <TitleInputbar type="datetime-local" text="日期" setState={[date, setDate]} />
              <TitleInputbar type="text" text="受試人" setState={[subject, setSubject]} />
              <TitleInputbar type="text" text="性別" setState={[gender, setGender]} />
              <TitleInputbar type="text" text="地點" setState={[location, setLocation]} />
            </section>
            <div className="flex-row" style={{ justifyContent: 'center' }}>
              <SubmitButtonLoading disabled={modifySubmit} onClick={handleChangeInfo} type="button" className="update-information-button">修改資料</SubmitButtonLoading>
            </div>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <SubmitButtonLoading disabled={ifDelete} onClick={handleDelete} type="button" className="delete-video-button">刪除紀錄</SubmitButtonLoading>
        </div>
      </div>
    </div>
  );
}

export default HistoryItemPage;
