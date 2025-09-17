import React, { useEffect, useState } from 'react';
import './index.scss';

// component
import HeroSlider, { Slide, SideNav } from 'hero-slider';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { jsonRequest } from '../../axios';

// constant
import { ListActivityAPI } from '../../constant';

function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    jsonRequest.get(ListActivityAPI)
      .then((res) => { setActivities(res.data); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />

      <div className="parkinson-tutorial">
        <h2>各項測試請依以下規則拍攝影片</h2>
        <p1>手指拍打 :拇指與食指保持接觸30秒</p1>
        <br />
        <p1>手掌握和 : 從張開到握和30秒</p1>
        <br />
        <p1>抬腳 :相互抬左腳和右腳30秒</p1>
        <br />
        <h3>影片拍攝結束請點選上方檢測頁面上傳影片測試</h3>
      </div>

      <HeroSlider
        height="75vh"
        className="heroSlider-home"
        autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 500,
          slidingDelay: 100,
          // onSliding: (nextSlide) => console.debug('onSliding(nextSlide): ', nextSlide),
          // onBeforeSliding: (previousSlide, nextSlide) => console.debug(
          //   'onBeforeSliding(previousSlide, nextSlide): ',
          //   previousSlide,
          //   nextSlide,
          // ),
          // onAfterSliding: (nextSlide) => console.debug('onAfterSliding(nextSlide): ', nextSlide),
        }}
      >

        {activities.length > 0
          && activities.filter((item) => item.Image !== null)
            .map(((item) => (
              <Link key={item.id} to={`/article/${item.id}`}>
                <Slide
                  key={item.id}
                  background={{
                    backgroundImageSrc: item.Image,
                    backrgoundAttachment: 'fixed',
                  }}
                >
                  <div className="slide-title">{item.Title}</div>
                </Slide>
              </Link>
            )
            ))}
      </HeroSlider>
    </div>
  );
}

export default Home;
