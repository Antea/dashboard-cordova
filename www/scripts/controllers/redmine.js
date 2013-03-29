
angular.module('Dashboard').controller('RedmineController', function($scope, $http, $timeout, $location) {
    var REDMINE_URL = "http://redmine.antea.bogus/issues.json";
    var REDMINE_KEY = "dcd4ac4132d1270bea2fee939d74197d482f0c44";
    var STATUS_ONGOING = "2";
    var LOW_PRIORITY = "3";
    var NORMAL_PRIORITY = "4";
    var URGENT_PRIORITY = "6";
    var IMMEDIATE_PRIORITY = "7";

    $scope.issues = [];
    $scope.orderProp = "project";

    $http.get(REDMINE_URL + "?key=" + REDMINE_KEY + "&status_id=" + STATUS_ONGOING).
    success(function(data, status) {
        var issues = data.issues;
        var i = 0;
        issues.forEach(function(arrayElement) {
            $scope.issues[i++] = {
                developer: arrayElement.assigned_to.name.split(' ')[0],
                id: arrayElement.id,
                subject: arrayElement.subject,
                project: arrayElement.project.name,
                class: priorityColor(arrayElement.priority.id)
            };
        });
    });

    function priorityColor(num) {
        switch (num) {
            case eval(LOW_PRIORITY):
                return "info";
            case eval(NORMAL_PRIORITY):
                return "success";
            case eval(URGENT_PRIORITY):
                return "warning";
            case eval(IMMEDIATE_PRIORITY):
                return "important";
        }
    }

    $(".navbutton").removeClass("active");
    $("#navredmine").addClass("active");
});
