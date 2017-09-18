/**
 * Created by michaelchan on 2017/1/22.
 */
'use strict'

angular.module('blogList',[]).
    component('blogList',{
        templateUrl:'template/blog-list.html',
        controller: function($scope,$http){
            var blogItem = [
                {id:1, title:'shazhuzhu', content:'i am happy today'},
                {id:2, title:'shazhuzhu2', content:'i am happy today2'},
                {id:3, title:'shazhuzhu3', content:'i am happy today3'}
            ]
            $scope.item = blogItem;
            $scope.title = 'michael';
            var i = 0;
            $scope.register = function(){
                i += 1;
                console.log(i);
            };
        }
});
