
import numpy as np

def compute_bollinger_bands(prices, window=20, num_std_dev=2):
    rolling_mean = np.convolve(prices, np.ones(window)/window, mode='valid')
    std_dev = np.std(prices[-window:])
    upper_band = rolling_mean + num_std_dev * std_dev
    lower_band = rolling_mean - num_std_dev * std_dev
    return rolling_mean, upper_band, lower_band
