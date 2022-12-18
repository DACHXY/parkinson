import './index.scss';

import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthInputBar } from '../../../components/Input';
import { formDataRequest } from '../../../axios';

function ChangePasswordPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitGate = () => {
    const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleSuccuss = async (res) => {
    if (res.status === 200) {
      navigate('/signin');
    }
  };

  const handleSubmit = () => {
    if (submitGate) {
      const formData = new FormData();
      formData.append('password', password);
      formDataRequest.post(`auth/verify/change?verify_token=${token}&email=${email}`, formData)
        .then(handleSuccuss);
    }
  };

  return (
    <section>
      <h1>ForgotPage</h1>
      <AuthInputBar text="修改密碼" setState={[password, setPassword]} />
      <button onClick={handleSubmit} type="submit">更改密碼</button>
    </section>
  );
}

export default ChangePasswordPage;
