app.controller('MainController', function ($scope, $location, $routeParams, RestService) {
    $scope.filter = {};
    $scope.go = go;
    $scope.load = load;

    var keyword = getParameterByName('keyword');
    //console.log(keyword);
    if (keyword) {
        // load(keyword);
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

                var groups = _.groupBy(data.entities, 'resultType');
                var relationalResults = _.groupBy(groups['RelationalResult'], 'description');

                var _entities = groups['Entity'];

                if(_entities[0] && _entities[0].link){
                    RestService.getEntityData(_entities[0].link)
                        .success(function (entity) {
                            _entities[0].data = entity;

                            $scope.relationalResults = relationalResults;
                            $scope.entities = _entities;
                        });
                }
                else {
                    $scope.relationalResults = relationalResults;
                    $scope.entities = _entities;
                }

                // console.log($scope.entities);
            });
    }

    $scope.loadEntity = function (entity) {
        RestService.getEntityData(entity.link)
            .success(function (data) {
                entity.data = data;
            });
    };

});


function fixImage(element, entity) {
    console.log($(element));
    $(element).css({'background-image': 'url(\'' + entity.data.image + '\')'})
}

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

