import './index.scss';
import React, { useState } from 'react';
import { AuthInputBar } from '../../../components/Input';
import { jsonRequest } from '../../../axios';

function ForgotPage() {
  const [email, setEmail] = useState('');

  const submitGate = () => {
    const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (submitGate) {
      jsonRequest.get(`auth/change/password?email=${email}`)
        .then((res) => console.log(res.status));
    }
  };

  return (
    <section>
      <h1>ForgotPage</h1>
      <AuthInputBar text="電子郵件" setState={[email, setEmail]} />
      <button onClick={handleSubmit} type="submit">發送驗證電子郵件</button>
    </section>
  );
}

export default ForgotPage;
