import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import useAutoNavigate from './useAutoNavigate';

const originalLocation = window.location;
beforeEach(() => {
    delete window.location;
    window.location = { href: '' };
});

afterEach(() => {
    window.location = originalLocation;
});

it('useAutoNavigate', () => {
    it('should navigate to the next page on mouse idle', () => {
        const nextPageUrl = 'https://happy.com/next-page';

        const container = document.createElement('div');
        document.body.appendChild(container);

        let resetMouseIdleTimer;

        act(() => {
            render(<div onClick={() => (resetMouseIdleTimer = useAutoNavigate(nextPageUrl))}></div>, container);
        });

        act(() => {
            container.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
        });
        expect(resetMouseIdleTimer).toBeTruthy();
        jest.advanceTimersByTime(5 * 60 * 1000);
        expect(window.location.href).toBe(nextPageUrl);
        unmountComponentAtNode(container);
        container.remove();
    });
});