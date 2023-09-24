// Icons -- visual aid for user navigation
import { Bell, Menu, Moon } from 'lucide-react';
import Logo from '../../assets/d-school-logo.png';

const Navbar = (props) => {
    return (
        <div className='fixed bg-white w-full h-16 border z-20'>
            <div className='flex justify-between items-center h-16 px-6'>
                    <div className='flex items-center gap-4'>
                        <div><Menu  onClick={props.setMenuStatus} className='cursor-pointer'/></div>
                        <img src={Logo} alt='' className='h-16 select-none'/>
                    </div>
                    <div className='flex items-center gap-4'>
                        
                        <Bell />
                        <button id="theme-toggle">
                        <Moon />
                        </button>   
                    </div>
            </div>
        </div>
    );
};

export default Navbar;