import React, { useRef, useState } from 'react';
import { Player } from 'video-react';
import './index.scss';

// icons
import axios from 'axios';
import { Film } from '../../../../components/Icon';

// components
import InformationSection from '../InformationSection';

function UploadSection() {
  const [fileSelected, setFileSelected] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const hiddenFileInput = useRef(null);

  const HandleSelectFile = () => {
    hiddenFileInput.current.click();
  };

  const HandleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const previewURLCreated = URL.createObjectURL(fileUploaded);
    setFileSelected(fileUploaded);
    setPreviewURL(previewURLCreated);
    setShowPreview(true);
  };

  const handleSubmit = () => {
    const information = {
      detect: '手指拍打',
      date: '2022/10/16',
      location: '家中',
    };

    const formData = new FormData();
    formData.append('file', fileSelected);
    formData.append('information', JSON.stringify(information));
    axios.post('upload_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <div className="upload-section-background">
      <div className="upload-section-group">
        <button
          className="upload-button"
          type="button"
          onClick={HandleSelectFile}
        >
          <div>
            <Film className="upload-icon" />
          </div>
          <div className="upload-text">點擊上傳影片</div>
        </button>
        {previewURL && (
        <Player
          playsInline
          src={previewURL}
          fluid={false}
          width={500}
          height={300}
          className="upload-preview"
        />
        )}
        <input
          type="file"
          accept=".mp4"
          ref={hiddenFileInput}
          onChange={HandleChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className="lower-upload-section">
        <button
          className="reupload-button submit-button"
          type="button"
          disabled={!showPreview}
          onClick={HandleSelectFile}
        >
          重新選擇檔案
        </button>
        <InformationSection />
        <button type="submit" onClick={handleSubmit} className="submit-button">送出資料</button>
      </div>
    </div>
  );
}

export default UploadSection;
