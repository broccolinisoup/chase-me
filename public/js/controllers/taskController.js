timeTrackerController.controller('taskController',['$scope','Tasks', function ($scope, Tasks) {
    // GET =====================================================================
    // when landing on the page, get all tasks and show them, use the service to get all the tasks
    Tasks.get()
        .success(function(data) {
            $scope.tasks = data;
            $scope.loading = false;
        });

    // DELETE ==================================================================
    // delete a task after checking it
    $scope.deletetask = function(id) {
        $scope.loading = true;

        Tasks.delete(id)
        // if successful creation, call our get function to get all the new tasks
            .success(function(data) {
                $scope.loading = false;
                $scope.tasks = data; // assign our new list of tasks
            });
    };

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createtask = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Tasks.create($scope.formData)

            // if successful creation, call our get function to get all the new tasks
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.tasks = data; // assign our new list of tasks
                });
        }
    };
}]);