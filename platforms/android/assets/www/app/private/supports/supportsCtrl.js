mybccApp.controller('SupportsCtrl', function($scope,$rootScope, $ionicModal,getCurrentUserData,ConnectivityMonitor,$localStorage, MyPayService, ionicMaterialInk,$timeout, $cordovaFileTransfer) {
  $scope.support = {
    "email": getCurrentUserData.email,
    "message": ""
  }
  $scope.modal = $ionicModal.fromTemplate(
   '<div>   <header class="bar bar-header light-blue darken-4 white-text">   <h1 class="title white-text">Query</h1>   <div class="button button-clear" ng-click="modal.hide()">   <span class="icon ion-chevron-right"></span>   </div>   </header>   <div has-header="true" padding="true" >   <div style="margin-top: 45px;position: relative;background: #fff;height:594px;">   <form class="col s12">   <div class="row">   <div class="input-field col s12">   <textarea id="textarea1" class="materialize-textarea" ng-model="support.message" style="height:100%">   </textarea>   <label for="textarea1" >Query</label>   </div>   </div>   <div style="margin-top: 68px;margin-left: 96px;">    <button class="btn waves-effect waves-light light-blue-text darken-4-text white" type="submit" name="action" ng-click="supportQuery(support)">send Query   <i class="material-icons right">send</i>    </button>   </div>   </form>   </div>', {
      scope: $scope,
      animation: 'slide-in-up'
   })

   $scope.openModal = function() {
      $scope.modal.show();
   };
  
   $scope.closeModal = function() {
      
      $scope.modal.hide();
   };
   $scope.supportQuery = function() {
     if ($scope.support.message == "") {
     Materialize.toast("please enter message !!",4000); 
    } else if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
        MyPayService.userQuery($scope.support).then(function(response) {
        if (response.data.statusCode == 200) {

        } else if (response.data.statusCode >= 400) {
     
        }
      });
    }
      
   };
  
});