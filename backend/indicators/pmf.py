
import numpy as np

def compute_price_momentum(prices, periods=[1, 3, 6, 12]):
    momentum = {}
    for p in periods:
        if len(prices) > p:
            momentum[f'momentum_{p}'] = (prices[-1] - prices[-p-1]) / prices[-p-1]
        else:
            momentum[f'momentum_{p}'] = 0
    return momentum
