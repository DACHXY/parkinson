import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { formDataRequest } from '../../axios';

function HistoryPage() {
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const onClickFunction = () => {
    const formData = new FormData();
    const updateData = {
      video_id: '63933c903e6c23a557b5cf6f',
      name: '大又池九',
      date: '2022-12-09 02:22',
      location: '我的家',
      gender: '女',
      detect: '手',
    };
    formData.append('information', JSON.stringify(updateData));
    formDataRequest.put('subject/update/video', formData, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then((res) => console.log(res));
  };

  return (
    <div>
      HistoryPage
      <button type="button" onClick={onClickFunction}>bruh</button>
    </div>
  );
}

export default HistoryPage;
