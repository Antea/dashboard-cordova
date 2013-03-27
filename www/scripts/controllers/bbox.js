angular.module('Dashboard').controller('BBoxController', function($scope, $http, $timeout, $location) {

    $http.get('http://stronzio.anteash.com/servers.json').success(function(response, status) {
        $scope.states = response.servers;

        for (var i = 0; i < $scope.states.length; i++) {
            var server = $scope.states[i];
            (function(state) {
                $http.get(state.url).success(function(data, status) {
                    state.state = 'Running';
                    state.class = 'info';
                }).error(function(data, status) {
                    state.state = 'Fail';
                    state.class = 'warning';
                });
            })(server);
        }
    }).error(function(data, status, headers, config) {
        console.error('BBox servers fetch error: ' + status);
    });

    $("#nav li").removeClass("active");
    $("#navbbox").addClass("active");
});
