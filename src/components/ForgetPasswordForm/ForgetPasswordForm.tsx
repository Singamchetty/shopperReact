import React, { useState } from 'react';
 
 
const ForgetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Passwords match, proceed with submissio
      console.log('Password:', password);
    } else {
      // Passwords don't match, show error message
      setErrorMessage('Passwords do not match');
    }
  };
 
  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
 
export default ForgetPasswordForm;