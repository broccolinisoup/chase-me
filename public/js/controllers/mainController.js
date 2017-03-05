timeTrackerController.controller('mainController', ['$scope','$http', 'Tasks', 'Records', '$interval', function($scope, $http, Tasks, Records, $interval) {
    $scope.formData = {};
    $scope.loading = true;
    $scope.app = {};
    $scope.duration = 0;
    var stop;

    // GET =====================================================================
    // when landing on the page, get all tasks and show them, use the service to get all the tasks
    Tasks.get()
        .success(function(data) {
            $scope.tasks = data;
            $scope.loading = false;
        });

    $scope.startTime;

    $scope.start = function () {

        // Don't start a new record if you already started
        if ( angular.isDefined(stop) ) return;


        // Start the timer of the task
        $scope.startTime =  new Date();


        stop = $interval(function(){
            $scope.duration = new Date() - $scope.startTime;
        },1000);
    };

    $scope.stop = function () {

        // add a record to the database.
        Records.create($scope.selectedTask, $scope.startTime, $scope.duration)
            .success(function() {

                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    $scope.duration = 0;
                    stop = undefined;
                }
                // clear the form and reset the timer
            });

    };
    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createRecord = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Records.create($scope.formData)

            // if successful creation, call our get function to get all the new tasks
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.tasks = data; // assign our new list of tasks
                });
        }
    };

}]);
