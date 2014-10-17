// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//AV.Cloud.define("hello", function(request, response) {
//  response.success("Hello world!");
//});

var iron_mq = require('iron_mq');
var imq = new iron_mq.Client({
    token: "Vycchg8gKy52kHA9BAKSVcWc9QQ",
    project_id: "543f8532d608d100090000a1"
});

var queue = imq.queue("crawler_sample");

function doTask() {
    console.log('do task');
}

function fetchTask() {
    queue.get({}, function (error, body) {
        console.log('fetch task,%s', JSON.stringify(body));
        if (body) {
            doTask();
            fetchTask();
        } else {
            setTimeout(fetchTask, 3000);
        }
    });
}

fetchTask();
