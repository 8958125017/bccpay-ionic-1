mybccApp.controller('RequestCryptoCtrl', function($rootScope, $scope, $localStorage, MyPayService, ionicMaterialInk,$ionicActionSheet, $cordovaSocialSharing, $timeout) {
  ionicMaterialInk.displayEffect();
  $scope.userBCHAddress = $localStorage.credentials.user;
  $rootScope.user = $localStorage.credentials.user;
  $scope.requestAmountBCH = "0";
  $scope.shareBCHRequest = function(address) {   
    $scope.subject="bcc address"; 
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        {
          text: 'facebook'
        },
        {
          text: 'message'
        },
        {
          text: 'email'
        }

      ],
      titleText: 'Share address via',
      cssClass: 'social-actionsheet',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if (index === 0) {
          window.plugins.socialsharing.shareViaWhatsApp(address, null /* img */ ,null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share");
          });
        }
        if (index === 1) {
          window.plugins.socialsharing.shareViaFacebook(address, null /* img */ ,null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
        if (index === 2) {
          window.plugins.socialsharing.shareViaSMS(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
          if (index === 3) {
              window.plugins.socialsharing.shareViaEmail(address, $scope.subject , null /* toArr */ ,null /* ccArr */,null /* bccArr */, null/* bccArr */ ,null/* bccArr */ ,null/* bccArr */ , function(errormsg) {
              alert("Error: Cannot Share")
            });            
          }
      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 5000);

  }
});
