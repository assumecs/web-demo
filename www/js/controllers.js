angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.vo = {}
  $scope.cordova = window.cordova
  $scope.vo.url = localStorage.getItem('savedUrl')
  $scope.toIframe = function () {
    localStorage.setItem('savedUrl', $scope.vo.url)
    $state.go('iframe')
  }
  $scope.toWebview = function () {
    localStorage.setItem('savedUrl', $scope.vo.url)
    if (cordova.ThemeableBrowser){
      cordova.ThemeableBrowser.open($scope.vo.url,'_blank',{
        statusbar: {
            color: '#ffffffff'
        },
        toolbar: {
            height: 44,
            color: '#f0f0f0ff'
        },
        title: {
            color: '#003264ff',
            showPageTitle: true
        },
        backButton: {
            image: 'back',
            imagePressed: 'back_pressed',
            align: 'left',
            event: 'backPressed'
        },
        forwardButton: {
            image: 'forward',
            imagePressed: 'forward_pressed',
            align: 'left',
            event: 'forwardPressed'
        },
        closeButton: {
            image: 'close',
            imagePressed: 'close_pressed',
            align: 'left',
            event: 'closePressed'
        },
        customButtons: [
            {
                image: 'share',
                imagePressed: 'share_pressed',
                align: 'right',
                event: 'sharePressed'
            }
        ],
        menu: {
            image: 'menu',
            imagePressed: 'menu_pressed',
            title: 'Test',
            cancel: 'Cancel',
            align: 'right',
            items: [
                {
                    event: 'helloPressed',
                    label: 'Hello World!'
                },
                {
                    event: 'testPressed',
                    label: 'Test!'
                }
            ]
        },
        backButtonCanClose: true}).addEventListener('backPressed', function(e) {
          alert('back pressed');
      }).addEventListener('helloPressed', function(e) {
          alert('hello pressed');
      }).addEventListener('sharePressed', function(e) {
          alert(e.url);
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
          console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
          console.log(e.message);
      })
    } else {
      alert('没有找到插件')
    }
  }
})

.controller('IframeCtrl', function($rootScope, $scope, $sce, $state, $ionicNavBarDelegate) {
  $ionicNavBarDelegate.showBar(false)
  // $rootScope.hideNav = true;
  var url = localStorage.getItem('savedUrl')
  $scope.url = $sce.trustAsResourceUrl(url); //URL 为全链接
  $scope.go = function (state) {
    // $rootScope.hideNav = false;
    history.go(state)
  }
});
