app.controller('MainController', function ($scope, $location, $routeParams, RestService) {
    $scope.filter = {};
    $scope.go = go;
    $scope.load = load;

    var keyword = getParameterByName('keyword');
    //console.log(keyword);
    if (keyword) {
        load(keyword);
    }

    function go() {
        var kw = $scope.filter.keyword;
        //console.log('go : ', kw);
        if (kw) {
            $location.url('/?keyword=' + kw);
            load(kw);
        }
    }

    function load(kw) {
        kw = kw || getParameterByName('keyword');
        RestService.searcher(kw)
            .success(function (data) {
                $scope.data = data;
                $scope.filter.keyword = kw;
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

