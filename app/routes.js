var Task = require('./models/task');
var Record = require('./models/record');

function getTasks(res) {
    Task.find(function (err, tasks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(tasks); // return all tasks in JSON format
    });
};

function getReports(res){
    Record.find(function (err, records) {
        if(err){
            res.send(err);
        }
        res.json(records); // return all records of a user TO DO: add more functionality to filter the data, later.
    })
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all tasks
    app.get('/api/tasks', function (req, res) {
        // use mongoose to get all tasks in the database
        getTasks(res);
    });

    // create task and send back all tasks after creation
    app.post('/api/tasks', function (req, res) {

        // create a task, information comes from AJAX request from Angular
        Task.create({
            text: req.body.text,
            done: false
        }, function (err, task) {
            if (err)
                res.send(err);

            // get and return all the tasks after you create another
            getTasks(res);
        });

    });

    // delete a task
    app.delete('/api/tasks/:task_id', function (req, res) {
        Task.remove({
            _id: req.params.task_id
        }, function (err, task) {
            if (err)
                res.send(err);

            getTasks(res);
        });
    });

    // api --------------------------------------------------------------------
    // Get all reports
    app.get('/api/records', function (req, res) {
        getReports(res);
    });
    // create record
    app.post('/api/records', function (req, res) {

        // create a record, information comes from AJAX request from Angular
        Record.create({
            task : req.body.task,
            created : req.body.startTime,
            duration : req.body.duration,
        }, function (err) {
            if (err)
                console.log(err);
                res.send(err);
        });

    });

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/add', function (req, res) {
        res.sendfile('public/add.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/records', function (req, res) {
        res.sendfile('public/records.html'); // load the single view file (angular will handle the page changes on the front-end)
    });



};
