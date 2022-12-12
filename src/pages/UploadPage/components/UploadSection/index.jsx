import React, { useRef, useState, useReducer } from 'react';
import { Player } from 'video-react';
import './index.scss';

// icons
import { useSelector } from 'react-redux';
import { Film } from '../../../../components/Icon';

// components
import InformationSection from '../InformationSection';
import { formDataRequest } from '../../../../axios';
// reducer
import reducer, { initialState } from './reducer';
import SubmitButtonLoading from '../../../../components/Button';

function UploadSection() {
  const [state, uploadDispatch] = useReducer(reducer, initialState);
  const [fileSelected, setFileSelected] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const hiddenFileInput = useRef(null);
  const sessionToken = useSelector((store) => store.auth.sessionToken);

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

  const submitGate = () => {
    if (!fileSelected) {
      return false;
    }
    if (!state.detect) {
      return false;
    }
    if (!state.location) {
      return false;
    }
    if (!state.gender) {
      return false;
    }
    if (!state.name) {
      return false;
    }
    if (!state.date) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (submitGate()) {
      setSubmitDisabled(true);
      const information = {
        name: state.name,
        gender: state.gender,
        detect: state.detect,
        date: state.date,
        location: state.location,
      };
      const formData = new FormData();
      formData.append('file', fileSelected);
      formData.append('information', JSON.stringify(information));
      formDataRequest.post('/video/uploadFile/fake', formData, {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      })
        .then((res) => {
          setSubmitDisabled(false);
        }).catch((err) => {
          setSubmitDisabled(false);
        });
    }
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
          accept=".mp4, .avi"
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
        <InformationSection reducer={[state, uploadDispatch]} />
        <SubmitButtonLoading
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          送出資料
        </SubmitButtonLoading>
      </div>
    </div>
  );
}

export default UploadSection;
