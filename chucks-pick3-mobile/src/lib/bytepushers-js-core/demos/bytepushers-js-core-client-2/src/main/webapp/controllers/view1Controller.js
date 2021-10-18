require(["controllers/module"], function(controllers) {
    console.log('in controller');
    controllers.controller("view1Controller", function($scope) {
        $scope.firstName = "Jared";
        $scope.lastName = "Ramirez";
        $scope.fullName = function() {
            return $scope.firstName + " " + $scope.lastName;
        };
    });
});

