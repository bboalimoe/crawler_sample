// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//var request = require('request');
//var cheerio = require('cheerio');
var async = require('async');
var _ = require('underscore');
var fs = require('fs');

var ContextLoader = function (appId, appKey) {
 this.AV = null;
 this.runInThis = function (script) {
 eval(this.script);
 this.AV.initialize(appId, appKey);
 }
 this.loadContext = function (appId, appKey) {
 var code = fs.readFileSync('cloud/av.js', {encoding: 'utf8'});
 this.script = code;
 this.runInThis.call(this);
 }
 this.loadContext(appId, appKey);
 }

 var techhackLoader =new ContextLoader('xv1cgfapsn90hyy2a42i9q6jg7phbfmdpt1404li6n93tt2r','70sp4h8prccxzyfp56vwm9ksczji36bsrjvtwzvrzegfza67')

// input "websiteUrl" to crawling the  website and callback its websiteBody
techhackLoader.AV.Cloud.run("crawlingWebsite", {websiteUrl: 'http://www.producthunt.com/'}, {
    success: function(data){
        //调用成功，得到成功的应答data
        console.log(data);
    },
    error: function(err){
        //处理调用失败
    }
});


/*
AV.Cloud.define("hello", function(request, response) {
    response.success("Hello heamon7! Here is Techhack ! ");
});*/
