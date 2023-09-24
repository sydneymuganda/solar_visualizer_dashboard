import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 gap-5">
            <div className="text-9xl md:text-[300px]">404</div>
            <div className="text-center">You didn't break the internet, but we can't find what you are looking for.</div>
            <Link to='/' className="bg-primary text-white px-5 py-2 rounded-lg">Take me home</Link>
        </div>
    );
};

export default PageNotFound;