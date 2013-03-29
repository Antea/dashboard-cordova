angular.module('Dashboard').controller('JenkinsController', function($scope, $http, $timeout, $location) {
    var JOBS_URL = "http://jenkins.antea.bogus/hudson/api/json";
    var DATES_URL = "http://jenkins.antea.bogus/hudson/rssLatest";
    $scope.jobs = [];

    $http.get(JOBS_URL).success(function(json, status) {
        $http.get(DATES_URL).success(function(xml, status) {
            var $json = $(json.jobs);
            $json.each(function(i) {
                $scope.jobs[i] = {};
                $scope.jobs[i].name = this.name;
                var color = this.color;
                if (color.match(/^blue/)) {
                    $scope.jobs[i].label = "Stable";
                    $scope.jobs[i].class = "info";
                } else if (color.match(/^red/)) {
                    $scope.jobs[i].label = "Broken";
                    $scope.jobs[i].class = "important";
                } else if (color.match(/^yellow/)) {
                    $scope.jobs[i].label = "Unstable";
                    $scope.jobs[i].class = "warning";
                }
                if (color.match(/_anime$/)) $scope.jobs[i].state = "Building";
                else $scope.jobs[i].state = "";
            });

            //Recupera la data di build
            $(xml).find("entry").each(function(i) {
                var date = new Date($(this).find("published").text()).toString('yyMMdd');
                $scope.jobs[i].date = date;
            });
        });
    });

    $(".navbutton").removeClass("active");
    $("#navjenkins").addClass("active");
});
