'use strict';
angular.module('singleProjects', ["ngSanitize", "ngCsv"]);

function resumeTwoController($scope, $http){

    $scope.getArray     = [];
    $scope.fileName     = "tiempo_por_proyecto.csv";
    $scope.getHeader    = function () {return ["Usuario", "Area", "Perfil", "Actividad", "Duración"]};



    $scope.init = function(){
        $scope.getData();

    }

    $scope.getData = function(){


        $http({
            method              : 'POST',
            url                 : "/team/resumetwolist/",
            data                : $("#frmResume").serialize(),
            headers             : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.resume         = data;
            $scope.generaCSV();
        }).error(function(){
                SPNotification("danger", "Team Request", "You have an error in your request, please select your project first and try again.");
        });

    }



    $scope.generaCSV = function(){
        var owner   = "";
        var area    = "";
        var profile = "";
        var total   = 0;
        debugger;
        for(var a = 0; a < $scope.resume.length; a++ ){
            owner   = $scope.resume[a].owner.name;
            area    = $scope.resume[a].owner.area;
            profile = $scope.resume[a].owner.profile;
            total   = $scope.resume[a].total;
            for(var n = 0; n < $scope.resume[a].events.length; n++){

                $scope.getArray.push({"user": owner, "area": area, "profile": profile, "activity": $scope.resume[a].events[n].name, "total": $scope.resume[a].events[n].value });
            }

        }
    }
}



$(document).ready(function(){

    $('#datestart').datepicker({
        format: "yyyy-mm-dd"
    }).on("changeDate",function(){
        $(this).datepicker("hide");
    });

    $('#dateend').datepicker({
        format: "yyyy-mm-dd"
    }).on("changeDate",function(){
        $(this).datepicker("hide");
    });

});
