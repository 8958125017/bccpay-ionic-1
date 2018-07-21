mybccApp.controller('DashboardCtrl', function($rootScope, $scope, $ionicPopup, $state, $window, $timeout, $http, MyPayService, $localStorage, ionicMaterialInk, ConnectivityMonitor) {
  
  ionicMaterialInk.displayEffect();
  $rootScope.user = $localStorage.credentials.user;  
  $scope.emailId = {
       "userMailId": $localStorage.credentials.user.email
  }

  $state.reload();
  $scope.doRefresh = function() {
    $timeout(function() {
        MyPayService.CurrntBalanceOfBCH($scope.emailId).then(function(response) {
        if (response.data.statusCode == 200) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;
        }
      });

      MyPayService.CurrntBalanceOfBTC($scope.emailId).then(function(response) {
        if (response.data.statusCode == 200) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;
         }
      });

      MyPayService.getBidCoin().then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          $scope.currentUserBalance = response.currentPrice;
        }
      });
      $scope.$broadcast('scroll.refreshComplete');
    }, 8000);

  };

  MyPayService.getBidCoin().then(function(response) {
    if (response.statusCode >= 400) {
      var alertPopup = $ionicPopup.alert({
        title: "Server Message :" + response.message,
      });
    } else {
      $scope.currentUserBalance = response.currentPrice;
    }
  });

  $http.post(constants.apiurl + '/cexticker/getChart', {
    "lastHours": 24,
    "maxRespArrSize": 50
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function(response) {
    $scope.chartData = response.data;    
    $scope.labels = $scope.chartData.timeStamp;
    $scope.series = ['Price'];
    $scope.data = $scope.chartData.rate;
    var myChart = Highcharts.chart('container', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        backgroundColor: {
          linearGradient: [0, 0, 0, 0],
          stops: [
            [0, '#072c4a'],
            [1, '#072c4a']
          ]
        },
        style: {
          fontFamily: 'serif',
          color: '#fff'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      title: {
        text: '',
        style: {
          color: '#fff'
        }
      },
      xAxis: {
        categories: $scope.labels,
        labels: {
          style: {
            color: '#fff'
          },
          step: 10
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          align: 'left',
          style: {
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '8pt',
          },
          reserveSpace: false,
          x: 2,
          y: 0
        },
        gridLineColor: 'rgba(255, 255, 255, 0.65)'
      },
      series: [{
        name: 'Price',
        data: $scope.data,

      }],
      tooltip: {
        crosshairs: [true, true]
      }
    });
    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

  });
  $scope.BuyBch = function() {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $state.go('app.buycrypto');
    }
  }
  $scope.SellBch = function() {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $state.go('app.sellcrypto');
    }
  }
  $scope.bidCrypto = function() {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $state.go('app.bidcrypto');
    }
  }
  $scope.askCrypto = function() {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $state.go('app.askcrypto');
    }
  }

});
