import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { BarChart4, Cable, Droplet, LayoutDashboard, LineChart,HelpCircleIcon} from "lucide-react";
import Overlay from './Overlay';
import { ThemeContext } from './contexts/context';

// Sidebar -- responsive sidebar, required to handle state changes to collapse and expand,
// needs to handle screen resize and operates as the main navigation for users to explore
// different pages and features
const Sidebar = (props) => {

    // Storing the screen width to state.
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [theme,setTheme]=useState("dark");
    const [Season,setSeason]=useState('default');
    const toggleTheme=() => {
        setTheme((curr)=> (curr==="light"? "dark" : "light"));
    };

    // Capture the screen width when user resizes screen.
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <>
        
        <ThemeContext.Provider value={{theme,toggleTheme,setSeason,Season}}>
        <aside className={` overflow-hidden z-20 fixed top-16 h-[calc(100vh-64px)] transition-all bg-white border-r md:flex ${props.menuStatus ? " w-64 flex md:w-auto " : " w-0 md:w-auto"}`}>
            <nav className={` z-20 transition-all ${props.menuStatus ? " md:w-20 w-1/2 md:flex sm:flex" : " md:w-64 md:flex "} `}>
               <div className='flex flex-col p-6 gap-5 '>
                    <CustomLink link='/' icon={<LayoutDashboard color='red'/>} menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Overview'}/>
                    <CustomLink link='energy' icon={<Cable color='rgb(113 175 181)' />} menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Energy'}/>
                    <CustomLink link='water' icon={<Droplet color='red'  />} menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Water'}/>
                    <CustomLink link='historic-energy' icon={<BarChart4   color='rgb(113 175 181)' />} menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Historic Energy'}/>
                    <CustomLink link='historic-water' icon={<LineChart  color='red'/> } menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Historic Water'}/>
                    <CustomLink link='more-Info' icon={<HelpCircleIcon  color='rgb(113 175 181)'/> } menuStatus={props.menuStatus} windowWidth={windowWidth} title={'Contact Info'}/>
                </div>
            </nav>
        </aside>
        {(props.menuStatus && windowWidth < 768) && <Overlay setMenuStatus={props.setMenuStatus}/>}
        </ThemeContext.Provider>
        </>
    );
};

// Custom link -- ease of additions, modular.
const CustomLink = ({link, icon, menuStatus, windowWidth, title}) => {

    // Styles -- for links according to state.
    const activeNavLink = " text-primary flex gap-6 transition-all select-none";
    const defaultNavLink = "flex gap-6 transition-all select-none";

    return (
        <NavLink to={link} className={({ isActive }) => isActive ? activeNavLink : defaultNavLink}>
            <div>{icon}</div>
            {(!menuStatus || windowWidth < 768) && <span className="font-semibold">{title}</span>}
        </NavLink>
    );
};

export default Sidebar;