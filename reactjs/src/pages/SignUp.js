import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



import '../App.css';

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await authService.signup(email, password).then(
        response => {
          navigate('/dashboard')
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
     <h1> SignUp Screen </h1>
      <Link to="/dashboard">Dashboard</Link>

      <section>
        <form onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            />
            <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <button type='submit'>Sign up</button>
          </form>
      </section>
      </header>
    </div>
  );
}

export default SignUp;
