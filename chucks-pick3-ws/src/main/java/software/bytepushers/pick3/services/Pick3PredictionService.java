package software.bytepushers.pick3.services;

/**
 * The service layer implementation for prediction service.
 */
public interface Pick3PredictionService {

    /**
     * The service layer implementation is responsible for generating the predictions.
     *
     * @param winningNumber reference while generating the prediction.
     * @return the list of generated predicted numbers.
     */
    int[][] generatePredictions(int winningNumber);
}
