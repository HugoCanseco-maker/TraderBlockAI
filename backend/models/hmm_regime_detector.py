
import numpy as np
from hmmlearn.hmm import GaussianHMM

def detect_market_regime(prices, n_states=3):
    log_returns = np.diff(np.log(prices))
    model = GaussianHMM(n_components=n_states, covariance_type="diag", n_iter=1000)
    model.fit(log_returns.reshape(-1, 1))
    hidden_states = model.predict(log_returns.reshape(-1, 1))
    return hidden_states
