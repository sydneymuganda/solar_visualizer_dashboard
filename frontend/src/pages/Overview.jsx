import { useNavigate } from "react-router-dom";
import Video from '../assets/dschoolVideo.mp4';
import branding from '../assets/branding.svg';
import ImageCarousel from "../components/ImageCarousel";
import useAutoNavigate from "../hooks/useAutoNavigate";
const Overview = () => {

    // Custom hook - after 5 minutes of mouse idle go to the assigned page
    useAutoNavigate('/energy');

    return (
        <div className="w-full h-auto md:h-[calc(100vh-64px)] p-5 flex flex-col gap-5 ">
                <div className="h-auto md:h-3/5 flex gap-5 w-full flex-col md:flex-row">

                <video className="w-full md:w-1/2 rounded-lg" autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <ImageCarousel />
                </div>
                <div className="bg-white h-full flex flex-col gap-5 p-5 overflow-auto w-auto rounded-lg">
                {/* Title */}
                <div className="font-semibold text-2xl text-red">
                    THE HPI 
                    <span className="text-primary"> d-school </span> 
                    BUILDING AT THE UNIVERSITY OF CAPE TOWN IS THE IDEAL EMBODIMENT OF 
                    <span className="text-primary"> DESIGN THINKING </span>
                </div>
                {/* Paragraph */}
                <div className="flex gap-10 flex-col md:flex-row items-center md:align-left">
                    <div className="flex flex-col gap-5 text-justify text-lg">
                        <p>As a physical home for individuals and communities to gather and learn about Design Thinking - it was critical that the design process was collaborative and inclusive. The co-creation process allowed the Architects (KMH Architects), students and faculty members to be a part of the brief guiding the design approach.</p>
                        <p>In all possible aspects, the building is sustainable, and engineered for maximum comfort and functionality with minimal reliance upon the grid. Through the myriad of sustainable measures implemented within the design, the HPI d-school building is aiming to achieve a six star Green Star rating with the Green Building Council of South Africa. Solar panels, low-energy light fittings, Thermo-Active Building Systems (TABS), rainwater harvesting and water-saving fittings across facilities ensure that the building is optimally.</p>
                    </div>
                    <img src={branding} alt="" className="w-60 mx-10"/>
                </div>
                </div>
        </div>
    )
};

export default Overview;