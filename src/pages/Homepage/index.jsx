import React, { useEffect, useState } from 'react';
import './index.scss';

// component
import Header from '../../components/Header';
import { jsonRequest } from '../../axios';

// constant
import { ListActivityAPI } from '../../constant';

function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    jsonRequest.get(ListActivityAPI)
      .then((res) => setActivities(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      {activities.map((item) => <div>{item.Title}</div>)}
    </div>
  );
}

export default Home;
