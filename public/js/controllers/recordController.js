timeTrackerController.controller('recordController',['$scope','Records','Tasks', function ($scope, Records, Tasks) {
    Records.get()
        .success(function(data) {
            $scope.records = data;
            $scope.loading = false;
        });

    var myTasks = [];

    Tasks.get()
        .success(function (data) {
            $scope.my_tasks = data;
            for(var key in $scope.my_tasks){
                myTasks.push($scope.my_tasks[key].text);
            }
        });

}]);
