

var MQController = function (queueName, doTask) {
    var iron_mq = require('iron_mq'),
        imq = new iron_mq.Client({
            token: "Vycchg8gKy52kHA9BAKSVcWc9QQ",
            project_id: "543f8532d608d100090000a1",
            queue: queueName
        }),
        exceptionImq = new iron_mq.Client({
            token: "Vycchg8gKy52kHA9BAKSVcWc9QQ",
            project_id: "543f8532d608d100090000a1",
            queue: "failedTask"
        }),
        exceptionQueue = exceptionImq.queue('failedTask'),
        queue = imq.queue(queueName),
        deleteJob = function (job) {
            queue.del(job.id, function (error, body) {
                console.log('job deleted success,%s', job.id);
            }, function (err) {
                console.log('job deleted failed,%s', job.id);
            });
        },
        failed = function (job) {
            console.log('task failed');
            deleteJob(job);
        },
        success = function (job) {
            console.log('task success');
            deleteJob(job);
        },
        exception = function (job) {
            console.log('task exception');
            exceptionQueue.post(job, function (error, body) {
                console.log('task moved to failedTask,oldId=%s,newId=%s', job.id, body);
            });
            deleteJob(job);
        };

    function fetchTask() {
        queue.get({}, function (error, body) {
            if (body) {
                try {
                    doTask(body, function () {
                        success(body);
                    }, function () {
                        failed(body);
                    });
                } catch (err) {
                    exception(body);
                }
                fetchTask();
            } else {
                setTimeout(fetchTask, 5000);
            }
        });
    }

    return {
        start: function () {
            console.log('start message queue');
            fetchTask();
        }
    }
}


var controller = new MQController("crawler_sample", function (task, success, failed) {
    console.log('work work');
    console.dir(JSON.parse(task.body));
    // Do something
    success();
});
controller.start();
