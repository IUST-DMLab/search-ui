app.controller('MainController', function ($scope, $timeout, RestService) {
    $scope.filter = {};
    $scope.go = go;

    function go() {

        RestService.searcher($scope.filter.keyword)
            .success(function (data) {
                $scope.data = data;
            });
    }

});


function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

