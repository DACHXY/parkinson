import './index.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsonRequest } from '../../axios';
import Header from '../../components/Header';

// constant
import { ListActivityAPI } from '../../constant';

function ArticlePage() {
  const { articleId } = useParams();
  const [articleData, setArticleData] = useState([]);
  const articleContent = articleData.find((item) => item.id === articleId);

  useEffect(() => {
    jsonRequest.get(ListActivityAPI)
      .then((res) => { setArticleData(res.data); })
      .catch((err) => console.log(err));
  }, []);

  return (
    articleContent && (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        gap: '10px',
        paddingTop: '200px',
      }}
      >
        <h1 style={{
          textAlign: 'center',
          fontFamily: 'system-ui',
          padding: '4px 20px',
          fontSize: 38,
        }}
        >
          {articleContent.Title}
        </h1>
        <section style={{
          display: 'flex',
          padding: '20px 45ch',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        >
          <img
            style={{ borderRadius: '14px', height: '800px', objectFit: 'contain' }}
            src={articleContent.Image}
            alt=" "
          />
          {
            articleContent.Content && (
              <div style={{ fontFamily: 'system-ui', fontSize: 26, padding: '16px 20px' }}>
                {articleContent.Content}
              </div>
            )
          }

        </section>
      </div>
    </div>
    )
  );
}

export default ArticlePage;
