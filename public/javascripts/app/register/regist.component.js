/**
 * Created by michaelchan on 2017/1/22.
 */
'use strict'

angular.module('regist',[]).
component('regist',{
    templateUrl:'template/signup.html',
    controller: function($scope,$http,$location){

        //noinspection JSAnnotator
        $scope.register =function(post){
            console.log(post);
            if("undefined" == typeof post)
            {
                $scope.cond ='1';
            }
            else
            {
                var count=0;
                for(var i in post){
                    count++;
                }
                console.log(count);
                if (count == 5)
                {
                    $http.get("/api/check/"+post.user)
                        .then(function(data){
                            console.log(data.data);
                           if(data.data == '1')
                           {
                               $scope.cond = '2';
                               console.log("ok");
                           }
                            else {
                               console.log("ok");
                               $http.post("/api/registpost",post)
                                   .then(
                                       function(){$location.path('/userIndex');},
                                       function(err){console.log(err);
                                           $location.path('/signup');
                                           $scope.cond ='2';}
                                   );
                           }
                        },function(){
                            
                        });

                }
                else
                {
                    $scope.cond ='1';
                }
            }



        }

    }
});
