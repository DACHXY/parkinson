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
      .then((res) => { setActivities(res.data); console.log(res.data); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <HeroSlider
        height={800}
        className="heroSlider-home"
        autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 500,
          slidingDelay: 100,
          onSliding: (nextSlide) => console.debug('onSliding(nextSlide): ', nextSlide),
          onBeforeSliding: (previousSlide, nextSlide) => console.debug(
            'onBeforeSliding(previousSlide, nextSlide): ',
            previousSlide,
            nextSlide,
          ),
          onAfterSliding: (nextSlide) => console.debug('onAfterSliding(nextSlide): ', nextSlide),
        }}
      >

        {activities.length > 0
          && activities.filter((item) => item.Image !== null)
            .map(((item) => (
              <Link to={`/article/${item.id}`}>
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
