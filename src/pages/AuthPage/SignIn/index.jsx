import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import Header from '../../../components/Header';
import AuthInputBar from '../components/inputbar';

function SignInPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(account, password);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="panel">
          <h1 style={{ color: '#3f3f3f' }}>登入帳號</h1>
          <section className="auth-information-section">
            <Link className="alternative-link" to="/signup">還沒有帳號?</Link>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
          </section>
          <button className="submit-button" type="submit" onClick={handleSubmit}>登入</button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
