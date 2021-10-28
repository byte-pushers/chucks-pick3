require(["controllers/module"], function(controllers) {
    controllers.controller("view1Controller", function($scope) {
        $scope.firstName = "Jared";
        $scope.lastName = "Ramirez";
        $scope.fullName = function() {
            return $scope.firstName + " " + $scope.lastName;
        };
    });
});

