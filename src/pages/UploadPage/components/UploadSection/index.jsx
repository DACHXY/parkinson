import React, { useRef, useState } from 'react';
import { Player } from 'video-react';
import './index.scss';

// icons
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
    console.log(fileSelected);
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
          點擊上傳影片
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
          className="reupload-button"
          type="button"
          disabled={!showPreview}
          onClick={HandleSelectFile}
        >
          重新選擇檔案
        </button>
        <InformationSection />
        <button type="button" className="submit-button">送出資料</button>
      </div>
    </div>
  );
}

export default UploadSection;
