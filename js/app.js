'use strict';

/* --- Module --- */
const catApp = angular.module('catApp', []);

/* --- Controller --- */
catApp.controller('catAppController', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    /* --- Cats --- */
    $http.get('data/cats.json').then(function(response) {
        $scope.cats = response.data;

        // When the page first loads
        displayRandomCat();
        
        /* --- Cache Images --- */
        const images = [];

        const preloadImage = src => {
            const image = new Image();
            image.src = src;
            images.push(image);
        }

        const preloadImages = () => {
            for (const cat of $scope.cats) {
                preloadImage(cat.src);
            }
        }
        preloadImages();
    });
    
    const fadingDuration = 200;
    /* --- Dom element --- */
    const image = document.querySelector('.selected img');
    const colorInput = document.querySelector('.color');
    
    /* --- Functions --- */
    /* Generate Random Color --- */
    function generateRandomColor() {
        const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
        let color = '#';
        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * 16);
            color += characters[randomIndex];
        }
        return color;
    }
    
    /* Display random cat --- */
    function displayRandomCat() {
        const randomIndex = Math.floor(Math.random() * $scope.cats.length);
        
        // Show Clicks Count
        $scope.clicksVisible = true;
        
        // Select random cat to be displayed
        $scope.currentCat = $scope.cats[randomIndex];
    }
    
    /* Remove --- */
    $scope.removeAndReact = function(cat) {
        const remove = () => {
            const index = $scope.cats.indexOf(cat);
            $scope.cats.splice(index, 1);
        }
        
        if ($scope.currentCat === cat) {
            $scope.faded = true; // Fade Out
            
            // After Fading
            $timeout(function() {
                remove();
                displayRandomCat();
                
                // Remove Traces
                if ($scope.cats.length === 0) {
                    image.removeAttribute('src');
                    image.removeAttribute('alt');
                    $scope.clicksVisible = false;
                    $scope.padding = {padding: 0};
                }
                
                // Fade In
                $scope.faded = false;
            }, fadingDuration);
        } else {
            remove();
        }
    }
    
    /* Add --- */
    $scope.add = function() {
        // re-add padding to the list 
        $scope.padding = {padding: '.5em'};
              
        $scope.cats.push({
            name: ($scope.newCat.name)[0].toUpperCase() + ($scope.newCat.name).slice(1).toLowerCase(),
            src: $scope.newCat.src,
            // Set a random color if no (color/valid color) is set  
            color: (colorInput.style.color === '') ? generateRandomColor() 
                                                   : $scope.newCat.color,
            clicksCount: 0
        });
                
        // Show added cat
        $scope.faded = true; // Fade Out
        $timeout(function() {
            // Show clicks count if it was hidden after all cats have been deleted
            $scope.clicksVisible = true;
            
            $scope.currentCat = $scope.cats[$scope.cats.length - 1];
            $scope.faded = false; // Fade In
            
            // Close Form
            $scope.formVisible = false;
            $scope.plusMoved = false;
        }, fadingDuration);
        
        // Empty Inputs
        $scope.newCat.name = '';
        $scope.newCat.src = '';
        $scope.newCat.color = '';
    }
    
    /* Select --- */
    $scope.select = function(cat) {
        if ($scope.currentCat !== cat) {
            $scope.faded = true; // Fade Out

            // After the transition duration ends
            $timeout(function() {
                $scope.currentCat = cat;

                $scope.faded = false; // Fade In
            }, fadingDuration);
        }
    }
    
    /* Increment Clicks Count --- */
    $scope.incrementClicks = function() {
        $scope.currentCat.clicksCount++;
    }
    
    /* Pop Up Contact Form --- */
    $scope.toggleForm = function() {
        $scope.formVisible = ($scope.formVisible) ? false : true;
        $scope.plusMoved = ($scope.plusMoved) ? false : true;
    }
    
    /* Show Color Message --- */
    $scope.showColorMsg = function() {
        $scope.colorMsgVisible = true;
    }
    
    /* Hide Color Message --- */
    $scope.hideColorMsg = function() {
        $scope.colorMsgVisible = false;
    }
    
    /* Show Image Message --- */
    $scope.showImgMsg = function() {
        console.log('test');
        $scope.imgMsgVisible = true;
    }
    
    /* Hide Image Message --- */
    $scope.hideImgMsg = function() {
        $scope.imgMsgVisible = false;
    }
}]);


