/**
 * Created by michaelchan on 2017/1/22.
 */
'use strict'
var logeduser = 'nobody';
angular.module('edit',[]).
    component('edit',{
        templateUrl:'template/edit.html',
        controller: function($scope,$http,$routeParams,$location){
            getUser();
            $scope.logeduser=logeduser;
            var id = $routeParams.id;
            $http.get("/api/blogedit/"+id)
                 .then(function(data){
                     console.log(data.data);
                     $scope.post=data.data;
                 },function(){

                 });
            $scope.blogUpdate = function(post){
                $http
                    .put("/api/blogedit/"+id,post)
                    .then(function(){
                        $location.path('/userIndex'); 
                    },function(){

                    });
            };
            $scope.newpost = function()
            {
                $location.path("/addPost");
            }
            function getUser(){
                $http.get("/api/logeduser")
                    .then(function(data){
                        console.log(data);
                        logeduser = data.data;
                    },function(err){});
            }
        }
});
