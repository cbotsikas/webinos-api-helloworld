var localService = null;
webinos.session.addListener("registeredBrowser", function () {
    webinos.dashboard.getData(
        function (tokenData) {
            document.getElementById("tokenData").value = JSON.stringify(tokenData, "", " ");
        },
        function (error) {
            document.getElementById("tokenData").value = "No token data found.\n" + JSON.stringify(error, "", " ");
        }
    );
    webinos.discovery.findServices(
        new ServiceType("http://botsikas.blogspot.com/helloworld"),
        {
            onFound: function (service) {
                if (service.serviceAddress == webinos.session.getPZPId()) {
                    localService = service;
                    service.bindService(
                        {
                            onBind: function (service) {
                                localService.getGreeting(function(result){
                                    document.getElementById("greeting").value = result.greeting;
                                });
                            }
                        }
                    );
                }
            }
        }
    );
});

function SendResponse() {
    // Send the response back to the caller
    webinos.dashboard.actionComplete(
        document.getElementById("result").value,
        function () {
            // On success close the dashboard
            window.close();
        },
        function () {
            // On error do something
            alert("Error sending response!");
        });
}

function setGreeting(){
    if (localService!=null){
        localService.setGreeting(document.getElementById("greeting").value);
    }
}