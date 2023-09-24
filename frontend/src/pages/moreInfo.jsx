import React, { useState ,useContext} from 'react';
import useAutoNavigate from "../hooks/useAutoNavigate";
import {ThemeContext} from '../components/contexts/context';

const MoreInfoPage = () => {
  useAutoNavigate('/moreInfo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Season,setSeason]=useState("default");
  
  const authenticate = () => {
    const authorizedEmails = [
      'wanda.majikijela@uct.ac.za',
      'MGNSYD001@myuct.ac.za',
      'MCHCHR009@myuct.ac.za',
      'JHNJUN005@myuct.ac.za',
    ];
    const specialPassword = 'capstone2023';
    
    if (authorizedEmails.includes(email) && password === specialPassword) {
      setIsAuthenticated(true);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">More Info</h1>
      <div className="bg-white p-4 rounded shadow-md mb-6"> 
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <p className="mb-1">Building Manager: Wanda Majikijel</p>
        <p className="mb-4">Email: wanda.majikijela@uct.ac.za</p>
        <h3 className="text-xl font-semibold mb-2">Developers:</h3>
        <p className="mb-1">Sydney Muganda - Email: MGNSYD001@myuct.ac.za</p>
        <p className="mb-1">Junior Johane - Email: JHNJUN00@myuct.ac.za</p>
        <p className="mb-1">Chris Mchardy- Email: MCHCHR009@myuct.ac.za</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <div className="flex">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded mr-2" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded mr-2" />
          <button onClick={authenticate} className="bg-blue-500 text-white p-2 rounded">Login</button>
        </div>
        
        {isAuthenticated && (
          <div className="mt-4">
          <p className="mb-2">Change season?</p>
          <div className="flex">
            <label className="mr-4 flex items-center">
              <input onChange={(e)=>{setSeason(e.target.value)}} type="radio" name="season" value="summer" className="mr-2" />
              Summer
            </label>
            <label className="mr-4 flex items-center">
              <input onChange={(e)=>{setSeason(e.target.value)}} type="radio" name="season" value="winter" className="mr-2" />
              Winter
            </label>
            <label className="flex items-center">
              <input 
              onChange={(e)=>{setSeason(e.target.value)}}
              type="radio" name="season" value="default" className="mr-2" defaultChecked />
              Default
            </label>
          </div>
        </div>
        
        )}
      </div>
      
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} The Hasso Plattner School of Design Thinking Afrika. All rights reserved.</p>
      </div>
    </div>
  );
};

export default MoreInfoPage;
