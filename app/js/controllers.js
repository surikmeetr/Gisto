'use strict';
/* Controllers */

function listGistCtrl($scope, $http) {
    $http.get('http://localhost:3000/gists')
            .success(function(data) {
        $scope.gists = data;
    });
}

function singleGistCtrl($scope, $routeParams, $http) {
    $http.get('http://localhost:3000/gists/' + $routeParams.gistId)
            .success(function(data) {
        angular.forEach(data, function(item) {
            $scope.code = item[0];
        });
        $scope.single = data;
        console.log('code: ' + $scope.code);
    });
}

function CodeMirrorCtrl($scope) {
    $scope.codeMirrorModel = "$('#wizardForm').validate({\n        errorElement: \"em\",\n        errorPlacement: function(error, element) {\n            error.insertBefore(element);\n        }, \n        rules: {\n            'client_name': { \n                required: true, \n                minlength: 3 \n                },\n            'client_email': { \n                required: true, \n                email: true \n                },\n            'client_phone': {\n                required: true,\n                phoneNum :true\n                },\n            'client_address': {\n                required: true\n                },\n            'client_country': {\n                required: true\n                },\n            'client_email_notify_to': {\n                required: true\n            },\n            'first_name': {\n                required: true\n            },\n            'last_name': {\n                required: true\n            },\n            'company': {\n                required: true\n            },\n            'email': {\n                required: true, \n                email: true\n            },\n            'phone': {\n                required: true,\n                phoneNum :true \n            },\n            'password': {\n                required: true,\n                minlength: 7 \n            },\n            'password_again': {\n                equalTo: \"#password\"\n            }\n        }, \n        messages: {\n            'client_name': { \n                minlength: 'Client name field should be more than 3 chars!' \n                },\n            'client_email': { \n                email: 'Invalid e-mail!' \n                },\n            'client_phone': {\n                phoneNum: 'Invalid phone number!'\n            },\n            'email': { \n                email: 'Invalid e-mail!' \n                },\n            'phone': {\n                phoneNum: 'Invalid phone number!'\n            },\n            'password': {\n                minlength: 'Password should be more than 7 chars!'\n            },\n            'password_again': {\n                equalTo: 'Password do not match!'\n            }\n        }\n    });";
}

function commentsGistCtrl($scope, $routeParams, $http) {
    $http.get('http://localhost:3000/gists/comments/' + $routeParams.gistId)
            .success(function(data) {
        $scope.comments = data;
    });
}

function createGistCtrl($scope, $routeParams, $http) {
    $scope.save = function() {
        console.log([
            $scope.gistTitle,
            $scope.gistFileName,
            $scope.gistContent
        ]);
        var files = {};
        files[$scope.gistFileName] = {
            content: $scope.gistContent
        };
        var data = {
            description: $scope.gistTitle,
            public: false,
            files: files
        };
        $http.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.put['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
        $http.defaults.headers.put['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type';
        $http.post('http://localhost:3000/gists/create', data)
                .success(function(response) {
            window.location.href = "#/gist/" + response.id
        });
    }
}

