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
(function() {

    /**
     * Webinos Get42 service constructor (client side).
     * @constructor
     * @param obj Object containing displayName, api, etc.
     */
    HelloWorldModule = function(obj) {
        WebinosService.call(this, obj);
    };

    _webinos.registerServiceConstructor("http://botsikas.blogspot.com/helloworld", HelloWorldModule);

    /**
     * To bind the service.
     * @param bindCB BindCallback object.
     */
    HelloWorldModule.prototype.bindService = function (bindCB, serviceId) {
        this.sayHello = sayHello;
        this.openConfiguration = openConfiguration;
        this.getGreeting = getGreeting;
        this.setGreeting = setGreeting;
        this.test = function(params){
            var rpc = rpcHandler.createRPC(this, 'test', params);
            webinos.rpcHandler.executeRPC(rpc,
                function (params){
                    console.log('**********');
                    console.log('test', params);
                    console.log('**********');
                }
            );
        };
        if (typeof bindCB.onBind === 'function') {
            bindCB.onBind(this);
        }
    };

    function sayHello(name, successCB, errorCB) {
        if (typeof successCB != "function") successCB = function(){};
        if (typeof errorCB != "function") errorCB = function(){};
        var rpc = webinos.rpcHandler.createRPC(this, "sayHello", {name:name});
        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    }
    function openConfiguration(successCB, errorCB) {
        if (typeof successCB != "function") successCB = function(){};
        if (typeof errorCB != "function") errorCB = function(){};
        var rpc = webinos.rpcHandler.createRPC(this, "openConfiguration");
        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    }
    function getGreeting(successCB, errorCB) {
        if (typeof successCB != "function") successCB = function(){};
        if (typeof errorCB != "function") errorCB = function(){};
        var rpc = webinos.rpcHandler.createRPC(this, "getGreeting");
        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    }
    function setGreeting(greeting, successCB, errorCB) {
        if (typeof successCB != "function") successCB = function(){};
        if (typeof errorCB != "function") errorCB = function(){};
        var rpc = webinos.rpcHandler.createRPC(this, "setGreeting", {greeting:greeting});
        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    }
}());