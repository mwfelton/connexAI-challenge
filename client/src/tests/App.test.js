import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { getTime } from '../utils/time';
import { getMetrics } from '../utils/metrics';

jest.mock('../utils/time');
jest.mock('../utils/metrics');

describe('App Component', () => {
  it('renders the App component', async () => {
    getTime.mockResolvedValue(1625249220);
    getMetrics.mockResolvedValue('metric1{label="value"} 1\nmetric2{label="value"} 2\n');

    render(<App />);

    await waitFor(() => expect(screen.getByText(/The most recently-fetched value for server time/i)).toBeInTheDocument());

    expect(screen.getByText(/\/METRICS/i)).toBeInTheDocument();
    expect(screen.getByText(/metric1{label="value"} 1/i)).toBeInTheDocument();
    expect(screen.getByText(/metric2{label="value"} 2/i)).toBeInTheDocument();
  });

  it('updates time difference every second', async () => {
    getTime.mockResolvedValue(1625249220);

    render(<App />);

    await waitFor(() => screen.getByText(/Time Difference:/i));

    jest.advanceTimersByTime(1000);

    expect(screen.getByText(/Time Difference:/i)).toHaveTextContent('00:00:01');
  });

  it('shows loading message while waiting for API response', async () => {
    getTime.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(1625249220), 2000)));
    getMetrics.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve('metrics'), 2000)));

    render(<App />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/The most recently-fetched value for server time/i)).toBeInTheDocument());
  });
});
