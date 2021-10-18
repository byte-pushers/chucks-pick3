define(["controllers/module", 'bytepushers'], function(controllers, BytePushers) {
  controllers.controller('view2Controller', function ($scope) {
      $scope.isArray = Object.isDate(new Date());
      $scope.isNotArray = Object.isDate("str");
      var array = [1, 2, 3, 4];
      $scope.isArrayLike = BytePushers.isArrayLike(array);
  });
});
