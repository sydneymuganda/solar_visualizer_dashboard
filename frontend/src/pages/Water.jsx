import WaterOverview from "../components/waterOverview";
import Waterstatistics from "../components/Waterstatistics";
import useAutoNavigate from "../hooks/useAutoNavigate";

const Water = () => {

    // Custom hook - after 5 minutes of mouse idle go to the assigned page
    useAutoNavigate('/historic-energy');

    return (
        <div  className="flex flex-col p-5 gap-4 ">
            {/* Row 1 */}
            <div className="grid gap-4 grid-cols-3 row-span-2">
                {/* Chart Box */}
                <div className="col-span-2 h-full">
                    <WaterOverview />
                </div>
                {/* Chart Metrics Box */}
                <div className="w-auto content-end rounded-lg bg-white p-6 grow">
                    <h3 className="font-semibold text-2xl">Chart Metrics Explained</h3>
                    <p>
                        This chart showcases the water consumption over a given period as seen on the top right.<br /> 
                        The <span style={{color: 'rgba(144, 238, 144, 1'}}><i>light green</i></span> represents water conserved, <br /> 
                        Its   corresponding  <b>MIN</b> and <b>MAX</b> values highlight the range of values over the given time span .
                        and The <span style={{color: 'blue'}}><i>Blue </i></span>points represent total consumption on the particular time point,<br /> 
                        Their  corresponding  <b>MIN</b> and <b>MAX</b>values highlight the range of values over the given time span.
                    </p>
                </div>
            </div>
            <div className="rounded-lg bg-white p-6 ">
                <Waterstatistics />
            </div>
        </div>
    )
};

export default Water;