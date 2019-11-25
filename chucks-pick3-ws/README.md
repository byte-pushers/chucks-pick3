
GET /pick3/numbers/{drawingNumber}.json?state={state}&date={date}&time={drawTime}

Input:
 - DrawingState
 - DateOfDrawing
 - TimeOfDrawing
 - Pick3WinningNumber
    - int digit1
    - int digit2
    - int digit3

Output:
 - DrawingState 
 - DrawingTime
 - Collection<PlayNumber> (order is not important)
 
