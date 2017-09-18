/**
 * Created by michaelchan on 2017/1/23.
 */
'use strict'

angular.module('login',[]).
component('login',{
    templateUrl:'template/login.html',
    controller: function($scope,$http,$location){

        //noinspection JSAnnotator
        $scope.login =function(post){
            console.log(post);
            if (!post)
            {
                $scope.cond = '1';
            }
            else
            {
                $http
                    .post("/api/login",post)
                    .then(function(arg){
                        $location.path('/userIndex');
                    },function(err){
                        $location.path('/');
                        $scope.cond = '1';});
            }




        }

    }
});