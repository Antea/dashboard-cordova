angular.module('Dashboard').controller('GitController', function($scope, $http, $timeout, $location) {
    var COMMIT_URL = "http://gitweb.antea.bogus/?p=bbox.git;a=rss;h=refs/heads/develop";
    var MAX_COMMIT_COUNT = 30;

    $scope.commits = [];

    $http.get(COMMIT_URL).success(function(data, status) {
        $(data).find("item").each(function(i) {
            if (i === MAX_COMMIT_COUNT) {
                return false;
            }
            var $this = jQuery(this);
            $scope.commits[i] = {
                title: $this.find("title").text(),
                pubDate: new Date($this.find("pubDate").text()).toString('yyMMdd'),
                author: $this.find("author").text().split(" <")[0].split(" ")[0]
            };
        });
    }).error(function(data, status) {
        console.log("Error in commit fetch: " + status);
    });

    $(".navbutton").removeClass("active");
    $("#navgit").addClass("active");
});
