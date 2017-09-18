/**
 * Created by michaelchan on 2017/1/22.
 */
'use strict';

angular.module('puzzleBlog').
    config(function (
    $locationProvider,
    $routeProvider
    ) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when("/",{
            template:"<login></login>"
        }).
        when("/userIndex",{
            template:"<user-home></user-home>"
        }).
        when("/myblog",{
            template:"<my-blog></my-blog>"
        }).
        when("/edit/:id",{
            template:"<edit></edit>"
        }).
        when("/detail/:id",{
            template:"<detail></detail>"
        }).
        when("/adminHome",{
            template:"<h1>250</h1>"
        }).
        when("/addPost",{
            template:"<add-post></add-post>"
        }).
        when("/signup",{
            template:"<regist></regist>"
        }).
        when("/blog/1/",{
            template:"<blog-list></blog-list>"
        }).
        when('/blog/2/',{
        template:"<h1>stupid you</h1>"
        }).
        otherwise({
        template:"<h1>404</h1>"
    });

});
