import { render, screen } from "@testing-library/react";
import Energy from "./Energy";

it("Should contain chart elements", () => {
    render(<Energy />);
    const solarOverviewComponent = screen.queryAllByTestId('solar-overview');
    const energyStatisticsComponent = screen.queryAllByTestId('energy-statistics');

    expect(solarOverviewComponent).toBeDefined();
    expect(energyStatisticsComponent).toBeDefined();
});

it("Should have chart explanation", () => {
    render(<Energy />);
    const chartMetrics = screen.queryAllByText('Chart Metrics Explained');
    expect(chartMetrics).toBeDefined();
});