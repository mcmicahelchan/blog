/**
 * Created by michaelchan on 2017/1/23.
 */
'use strict'
var logeduser = 'nobody';
angular.module('addPost',[]).
component('addPost',{
    templateUrl:'template/write.html',
    controller: function($scope,$http,$location){
        getUser();
        $scope.logeduser=logeduser;
            $scope.blogpost = function(post){
                $http
                    .post("/api/blogpost",post)
                    .then(function(arg){
                        $location.path('/userIndex');
                    },function(err){$location.path('/userIndex');});
            }
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