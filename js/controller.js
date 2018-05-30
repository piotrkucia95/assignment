angular.module('newApp').controller('tableController', function($scope, dataFactory, $cookies) {
    
    //loading data from cookies
    $scope.tasks = $cookies.getObject('taskCookie');
    $scope.totalTasks = $cookies.get('taskLengthCookie');
    
    //if data wasn't loaded from cookies, it's loaded from local data.JSON file
    if(!$scope.tasks){
        dataFactory.getJSON().success(function(data) {
            $scope.tasks = data;
            $scope.totalTasks = $scope.tasks.length;
            $cookies.putObject('taskCookie', $scope.tasks);
            $cookies.put('taskLengthCookie', $scope.totalTasks);
        }).error(function(error) {
            console.log(error);
        });
    }
    
    //this function transforms date data into string specyfing the priority of task
    $scope.getPriority = function(date) {
        var parts = date.split('-');
        var myDate = new Date(parts[0], parts[1]-1 , parts[2]);
        var today = new Date();
        
        var dateDifference = 365*myDate.getFullYear() + 31*myDate.getMonth() + myDate.getDate() - 365*today.getFullYear() - 31*today.getMonth() - today.getDate();
        
        if (dateDifference < 2) return "High";
        else if (dateDifference < 5) return "Medium";
        else return "Low";
    };
    
    //sorting variables
    $scope.sortType = '';
    $scope.sortReverse = true;
    
    //pagination variables
    $scope.viewby = 5;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;

    //this function allows to show different number of rows of the table
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }
    
    //this function returns string specyfiing which page user is on
    $scope.countPages = function() {
        var firstPage = (($scope.currentPage-1)*$scope.itemsPerPage)+1;
        if ($scope.totalTasks == 0) firstPage = 0;
        var lastPage = $scope.currentPage*$scope.itemsPerPage;
        if (lastPage > $scope.totalTasks) lastPage = $scope.totalTasks;
        return firstPage +" - " +lastPage +" of " +$scope.totalTasks;
    }
    
    //gets next page of table
    $scope.prevPage = function() {
        if($scope.currentPage == 1) return;
        $scope.currentPage = $scope.currentPage-1;
    }
    
    //gets previous page of table
    $scope.nextPage = function() {
        if(($scope.currentPage*$scope.itemsPerPage) >= $scope.totalTasks) return;
        $scope.currentPage = $scope.currentPage+1;
    }
    
    //add-remove row flags
    $scope.removeFlag = false;
    $scope.addFlag = false;
    
    //this function removes row out of the table
    $scope.removeRow = function($index) {
        if($scope.totalTasks == 0) return;
        var lastPage = $scope.currentPage*$scope.itemsPerPage;
        if (lastPage > $scope.totalTasks) lastPage = $scope.totalTasks;
        var rmIndex = lastPage-$index-1;
        $scope.tasks.splice(rmIndex, 1);
        $scope.totalTasks--;
        $cookies.putObject('taskCookie', $scope.tasks);
        $cookies.putObject('taskLengthCookie', $scope.totalTasks);
    };
    
    //this function adds row into the table
    $scope.addRow = function() {
        if (!$scope.taskName) return;
        if (!$scope.taskDate) return;
        var validFormat = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
        if(!validFormat.test($scope.taskDate)) {
            alert("Wrong date format!");
            return;
        }
        $scope.tasks.splice($scope.totalTasks, 0, {
            task: $scope.taskName,
            deadline: $scope.taskDate,
            done: false
        });
        $scope.totalTasks++;
        $cookies.putObject('taskCookie', $scope.tasks);
        $cookies.putObject('taskLengthCookie', $scope.totalTasks);
    };
    
    //this function allows to mark a task as done
    $scope.taskDone = function($index) {
        var lastPage = $scope.currentPage*$scope.itemsPerPage;
        if (lastPage > $scope.totalTasks) lastPage = $scope.totalTasks;
        var doneIndex = lastPage-$index-1;
        if($scope.tasks[doneIndex].done==false) $scope.tasks[doneIndex].done = true;
        else $scope.tasks[doneIndex].done = false;
        $cookies.putObject('taskCookie', $scope.tasks);
    };  
                                    
});
