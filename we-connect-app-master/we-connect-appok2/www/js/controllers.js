angular.module('app.controllers', ['ngCordova'])

  .controller('categoryCtrl', function ($scope) {

  })

  .controller('menuCtrl', function ($scope,$state) {
      function ContentController($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
          $ionicSideMenuDelegate.toggleLeft();
        };
      }

    //soccer new feeds          //------------------------
    $scope.soccerlist =  function(){
      $state.go('menu/soccerList');
    }

    // go to business template  //------------------------
    $scope.business =  function(){
      $state.go('menu/business');
    }

    $scope.profile = function(){
      $state.go('menu/user_profile');
    }

  })

  .controller('cartCtrl', function ($scope) {

  })
  .controller('rewardCtrl', function ($scope,$ionicPopup,$state) {

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'choose reward',
        template: '<ion-radio>Vodacom</ion-radio><ion-radio>MTN</ion-radio><ion-radio>Cell C</ion-radio> <div class="spacer" style="height: 20px;"></div><input type="number" maxlength="5"  placeholder="add phone number">',
        buttons: [
          {text: 'Submit',class:'btn positive',ngClick:$state.go('menu.app_menu')}
        ]
      });
    }

    $scope.showAlert1 = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'choose reward',
        template: '<ion-radio>Vodacom data</ion-radio><ion-radio>MTN</ion-radio><ion-radio>Cell C</ion-radio> <div class="spacer" style="height: 20px;"></div><input type="number" maxlength="5"  placeholder="add phone number">',
        buttons: [
          {text: 'Submit',class:'btn positive',ngClick:$state.go('menu.app_menu')}
        ]
      });
    }

    $scope.showAlert2 = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'choose reward',
        template: '<input type="number" placeholder="Meter Number"> <div class="spacer" style="height: 20px;"></div><input type="number" maxlength="5"  placeholder="add phone number">',
        buttons: [
          {text: 'Submit',class:'btn positive',ngClick:$state.go('menu.app_menu')}
        ]
      });

    }


  })


  .controller('listCrowdSourceCtrl', function ($scope,$http,$state,getCrowdName,getQuestionDescription,submitrowdSourceAnsers) {

    $scope.back = function(){
      $state.go('menu.app_menu');
    }
    $scope.boxClass =false;
    //starting the rating stuff

    $(function() {

      $("#rating_star_text").codexworld_rating_widget({
        starLength: '5',
        initialValue: '',
        callbackFunctionName: 'processRating',
        imageDirectory: 'images/',
        inputAttr: 'postID'
      });

      $("#rating_star_image").codexworld_rating_widget({
        starLength: '5',
        initialValue: '',
        callbackFunctionName: 'processRating',
        imageDirectory: 'images/',
        inputAttr: 'postID'
      });


      $("#rating_star_choose_Multiple_picture").codexworld_rating_widget({
        starLength: '5',
        initialValue: '',
        callbackFunctionName: 'processRating',
        imageDirectory: 'images/',
        inputAttr: 'postID'
      });

      $("#rating_star_choose_one_picture").codexworld_rating_widget({
        starLength: '5',
        initialValue: '',
        callbackFunctionName: 'processRating',
        imageDirectory: 'images/',
        inputAttr: 'postID'
      });

    });


    //e the rating stuff

    $scope.info = {
      name: undefined,
      email: undefined,
      password: undefined
    }

//
//console.log(localStorage.useridd);


    //var data =  {name: $scope.info.name, email: $scope.info.email, password: $scope.info.password}

    var data =  {"data":{user_id: localStorage.userid}};
    console.log("Arry", data);
////sending my  array to the backend
    $http.post("http://localhost/weconnectAPI/login.php",data).success(function (response) {
      $scope.crowdname=[];
      console.log(response);
      $scope.optionDescription = [];
      //var options=[];

      for (var i =0; i< response.length;i++){
        $scope.crowdname.push(response[i].crowd_source_name);
      }

      $scope.storeCrowdSourceNAme= function(crowdSourceNameParam){
        getCrowdName.set(crowdSourceNameParam);
        // console.log(crowdSourceNameParam);
        //console.log(getCrowdName.get(crowdSourceNameParam));
        $state.go('multipleChoice');
      }
      //$scope.startcs= function(crowdSourceNameParam){
      //  getCrowdName.set(crowdSourceNameParam);
      //}

      $scope.id = 0;
	  $scope.inProgress = true;
      $scope.crowdSourceDone= false;
      $scope.start = function() {
        $scope.id = 0;
        $scope.quizOver = false;
		$scope.inProgress = false;
        
        


        //the question types

        $scope.multileChoiceQuestOne= false;
        $scope.multileChoiceQuestMutiple= false;
        $scope.rate_question_text= false;
        $scope.true_false_question= false;
        $scope.choose_One_picture_question= false;
        $scope.choose_Multiple_picture_question= false;
        $scope.rate_question_image= false;

        $scope.getAllQuestion($scope.id);


        //console.log("clicked");
      };


      $scope.getAllQuestion= function(id){
		  console.log(id);
		  console.log(response);
		 
        var get_Crowd_name= getCrowdName.get();
        //console.log(getCrowdName.get());
        for (var i =0; i< response.length;i++){

          if (get_Crowd_name == response[i].crowd_source_name){
            var questions = response[i].crowd_source_questions;
			 console.log(questions.length);
            $scope.questionDescription=[];

            if(id < questions.length){
              $scope.questionDescription =questions[id];
              var questionOptions = questions[id].question_options;
              $scope.options=[];
              for (var o =0; o< questionOptions.length;o++){
                $scope.options.push(questionOptions[o]);
                //console.log($scope.options);
              }
              $scope.optionSelection={o};

              // console.log($scope.options);
              //console.log($scope.options);
              if (questions[id].question_type == "multileChoiceQuestOne"){
                $scope.multileChoiceQuestOne= true;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= false;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= false;
                //console.log($scope.multileChoiceQuestOne);
              }else if (questions[id].question_type == "multileChoiceQuestMutiple"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= true;
                $scope.rate_question_text= false;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= false;
                //console.log($scope.multileChoiceQuestMutiple);
              }else if (questions[id].question_type == "rate_question_text"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= true;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= false;
                //console.log($scope.rate_question_text);
              }else if (questions[id].question_type == "true_false_question"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= false;
                $scope.true_false_question= true;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= false;
                // console.log($scope.true_false_question);
              }else if (questions[id].question_type == "choose_One_picture_question"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= false;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= true;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= false;
                // console.log($scope.choose_One_picture_question);
              }else if (questions[id].question_type == "choose_Multiple_picture_question"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= false;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= true;
                $scope.rate_question_image= false;
                //console.log($scope.choose_Multiple_picture_question);
              }else if (questions[id].question_type == "rate_question_image"){
                $scope.multileChoiceQuestOne= false;
                $scope.multileChoiceQuestMutiple= false;
                $scope.rate_question_text= false;
                $scope.true_false_question= false;
                $scope.choose_One_picture_question= false;
                $scope.choose_Multiple_picture_question= false;
                $scope.rate_question_image= true;
                //console.log($scope.rate_question_image);
              }
              //console.log($scope.questionDescription);
            }else{
              $scope.crowdSourceDone= true;
              $scope.inProgress= false;
			  console.log("test");
              //console.log($scope.crowdSourceDone);
            }

          }
        }
      }


      $scope.otherfunction = function(whatever) {
        //console.log("another function :"  + whatever);
      }
      $scope.choices = {};
      //console.log("okoko "+$scope.selected.options);

      $scope.option= 0;
      $scope.userQuestionOptionChoice=[];
      $scope.userQuestionOptionChoiceForRate=[];


      $scope.handleRadioClick = function(optionId, question_id){
        //console.log("option id : "+optionId +"  question_id :"+ question_id);
        $scope.option = optionId;
        var otherQuestionOption = {"option_id":optionId ,"question_id":question_id};
        $scope.userQuestionOptionChoice.push(otherQuestionOption);
        //console.log($scope.userQuestionOptionChoice);
        //return questionOption;
      }

      $scope.userCrowdourceDetailsInfo =
        [
          {
            "user_id": localStorage.userid,
            "crowd_source_description": getCrowdName.get()
          }
        ];

      $scope.nextQuestion = function(question_id,question_type) {
        $scope.id++;
        $scope.getAllQuestion($scope.id);
        //console.log("the rating number is "+ question_type);
        //console.log("the rating number is "+ $scope.choice);
        //console.log($scope.otherfunction());
        //console.log("saved option :"+ $scope.option);
        var raisonForchoice= "";
        if (question_type == "rate_question_text"){
          raisonForchoice = document.getElementById("raisonForchoice_rate_question_text").value;
        }else if(question_type == "rate_question_image"){
          raisonForchoice = document.getElementById("raisonForchoice_rate_question_image").value;
        }else if(question_type == "choose_Multiple_picture_question"){
          raisonForchoice = document.getElementById("raisonForchoice_rate_choose_Multiple_picture_question").value;
        }else if(question_type == "choose_One_picture_question"){
          raisonForchoice = document.getElementById("raisonForchoice_choose_One_picture_question").value;
        }else if(question_type == "multileChoiceQuestOne"){
          raisonForchoice = document.getElementById("raisonForchoice_multileChoiceQuestOne").value;
        }else if(question_type == "multileChoiceQuestMutiple"){
          raisonForchoice = document.getElementById("raisonForchoice_multileChoiceQuestMutiple").value;
        }else if(question_type == "true_false_question"){
          raisonForchoice = document.getElementById("raisonForchoice_true_false_question").value;
        }


        console.log("true or false value :"+ raisonForchoice);
        if(question_type == "rate_question_text" || question_type == "rate_question_image"){
          var rateQuestionOption = {"rated":getRatingNumber ,"question_id":question_id};
          $scope.userQuestionOptionChoiceForRate.push(rateQuestionOption);

          var rateKeys = [];
          for (var s =0; s< $scope.userQuestionOptionChoiceForRate.length;s++){
            rateKeys= $scope.userQuestionOptionChoiceForRate[s];
          }
          rateKeys['raison_for_choice']	= raisonForchoice;
          $scope.userCrowdourceDetailsInfo.push(rateKeys);
        }else{
          var keys = [];
          for (var v =0; v< $scope.userQuestionOptionChoice.length;v++){
            keys= $scope.userQuestionOptionChoice[v];
          }
          keys['raison_for_choice']	= raisonForchoice;
          console.log(keys);
          $scope.userCrowdourceDetailsInfo.push(keys);
        }
        //console.log($scope.userCrowdourceDetailsInfo);
      }


      $scope.sumitCrowdSourceAnwsers = function() {
        var promise = submitrowdSourceAnsers.submit_answers($scope.userCrowdourceDetailsInfo);
        promise.then(function(data){
          console.log("got it: ");
          console.log(data);
        },function(error){});

        //console.log("This is what is ready to go back to the API :");


        console.log($scope.userCrowdourceDetailsInfo);
        $state.go('reward');
      }

    }).error(function (error) {
      console.error(error);
    })

    $scope.boxClass = false;

  })

  .controller('cloudCtrl', function ($scope) {

  })
  .controller('locateabsaCtrl', function ($scope, $ionicLoading, $compile,$cordovaGeolocation) {

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      console.log('location'+latLng);
    }, function (error) {
      console.log("Could not get location");
    });



    //get direction ---------------------------------------------------------------------------------
    $scope.init = function(){

      var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      $scope.map = map;
    };

    // google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };

  })

  .controller('locateshopCtrl', function ($scope,$ionicLoading, $compile,$cordovaGeolocation) {

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      console.log('location'+latLng);
    }, function (error) {
      console.log("Could not get location");
    });


    $scope.init = function() {
      var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      $scope.map = map;
    };

    // google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };

  })

  .controller('questionlistCtrl', function ($scope,$state, $http,$ionicPopup) {

    //Modal code to display data from the api
    $scope.questionPopup = function (post) {
      //alert("Ok i am hit");
      $scope.data = {};

      console.log(post);


      // An elaborate, custom popup
      var myPopup =  $ionicPopup.prompt({
        title: 'Please answer',
        template: 'how is our service?',
        inputType: 'radio',
        inputType: 'radio',
        text: 'good',
        text: 'bad'
      }).then(function(res) {
        console.log('Your password is', res);
      });

      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });

    };


    })


  .controller('app_menuCtrl', function ($scope,$state,$ionicPopup,$ionicLoading) {

    $ionicLoading.hide('3000');


    //menu to select question category//------------------------
    $scope.listCrowdSource = function () {
      $state.go('listCrowdSource');
    }

    //locate absa atm           //------------------------
    $scope.locateAbsa = function () {
      $state.go('menu.locateabsa');
    }

    //locate absa partner shop  //------------------------
    $scope.locateshop = function () {
      $state.go('menu.locateshop');
    }

    $scope.aboutus = function(){

      var alertPopup = $ionicPopup.alert({
        title: 'choose reward',
        template: '<p>This is a barclays app created to source information about services and products we offer,this app aims engage users with interactive questions. ohh! and users get rewarded for their participation  </p>',
        buttons: [
          {text: 'Exit',class:'btn positive'}
        ]
      });

    }
  })

  .controller('crowdSourceCtrl', function ($scope,$state) {



  })
 .controller('loginCtrl', function ($scope,$state,$ionicLoading,LoginService) {

    $scope.loginInfo = {
      username: undefined,
      password: undefined
    }


    //var data =  {name: $scope.loginInfo.username, email: $scope.loginInfo.password}


    //console.log("Arry", data);
//sending my  array to the backend



    $scope.Login = function(userdetails){
		 var data =  {"data":{action:"login",username: userdetails.username, password: userdetails.password}};

	console.log(data);
         var promise = LoginService.Login(data);
		 $scope.showloading = function(){
          $ionicLoading.show({
            template:'verifiying....'
          })
       $state.go('home');
        }

        promise.then(function(response){
          console.log("got it: ");
          console.log(response);

		  if (response != false){
			   //$state.go('home');
			    $state.go('menu.app_menu');
				localStorage.userid = response;
				$state.transitionTo('menu.app_menu', {}, {reload: true,inherit: false,notify: true});
		  }else{
			   console.log("passed");
			  //console.log(localStorage.userid);
			  //response = localStorage.userid ;
	          //$state.transitionTo('app_menu', {}, {reload: true,inherit: false,notify: true});



		  }


        },function(error){});



    };
//$state.go('menu.app_menu')
  })





