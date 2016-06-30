angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider





    //main landing menu--------------------
    .state('login', {
      url: '/home',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('menu.app_menu', {
      url: '/app_menu',
      views: {
        'side-menu21': {
          templateUrl: 'templates/app_menu.html',
          controller: 'app_menuCtrl'
        }
      }
    })


    //app_menu page------------------------
    //.state('app_menu', {
    //  url: '/app_menu',
    //  templateUrl: 'templates/app_menu.html',
    //  controller: 'app_menuCtrl'
    //})

    // List crowd Sources----------------------
    .state('listCrowdSource', {
      url: '/listCrowdSource',
        templateUrl: 'templates/listCrowdSource.html',
        controller: 'loginCtrl'
    })
    // crowd source question-------------------
    .state('category',{
    url: '/category',
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
    })
    // Locate absa nearest atm-------------------
    //.state('locateabsa', {
    //  url: '/locateabsa',
    //  templateUrl: 'templates/locateabsa.html',
    //  controller: 'locateabsaCtrl'
    //})

    .state('menu.locateabsa', {
      url: '/locateabsa',
      views: {
        'side-menu21': {
          templateUrl: 'templates/locateabsa.html',
          controller: 'locateabsaCtrl'
        }
      }
    })
  //  locate absa partner shop-------------------
  //  .state('locateshop', {
  //    url: '/locateshop',
  //    templateUrl: 'templates/locateshop.html',
  //    controller: 'locateshopCtrl'
  //  })

    .state('menu.locateshop', {
      url: '/locateshop',
      views: {
        'side-menu21': {
          templateUrl: 'templates/locateshop.html',
          controller: 'locateshopCtrl'
        }
      }
    })
  // sports feeds api ---------------------------
    .state('soccerNews', {
      url: '/soccer_news',
      templateUrl: 'templates/soccerNews.html',
      controller: 'soccerNewsCtrl'
    })


  .state('menu.cart', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })
    // true  or false route
    .state('true_false', {
      url: '/true_false',
      templateUrl: 'templates/true_false.html',
      controller: 'true_falseCtrl'
    })
    //rating route
    .state('rate', {
      url: '/rate',
      templateUrl: 'templates/rate.html',
      controller: 'rateCtrl'
    })


    .state('menu.business', {
      url: '/business',
      views: {
        'side-menu21': {
          templateUrl: 'templates/business.html',
          controller: 'businessCtrl'
        }
      }
    })



    .state('menu.questionlist', {
      url: '/questionlist',
          templateUrl: 'templates/questionlist.html',
          controller: 'questionlistCtrl'
    })



  .state('menu.cloud', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cloud.html',
        controller: 'cloudCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })



  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('recoverPassword', {
    url: '/recover_password',
    templateUrl: 'templates/recoverPassword.html',
    controller: 'recoverPasswordCtrl'
  })

    //.state('crowdSource', {
    //  url: '/homee',
    //  templateUrl: 'templates/crowdSource.html',
    //  controller: 'crowdSourceCtrl'
    //})


  .state('rugbyNews', {
    url: '/rugby_news',
    templateUrl: 'templates/rugbyNews.html',
    controller: 'rugbyNewsCtrl'
  })

  //.state('soccerList', {
  //  url: '/soccer_list',
  //      templateUrl: 'templates/soccerList.html',
  //      controller: 'soccerListCtrl'
  //})

    .state('menu.soccerList', {
      url: '/soccerList',
      views: {
        'side-menu21': {
          templateUrl: 'templates/soccerList.html',
          controller: 'soccerListCtrl'
        }
      }
    })

  .state('rugbyList', {
    url: '/rugby_list',
    templateUrl: 'templates/rugbyList.html',
    controller: 'rugbyListCtrl'
  })

  //.state('profile', {
  //  url: '/profile',
  //  templateUrl: 'templates/profile.html',
  //  controller: 'profileCtrl'
  //})

    //.state('menu.profile', {
    //  url: '/profile',
    //  views: {
    //    'side-menu21': {
    //      templateUrl: 'templates/profile.html',
    //      controller: 'profileCtrl'
    //    }
    //  }
    //})

  .state('multipleChoice', {
    url: '/multiple_choice_one',
        templateUrl: 'templates/multipleChoice.html',
        controller: 'multipleChoiceCtrl'
  })

  .state('menu.multipleChoice2', {
    url: '/multiple_choice2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/multipleChoice2.html',
        controller: 'multipleChoice2Ctrl'
      }
    }
  })
    .state('fillin', {
      url: '/fillin',
      templateUrl: 'templates/fillin.html',
      controller: 'fillinCtrl'
    })
    .state('choose', {
      url: '/choose',
      templateUrl: 'templates/choose.html',
      controller: 'chooseCtrl'
    })
    .state('reward', {
      url: '/reward',
      templateUrl: 'templates/reward.html',
      controller: 'rewardCtrl'
    })
    //.state('user_profile', {
    //  url: '/user_profile',
    //  templateUrl: 'templates/user_profile.html',
    //  controller: 'user_profileCtrl'
    //})
    .state('menu.user_profile', {
      url: '/user_profile',
      views: {
        'side-menu21': {
          templateUrl: 'templates/user_profile.html',
          controller: 'user_profileCtrl'
        }
      }
    })



$urlRouterProvider.otherwise('/home')



});
