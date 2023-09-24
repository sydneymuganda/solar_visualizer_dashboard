import { render } from '@testing-library/react';
import useAutoCycleOptions from './useAutoCycleOptions';

function TestComponent({ options, intervalTime }) {
  const currentOption = useAutoCycleOptions(options, intervalTime);
  return <div>{currentOption}</div>;
}

test('useAutoCycleOptions cycles through options at the specified interval', (done) => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const intervalTime = 1000; // 1 second
    const { container } = render(
        <TestComponent options={options} intervalTime={intervalTime} />
    );
    expect(container.textContent).toBe(options[0]);

    // Advance time by the intervalTime to trigger a state update
    setTimeout(() => {
        expect(container.textContent).toBe(options[1]);
        setTimeout(() => {
            expect(container.textContent).toBe(options[2]);
            done();
        }, intervalTime);
    }, intervalTime);
});