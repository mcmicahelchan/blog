/**
 * Created by michaelchan on 2017/1/22.
 */
'use strict'
var logeduser = 'nobody';
var type = 'user';
angular.module('detail',[]).
    component('detail',{
        templateUrl:'template/detail.html',
        controller: function($scope,$http,$routeParams,$location){
            var id = $routeParams.id;
            getUser();
            $http.get("/api/type")
                    .then(function(data){
                        console.log(data);
                        type = data.data;
                        console.log(type);
                        $scope.type=type;
                    },function(err){});


            $scope.logeduser=logeduser;
            $http.get("/api/blogdetail/"+id)
                 .then(function(data){
                    if (data.data.hidden == "true")
                    {
                        data.data.title = "This post is blocked by the admin.";
                        data.data.body = "This post is blocked by the admin.";
                    }
                     var title = data.data.title;
                     var body = data.data.body;
                     $scope.posts = data.data;
                     getAllComment();

                 },function(err){

                 });
            $scope.edit=function(){
                $location.path('/edit/'+id);
            }
            $scope.delete=function(){
                $http.delete("/api/blog/"+id)
                    .then(
                        function(data){
                            $location.path('/userIndex');
                        },function(){

                        }
                    );
            }
            $scope.newpost = function()
            {
                $location.path("/addPost");
            }

            $scope.createComment = function(post){

                var neirong=post.comment;
                console.log(post.comment);
                $http
                    .get("/api/commentc/"+id+"/"+neirong)
                    .then(function(arg){
                        getAllComment();
                    },function(err){console.log(err);});

            };
            $scope.blockblog = function(){
                $http.put("/api/blockpost/"+id)
                    .then(function(){
                        $http.get("/api/blogdetail/"+id)
                            .then(function(data){

                                data.data.title = "This post is blocked by the admin.";
                                data.data.body = "This post is blocked by the admin.";
                                $scope.posts = data.data;
                                getAllComment();

                            },function(err){

                            });
                    },function(){
                        
                    });
            }
            $scope.blockcomment = function(comment){
                $http.get("/api/comment/"+id)
                    .then(function(data){
                        console.log(data.data);
                        var allcomment = data.data;
                        for(var i=0,l=allcomment.length;i<l;i++)
                        {
                            if (allcomment[i].body == comment)
                            {
                                allcomment[i].hidden = true;
                                console.log(allcomment[i].hidden);
                            }

                        }
                        console.log(allcomment);
                        $http.put("/api/comment/"+id,allcomment)
                            .then(function(){
                                getAllComment();
                            },function (err) {
                                console.log(err);

                            })
                    },function(err){});
            };
            $scope.delcomment=function(comment){
                $http.get("/api/comment/"+id)
                    .then(function(data){
                        console.log(data.data);
                        var allcomment = data.data;
                        var index;
                        for(var i=0,l=allcomment.length;i<l;i++)
                        {
                            if (allcomment[i].author == logeduser && allcomment[i].body == comment)
                            {
                                index = i;
                                break;
                            }
                            
                        }
                        allcomment.splice(index,1);
                        console.log(allcomment);
                        $http.put("/api/comment/"+id,allcomment)
                             .then(function(){
                                 getAllComment();
                             },function (err) {
                                 console.log(err);
                                 
                             })
                    },function(err){});
            }

            function getAllComment(){
            $http.get("/api/comment/"+id)
                .then(function(data){
                    console.log(data.data);
                    var allcomment = data.data;
                    for(var i=0,l=allcomment.length;i<l;i++)
                    {
                        if (allcomment[i].hidden == true)
                        {
                            allcomment[i].body = "This comment is blocked by the admin."
                        }

                    }
                    $scope.comments = allcomment;
                },function(err){});
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
