/**
 * Created by michaelchan on 2017/1/23.
 */
'use strict'
var logeduser = 'nobody';
angular.module('userHome',[]).
component('userHome',{
    templateUrl:'template/userIndex.html',
    controller: function($scope,$http,$location,$rootScope){
        $scope.deletePost = function(id){
            console.log(id);
            $http.delete("/api/blog/"+id)
                 .then(
                     function(data){
                         getAllPost();
                     },function(){

                     }
                 );
        }
        $scope.newpost = function()
        {
            $location.path("/addPost");
        }
        
        $scope.editPost = function(id){
            $location.path('/edit/'+id);
        }
        getUser();

        setTimeout(function(){
            console.log(logeduser);
            getAllPost();
        },50);

        function getUser(){
            $http.get("/api/logeduser")
                .then(function(data){
                    console.log(data);
                 logeduser = data.data;
                },function(err){});
        }

        function getAllPost(){
            $http.get("/api/blog")
                 .then(function(data){
                     console.log(data.data);
                     var allpost = data.data;
                     for(var i=0,l=allpost.length;i<l;i++)
                     {
                         if (allpost[i].hidden == "true")
                         {
                             allpost[i].title = "This post is blocked by the admin.";
                             allpost[i].body = "This post is blocked by the admin.";
                         }

                     }
                     var sum=0;
                     for(var i=0,l=allpost.length;i<l;i++)
                     {
                         sum++;

                     }
                     if(sum==0)
                     {
                         $scope.cond='1';
                     }
                     else
                     {
                         $scope.cond='2';
                     }
                     
                     $scope.blogs=allpost;
                     $scope.logeduser=logeduser;
                 },function(err){});



    }
}});