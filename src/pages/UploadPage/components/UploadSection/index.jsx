import React, {
  useRef, useState, useReducer,
} from 'react';
import { Player } from 'video-react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

// icons
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Film } from '../../../../components/Icon';

// components
import InformationSection from '../InformationSection';
import { formDataRequest } from '../../../../axios';
import PopUp from '../../../../components/PopUp';

// reducer
import reducer, { initialState } from './reducer';
import SubmitButtonLoading from '../../../../components/Button';

function UploadSection() {
  const navigate = useNavigate();
  const [state, uploadDispatch] = useReducer(reducer, initialState);
  const [fileSelected, setFileSelected] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const hiddenFileInput = useRef(null);
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errMsg, setErrMsg] = useState('');

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
      setErrMsg('請選取檔案!');
      return false;
    }
    if (!state.detect) {
      setErrMsg('請選取檢測項目!');
      return false;
    }
    if (!state.location) {
      setErrMsg('請輸入地點!');
      return false;
    }
    if (!state.gender) {
      setErrMsg('請輸入性別!');
      return false;
    }
    if (!state.name) {
      setErrMsg('請輸入受試者姓名!');
      return false;
    }
    if (!state.date) {
      setErrMsg('請輸入日期!');
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
        onUploadProgress: (ProgressEvent) => setUploadProgress(Math.round(
          (ProgressEvent.loaded * 100) / ProgressEvent.total,
        )),
      })
        .then((res) => {
          setSubmitDisabled(false);
          navigate('/history');
        }).catch((err) => {
          setSubmitDisabled(false);
        });
    }
  };

  return (
    <>
      { errMsg
      && (
        <PopUp className="popup-frame-button-only">
          <h3 style={{ color: '#fa5c5c' }}>{errMsg}</h3>
          <div className="pop-up-button-section">
            <button type="button" className="pop-up-button" onClick={() => setErrMsg('')}>好的</button>
          </div>
        </PopUp>
      )}
      { submitDisabled
      && (
        <PopUp className="popup-frame-button-only">
          <h3>上傳中</h3>
          <div>
            <ProgressBar variant="warning" style={{ width: '80%', height: '30px' }} animated label={`${uploadProgress}%`} now={uploadProgress} />
          </div>
          <div style={{ fontFamily: 'system-ui', color: '4f4f4f' }}>請勿離開頁面</div>
        </PopUp>
      )}
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
            accept=".mp4, .avi, .mov"
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
    </>
  );
}

export default UploadSection;
