import React from 'react';
import './index.scss';

// component
import Header from '../../components/Header';
import UploadSection from './components/UploadSection';

function UploadPage() {
  return (
    <div className="upload-page">
      <Header />
      <div className="upload-container">
        <UploadSection />
      </div>
    </div>
  );
}

export default UploadPage;
