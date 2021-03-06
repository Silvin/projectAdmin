'use strict';

angular.module('singleProjects', []);

function detailController($scope, $http){
    $scope.tasks                    =[];
    $scope.master                   ={};
    $scope.targetpercent            =10;

    $scope.init = function(){

        
        $http({
            method                  : 'POST',
            url                     : '/tasks/getByTarget',
            data                    : $("#frmTarget").serialize(),
            headers                 : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.tasks            = data;
            $scope.calculateTargetPercent();
            
        }).error(function(){
                SPNotification("danger", "Target Request", "We have an error in you request, please try again");

        });
    }


    $scope.detail = function(id){

        $("#taskId").prop("value", id);
        $("#frmTaskDetail").submit();
    }



    $scope.taskDelete = function(taskId,index){

        confirmModalDialog("Remove Task", "¿ Are you Sure to remove this Task ?", 
            function(){
                $("#tmptaskId").val(taskId);
                $("#loadingModal").modal("show");
                $http({
                    method                  : 'POST',
                    url                     : '/tasks/delete',
                    data                    : $("#frmTarget").serialize(),
                    headers                 : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){
                    $scope.tasks.splice(index, 1);
                    $scope.calculateTargetPercent();
                    SPNotification("success", "Remove Task", "The Task was removed");
                    $("#loadingModal").modal("hide");
                }).error(function(){
                        SPNotification("danger", "Target Request", "We have an error in you request, please try again");

                });
            },
            function(){  //Cancel confirm
                
            }
        );

    }

    $scope.saveTask = function(){
        $("#myModal").modal("hide");
        $("#loadingModal").modal("show");
        var id  = $("#tmpTaskId").val(); 
        $http({
            method                  : 'POST',
            url                     : '/tasks/save',
            data                    : $("#frmNewTask").serialize(),
            headers                 : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $("#loadingModal").modal("hide");
            if(id==""){
                $scope.tasks.unshift(data[0]);
                SPNotification("success", "New Task", "You Task was created");
            }
            else{
                SPNotification("info", "New Task", "You Task was modified");
                for(var n=0; n < $scope.tasks.length; n++){
                    if($scope.tasks[n].id==id){
                        $scope.tasks[n]=data[0];
                        break;           
                    }
                }
                
            }
            $scope.calculateTargetPercent();
        }).error(function(){
                SPNotification("danger", "Target Request", "We have an error in you request, please try again");

        });
    }

    $scope.calculateTargetPercent = function(){
        var total=0;
        for(var n=0; n<$scope.tasks.length; n++){
            total=total + $scope.tasks[n].endpercent;
        }
        $scope.targetpercent = ((100/ (100 * $scope.tasks.length) ) * total);
        $('.dial')
            .val($scope.targetpercent)
            .trigger('change');
    }
    
    
    
    
    $scope.openNewTaskModal=function(){
        
        $("#tmpTaskId").val("");
        
    }

     $scope.taskEdit = function(taskId, index){
         
         
         var taskObject         = $scope.tasks[index];
         $scope.datestart       = taskObject.datestart;
         $scope.dateend         = taskObject.dateend;
         $scope.title           = taskObject.title;
         $scope.code            = taskObject.code;
         $scope.description     = taskObject.description;
         $scope.tasktype        = taskObject.tasktype;
         $scope.owner           = taskObject.owner.id;
         $scope.priorityId      = taskObject.priority;
         $scope.estimatedhours  = taskObject.estimatedhours;
         
         $("#tmpTaskId").val(taskObject.id);
         $("#myModal").modal("show");
         
         
     }

}







$(document).ready(function(){



    
    $(".dial").knob({ readOnly:true });
    //$("#taskList ").on("click", ".taskdetail",function(){
    //    loadTaskDetail($(this));
    //});
    
    

    $("#btnNewTask").on("click",function(){
        $("#title").val("");
        $("#description").val("");
        $("#title").focus();


    });

    // $("#btnSaveTask").on("click",function(){

    //     $.ajax({  
    //         url         : "/tasks/save",
    //         type        : "POST",
    //         data        : $("#frmNewTask").serialize(),
    //         success : function(result){
    //             $("#taskList").prepend(result);
    //             $("#modalclose").trigger('click');
    //             $(".taskdetail").on("click",function(){
    //                 loadTaskDetail($(this));
    //             });

    //         }
    //     });
    // });




    // function loadTaskDetail(btn){
    //     id=btn.prop("lang");
    //     $("#taskId").prop("value", id);
    //     $("#frmTaskDetail").submit();

    // }

});



