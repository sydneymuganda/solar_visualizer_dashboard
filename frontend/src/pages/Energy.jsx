import SolarOverview from "../components/SolarOverview";
import EnergyStatistics from "../components/EnergyStatistics";
import useAutoNavigate from "../hooks/useAutoNavigate";

const Energy = () => {

    // Custom hook - after 5 minutes of mouse idle go to the assigned page
    useAutoNavigate('/water');

    return (
        <div className="flex flex-col p-5 gap-4 ">
            {/* Row 1 */}
            <div className="grid gap-4 grid-cols-3 row-span-2">
                {/* Chart Box*/}
                <div className=" col-span-2 h-full">
                    <SolarOverview data-testid="solar-overview"/>
                </div>
                {/* Chart Metrics Box */}
                <div className="w-auto content-end rounded-lg bg-white p-6 grow">
                    <h3 className="font-semibold text-2xl">Chart Metrics Explained</h3>
                    <p>
                        This chart showcases the solar energy generation and consumption over a given period. <br />
                        The <span style={{color: 'rgba(113, 175, 181, 0.8)'}}><i>green </i> </span>bars represent total solar power generation, <br />
                        Its   corresponding  <b>MIN</b> and <b>MAX</b> values highlight the range of values over the given time span .<br />
                        and the <span style={{color: 'rgba(255, 103, 77, 0.8)'}}><i>orange </i> </span>bars signify Eskom power  consumption.<br />
                        Its   corresponding  <b>MIN</b> and <b>MAX</b> values also  highlight the range of values over the given time span .
                    </p>
                </div>
            </div>
            {/* Row 2 */}
            <div className="rounded-lg bg-white p-6 ">
                <EnergyStatistics data-testid="energy-statistics"/>
            </div>
        </div>
    )
};

export default Energy;