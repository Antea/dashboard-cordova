angular.module('Dashboard').controller('SvnController', function($scope, $http, $timeout, $location) {
    var SVN_URL = "http://websvn.antea.bogus/rss.php?repname=delphiXE2&path=/trunk/&isdir=1";
    var MAX_COMMIT_COUNT = 30;

    $scope.commits = [];

    $http.get(SVN_URL).success(function(data, status) {
    	$(data).find("item").each(function(i) {
            if (i === MAX_COMMIT_COUNT) {
                return false;
            }
            $scope.commits[i] = {
                date: new Date($(this).find("pubDate").text()).toString('yyMMdd'),
                author: $(data).find("item")[i].childNodes[1].textContent,
                log: $(this).find("title").text()
            };
        });
    });

    $("#nav li").removeClass("active");
    $("#navsvn").addClass("active");
});
