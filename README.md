Document
----

- [IronMQ](http://dev.iron.io/mq/reference/api/)
- [IronMQ official nodejs client](https://github.com/iron-io/iron_mq_node)

Test
----
Run this sample with following step

Terminal 1

    npm install -g avoscloud-code
    npm install
    avoscloud

Terminal 2

    curl -H "Content-Type: application/json" -H "Authorization: OAuth Vycchg8gKy52kHA9BAKSVcWc9QQ" -d '{"messages":[{"body":"{\"lala\":\"hello world!\"}"}]}' "https://mq-aws-us-east-1.iron.io/1/projects/543f8532d608d100090000a1/queues/crawler_sample/messages"


