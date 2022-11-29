// 前臂迴旋
//

import React from 'react';

// component
import Header from '../../components/Header';
import UploadSection from './components';

function UploadPage() {
  return (
    <div>
      <Header />
      <div className="upload-container">
        <UploadSection />
      </div>
    </div>
  );
}

export default UploadPage;
