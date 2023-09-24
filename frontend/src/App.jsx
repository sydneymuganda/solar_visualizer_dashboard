import { useState } from 'react'
import Navbar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react';
import {ThemeContext} from './components/contexts/context.js';



function App() {
    const [menuStatus, setMenuStatus] = useState(true);
    const [theme,setTheme]=useState("dark");
    const [Season,setSeason]=useState('default');
    const toggleTheme=() => {
        setTheme((curr)=> (curr==="light"? "dark" : "light"));
    };
    return (
        <main>
            <ThemeContext.Provider value={{theme,toggleTheme,setSeason,Season}}>
            <Navbar setMenuStatus={() => setMenuStatus(!menuStatus)}/>
            <div className='main' id={theme}>
                <Sidebar menuStatus={menuStatus} setMenuStatus={() => setMenuStatus(!menuStatus)}/>
                <div className={`relative transition-all ${menuStatus ? " md:w-[calc(100%-80px)] md:left-20 w-full " : "md:w-[calc(100%-256px)] md:left-64 w-full"}  top-16 bg-[#f1f1f1] min-h-[calc(100vh-64px)]`}>
                    <Outlet />
                </div>
            </div>
            </ThemeContext.Provider>
        </main>
    );
};

export default App;