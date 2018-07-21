mybccApp.controller('UserProfileCtrl', function($ionicLoading, $scope, $rootScope, $localStorage,$state, ionicMaterialInk,MyPayService, $ionicPopup, ConnectivityMonitor,getCurrentUserData) {

ionicMaterialInk.displayEffect();
$rootScope.user=$localStorage.credentials.user;
  $scope.show = function()
  {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.user={  	
  	"userImageUrl":"img/mcfly.jpg"  	
  }

  $scope.user = {
    "userMailId": getCurrentUserData.email,
    "firstName": "",
    "lastName": "",
    "mobileNumber": ""    
  }
  $scope.setUserprofile=function(){  	
     if ($scope.user.firstName == "") {
      var alertPopup = $ionicPopup.alert({
        title: "Please Enter First Name",
      });
    } else if ($scope.user.lastName == "") {
      var alertPopup = $ionicPopup.alert({
       title: "Please Enter Last Name",
      });
    } else if ($scope.user.mobileNumber == "") {
      var alertPopup = $ionicPopup.alert({
      title: "Please Enter Mobile Number",
      });
     }
      else if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    }
    else{
    	console.log("user profile = "+angular.toJson($scope.user));
    	 MyPayService.createUserProfile($scope.user).then(function(response) {
           if(response.data.statusCode == 200){
              $localStorage.credentials = response.data;
              $rootScope.user = $localStorage.credentials.user;
              $rootScope.userProfileDetails = $localStorage.credentials.user.email;
              $rootScope.$broadcast("user", response.data);
              $scope.hide($ionicLoading);
               $scope.user = {
			    "firstName": "",
			    "lastName": "",
			    "mobileNumber": ""    
			  }
          $state.go('app.dashboard');
           }
        });
    }
  }

 


});