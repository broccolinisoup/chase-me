angular.module('timeTrackerService', [])

	// Each function returns a promise object
	.factory('Tasks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/tasks');
			},
			create : function(taskData) {
				return $http.post('/api/tasks', taskData);
			},
			delete : function(id) {
				return $http.delete('/api/tasks/' + id);
			}
		}
	}])
    .factory('Records', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/records');
            },
            create : function(selectedTask, created, duration) {
                data = {
                	task : selectedTask,
					startTime : created,
					duration : duration
				}
                return $http.post('/api/records', data);
            }
        }
    }]);

