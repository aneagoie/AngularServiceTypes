var app = angular.module('app', []);

app.controller('MainController', function($scope, constantService, valService){
  console.log(constantService);
});

app.constant('constantService', {attr: "THIS IS CONSTANT!"});
app.value('valService', function(){
  return "THIS IS VALUE!";
});

app.factory('myFactory', function() {
  return {
    mydata: 'this is some data',
    getdata: function() {
      return this.mydata;
    }
  };
});
//The above is bad. Not OOP, and values can be accessed from outside. Better to:
app.factory('myFactory', function() {
  var mydata = "this is my data";
  return {
    getdata: function() {
      return mydata;
    }
  };
});

app.service('myService', function() {
  var myString = "this is some other data";
  var addToString = function(newstr){
    myString += newstr;
  };
    this.getData = function() {
      return "String contains: " + myString;
    };
    this.addData = addToString;
});

app.factory('myFactory', function() {
  var myString = "this is some other data";
  var addToString = function(newstr){
    myString += newstr;
  };
  return {
    getData: function() {
      return "String contains: " + myString;
    },
    addData: addToString
  };
});

 // it allows you to configure
app.provider('myTest', function() {
  var myString = "this is some other data";
  var addToString = function(newstr){
    myString += newstr;
  };
  // this is the provider object
  return {
    // always returns an object that has a $get attribute. This is the data being injected
    // provider is different because you can configure it.
    setData: function(data) {
      myString = data;
    },
    $get: function() {
      // this is what is being injected
        return {
          getData: function() {
            return "String contains: " + myString;
          },
          addData: addToString
        };
    }
  };
});

app.config(function(myTestProvider){
  myTestProvider.setData("some different string");
});


// decorator isn't a formal service but when if you want to modify a service without actually changing the main service.
// $provide is what angular uses to create all of its services
app.config(function($provide) {
  // $delegate is the original instance of the service. you won't have access to the private stuff.
  $provide.decorator('myFactory', function($delegate){
    $delegate.reverse =function() {
      $delegate.setData($delegate.getData().split(''.reverse().join('')));
    };
    return $delegate;
  });
});
// Now you can call myFactory.reverse()


// to prevent problems during minification do this:
// dependancy injection
app.controller('Maincontroller', ['$scope', 'DataService', function($scope, DataService) {
  $scope.mydata = DataService.data;
}]);


