/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2013 EPU-National Technical University of Athens
 * Author: Christos Botsikas, NTUA
 ******************************************************************************/

var RPCWebinosService = require("webinos-jsonrpc2").RPCWebinosService;
var logger = require("webinos-utilities").webinosLogging(__filename);

var helloWorldImpl = require('./helloworld');


var MyService = function(rpcHandler, params){
    this.base = RPCWebinosService;
    this.base({
        api: 'http://botsikas.blogspot.com/helloworld',
        displayName: 'Hello World API',
        description: 'webinos hello world api'
    });
    if (typeof params.greeting !== "undefined"){
        helloWorldImpl.setGreeting(params.greeting);
    }
};

MyService.prototype = new RPCWebinosService;

MyService.prototype.sayHello = function(params, successCB, errorCB){
    if (typeof params.name === "undefined"){
        errorCB("Name is undefined.");
        return;
    }
    var msg = helloWorldImpl.sayHello(params.name);
    successCB({msg:msg});
};

MyService.prototype.openConfiguration = function(params, successCB, errorCB){
    helloWorldImpl.openConfiguration(successCB, errorCB);
};

MyService.prototype.getGreeting = function(params, successCB, errorCB){
    var greeting = helloWorldImpl.getGreeting();
    successCB({greeting:greeting});
};
MyService.prototype.setGreeting = function(params, successCB, errorCB){
    if (typeof params.greeting === "undefined"){
        errorCB("Greeting is undefined.");
        return;
    }
    helloWorldImpl.setGreeting(params.greeting, true);
    successCB();
};

MyService.prototype.test = function(params, successCB, errorCB){
    successCB(arguments);
};

module.exports = MyService;