.controller('signupCtrl', function($scope, RegisterService,$state,$ionicPopup)
{

  $scope.back = function(){
    $state.go('login');
  }


  $scope.info = {
    name: undefined,
    last_name: undefined,
    password: undefined,
    phone_n:undefined,
    user_account_no:undefined,
    user_card_no:undefined


  }

  $scope.signup = function(){

    var personDetails = {name: $scope.info.name, last_name: $scope.info.last_name,phone_n: $scope.info.phone_n,user_account_no: $scope.info.user_account_no,user_card_no: $scope.info.user_card_no, password: $scope.info.password};
   console.log("------------------");
    console.log(personDetails);
    console.log("------------------");
    var alertPopup = $ionicPopup.alert({
      title: 'Confirm Password',
      template: '<input type="password">',
      buttons: [
        {text: 'confirm',class:'btn positive'}
      ]
    });

    RegisterService.signups(personDetails)
      .then(function (response){
        console.log(response);
        console.log("Person successfully Added.");
        $scope.message = "Person successfully Added.";
        $scope.name = "";
        $scope.last_name = "";
        $scope.phone_n = "";
        $scope.user_account_no = "";
        $scope.user_card_no = "";
        $scope.password = "";


        //:name,:last_name,:phone_n,:user_account_no,:user_card_no,:password
      });
  };

})


  .controller('recoverPasswordCtrl', function ($scope) {


  })

  .controller('soccerNewsCtrl', function ($scope,$state, $http) {




  })

  .controller('rugbyNewsCtrl', function ($scope) {

  })

  .controller('soccerListCtrl', function ($scope,$state, $http, $ionicPopup) {

    $scope.posts = [];

    // set the feed url
    var url = "http://feeds.24.com/articles/sport/featured/topstories/rss";
    // set the url to google, to convert the cml feed to json
    var google_converter = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";

    // start the request
    var request = $http.jsonp(google_converter + encodeURIComponent(url));
    // after the request is successful
    request.success(function (res) {
      // pass the requested entries to the view
      $scope.posts = res.responseData.feed.entries;

      console.log(res);


    });

    //Modal code to display data from the api
    $scope.showPopup = function (post) {
      //alert("Ok i am hit");
      $scope.data = {};

      console.log(post);


      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: post.title,
        template: post.content+''+ post.publishedDate,
        scope: $scope,
        buttons: [
          {text: 'Cancel'},


        ]
      });

      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });

    };


  })

  .controller('rugbyListCtrl', function ($scope) {

  })


  .controller('businessCtrl', function ($scope,$state, $http, $ionicPopup) {
    $scope.posts = [];

    // set the feed url
    var url = "http://feeds.fin24.com/articles/Fin24/News/rss";
    // set the url to google, to convert the cml feed to json
    var google_converter = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";

    // start the request
    var request = $http.jsonp(google_converter + encodeURIComponent(url));
    // after the request is successful
    request.success(function (res) {
      // pass the requested entries to the view
      $scope.posts = res.responseData.feed.entries;

      console.log(res);


    });

    //Modal code to display data from the api
    $scope.showPopup = function (post) {
      $scope.data = {};

      console.log(post);


      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: post.title,
        template: post.content+''+ post.publishedDate,
        scope: $scope,
        buttons: [
          {text: 'Cancel'},


        ]
      });

      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });

    };
  })

  .controller('multipleChoiceCtrl', function ($scope) {

  })
  .controller('user_profileCtrl', function ($scope) {

  })
  .controller('multipleChoice2Ctrl', function ($scope) {

  })
