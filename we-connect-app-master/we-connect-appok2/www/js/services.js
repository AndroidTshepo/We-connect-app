angular.module('app.services', [])

.factory('BlankFactory', [function(){


}])

.service('BlankService', [function(){

}])

//Using the http request and a promise
//.factory('RegisterService', function($http, $q){
//
//    return {
//      register: function(signUpdata){
//        var action = 'register';
//
//        return $http.post('http://localhost/weconnectAPI/api.php',{params:{
//            'method':action,
//            'name':info.name,
//            'email':info.email,
//            'password':info.password}
//        })
//          .success(function(response){
//            console.log(response);
//          }).error(function(response){
//            console.log(response);
//          })
//
//      }
//    };
//
//  });

.factory('getCrowdName', function() {
		 var savedData = {}


		 function set(data) {
		   savedData = data;
		 }
		 function get() {
		  return savedData;
		 }

		 return {
		  set: set,
		  get: get
		 }

})

.factory('getQuestionDescription', function() {
		 var savedQuestionDescription = {}


		 function set(data) {
		   savedQuestionDescription = data;
		 }
		 function get() {
		  return savedQuestionDescription;
		 }

		 return {
		  set: set,
		  get: get
		 }

})

.factory('submitrowdSourceAnsers', function($http, $q){
    return {


        submit_answers: function(answers){
			console.log(answers);
			console.log( JSON.stringify(answers));
          var result = $q.defer();
		  var dta ="okkkkkkkk";
		     $http.post("http://localhost/weconnectAPI/submit_crowd_source.php", JSON.stringify(answers))
	          .success(function (data,status) {
				  result.resolve(data);
				  dta = data;
				  //return data;
	            //result.resolve(data[0]);
	         })
	          .error(function(status){
				   result.reject(status);
				  dta = status;
				  //return data;
				  //return data;

	          //result.reject(status);
	        });

		return result.promise;
            //return answers;
        }
    }
})


.factory('RegisterService', function ($http, $q){

  return {
    signups: function(personDetails){
      var action = 'register';

      return    $http({
        url: 'http://localhost/weconnectAPI/register.php',
        method: "POST",
        data: $.param({'method':action, 'name': personDetails.name, 'last_name': personDetails.last_name,'phone_n':personDetails.phone_n,'user_account_no':personDetails.user_account_no,'user_card_no':personDetails.user_card_no, 'password': personDetails.password}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      })
        .success(function(response)
        {
          console.log(response);

        }).error(function (response)
        {
          console.log(response);
        });
    }
  };
})
//log in service

.factory('LoginService', function ($http, $q){

  return {
    Login: function(userDetails){
      var action = 'login';
  var result = $q.defer();
      $http.post("http://localhost/weconnectAPI/login_in.php",userDetails).success(function (data,status) {
				  result.resolve(data);
				  dta = data;
				  //return data;
	            //result.resolve(data[0]);
	         })
	          .error(function(status){
				   result.reject(status);
				  dta = status;
				  //return data;
				  //return data;

	          //result.reject(status);
	        });

		return result.promise;
    }
  };
});



