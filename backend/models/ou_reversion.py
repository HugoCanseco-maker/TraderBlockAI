
import numpy as np

def simulate_ou_process(x0, theta, mu, sigma, dt, steps):
    x = np.zeros(steps)
    x[0] = x0
    for t in range(1, steps):
        x[t] = x[t-1] + theta * (mu - x[t-1]) * dt + sigma * np.sqrt(dt) * np.random.normal()
    return x
