import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // För att hantera felmeddelanden

  const handleSubmit = async (e) => {
    e.preventDefault();  // Förhindrar att sidan laddas om

    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.token) {
        // Om inloggningen lyckas och en token returneras
        localStorage.setItem('authToken', data.token);  // Spara token i localStorage

        alert('Login successful!');
        // Här kan du navigera till en annan sida om du vill
      } else {
        setErrorMessage('Login failed: ' + data.message);  // Visa felmeddelande om login misslyckas
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label><br /><br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label><br /><br />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Visa felmeddelanden om det finns något */}

      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default LoginPage;


