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
var logger = require("webinos-utilities").webinosLogging(__filename);
var path = require('path');
var dashboard = null;
try{
    dashboard = require('webinos-dashboard');
}catch (e){
    logger.log("webinos Dashboard is not installed.");
}

var greeting = "Hi,";
var setGreeting = function(newGreeting){
    newGreeting = "" + newGreeting;
    greeting = newGreeting;
};

var getGreeting = function(){
    return greeting;
};

var sayHello = function(name){
    name = "" + name;
    return getGreeting() + " " + name + "!";
};

var registerDashboard = function(){
    if (dashboard!=null)
        dashboard.registerModule("helloworld", path.join(__dirname, '../dashboard/'));
};

var openConfiguration = function(successCB, errorCB){
    if (dashboard==null){
        errorCB("webinos Dashboard is not installed.");
    }
    dashboard.open(
        {
            module:"helloworld",
            data:{
                param1: 2,
                param2: false,
                param3: "opened from pzp"
            }
        },
        successCB,
        errorCB,
        function (response){
            logger.log("helloworld configuration response: "+JSON.stringify(response.result));
        }
    );
};

module.exports = {
    registerDashboard: registerDashboard,
    setGreeting: setGreeting,
    getGreeting: getGreeting,
    sayHello: sayHello,
    openConfiguration: openConfiguration
};
