'use strict';

angular.module('DayinsureApiCore')
.factory('DayinsureApiCore', ['$http','$resource','$sce',function($http,$resource,$sce){
    var simpleReplace = function(path,params){
      var newpath = path;
      Object.keys(params).forEach(function (pkey){
        newpath = newpath.replace(':' + pkey, params[pkey]); 
      });
    return newpath;
    }

    var joinPaths = function(base,rest) { 
      return (base + ((base.substr(-1,1) !== '/' && rest.substr(0,1) !== '/') ? '/' : '') + rest).replace('//','/'); 
    }
    var _baseUri = '';
    return {
      // baseUrl : 'http://productservice.app.stage.dayinsure.local',
      baseUrl : _baseUri,
      // baseUrl : 'http://localhost:1337',
      setBaseUrl : function(newUri) { this._baseUri = newUri; return this; },
      httpCommand : function(path,params,k,err){
        $http.post(simpleReplace(path,params),params).success(k).error(err);
      }, 
      httpQuery : function(path,params,k,err){
        $http.get(simpleReplace(path,params),params).success(k).error(err);
      },
      getBaseUrl : function(sourceUrl){
        return $sce.trustAsResourceUrl(sourceUrl);
      } 
    }
  }]);