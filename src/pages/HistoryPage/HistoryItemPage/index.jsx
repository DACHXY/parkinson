import React, { useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import { jsonRequest } from '../../../axios';
import { URLgenerate } from '../../../constant';
import { TitleInputbar } from '../../../components/Input';

function HistoryItemPage() {
  const { videoId } = useParams();
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const videoInfo = useSelector((store) => store.videoInfo.videoList
    .find((item) => item.video_id === videoId));

  const [date, setDate] = useState(videoInfo.date);
  const [subject, setSubject] = useState(videoInfo.subject);
  const [gender, setGender] = useState(videoInfo.gender);

  const handleDelete = () => {
    jsonRequest.delete(`subject/delete/video?video_id=${videoId}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <Header />
      <div className="result-frame">
        <button onClick={handleDelete} type="button">Delete Video</button>
        <img className="result-thumbnail" src={URLgenerate(videoInfo.thumbnail_url)} alt="Thumbnail" />
        <section className="result-information">
          <section className="result-information-left">
            <TitleInputbar type="date" text="日期" setState={[date, setDate]} />
            <TitleInputbar type="text" text="受試人" setState={[subject, setSubject]} />
            <TitleInputbar type="text" text="性別" setState={[gender, setGender]} />
          </section>
          <section className="result-information-right">
            <div className="result-detect">{videoInfo.detect}</div>
            <div className="result-video_id">{`id: ${videoInfo.video_id}`}</div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default HistoryItemPage;
