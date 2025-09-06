import React from 'react';
     import { Link } from 'react-router-dom';
     import './CreateAccount.css';

     const CreateAccount = () => {
       const handleGoogleSignIn = () => {
         // Placeholder for Google Sign-In logic (to be implemented with your friend)
         console.log('Google Sign-In clicked');
       };

       return (
         <div className="create-account">
           <h2>Create Account</h2>
           <form>
             <input type="email" placeholder="Email" required />
             <input type="password" placeholder="Password" required />
             <button type="submit">Create Account</button>
           </form>
           <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
           <p>Already have an account? <Link to="/login">Login</Link></p>
         </div>
       );
     };

     export default CreateAccount;