<<<<<<< HEAD
const catApp = angular.module('catApp', []);

/* --- Controller --- */
catApp.controller('catAppController', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    /* --- Cats --- */
    $http.get('data/cats.json').then(function(response) {
        $scope.cats = response.data;

        // When the page first loads
        displayRandomCat();
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
=======
'use strict';

/* --- Page Current Viewed Cat --- */
let currentCat;

/* --- Dom Elements --- */
const catsNamesList = document.querySelector('.cats-list'),
      catView = {
          container: document.querySelector('.cat'),
          clicksCount: document.querySelector('.clicks-record'),
          name: document.querySelector('.name'),
          image: document.querySelector('.cat-image'),
          
          empty() {
              this.clicksCount.classList.remove('show');
              this.clicksCount.textContent = '';
              this.name.textContent = '';
              this.image.removeAttribute('src');
          }
      },
      addCatForm = document.querySelector('.add-cat'),
      addCatSign = document.querySelector('.add'),
      newCat = {
          nameInput: document.querySelector('.new-cat-name'),
          srcInput: document.querySelector('.new-cat-src'),
          colorInput: document.querySelector('.new-cat-color'),
          addBtn: document.querySelector('button'),
          colorMsg: document.querySelector('small'),
          
          emptyInputs() {
              this.nameInput.value = '';
              this.srcInput.value = '';
              this.colorInput.value = '';
          },
          
          resetColor() {
              this.colorInput.style.color = 'inherit';
          }
      };

/* --- Cat Class --- */
class Cat {
    constructor(color, name, src) {
        this.color = color;
        this.clicksCount = 0;
        this.name = name;
        this.src = src;
        this.listItem = `<li class="${(this.name).toLowerCase()}" style="color: ${this.color}">
                            <span class="cat-name">${this.name}</span>
                            <span class="remove fa fa-times" title="remove" aria-hidden="true"></span>
                        </li>`;
    }
    
    listCatName() {
        catsNamesList.insertAdjacentHTML('beforeEnd', this.listItem);
    }
    
    setColor() {
        catView.container.style.color = this.color;
        document.body.style.backgroundColor = this.color;
        addCatForm.style.color = this.color;
        newCat.addBtn.style.backgroundColor = this.color;
        addCatSign.style.color = this.color;
>>>>>>> c2f391a779de04a08dd4dc99d74fc6bae9a84d48
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
        $scope.faded = true; // Fade Out
        
        // After the transition duration ends
        $timeout(function() {
            $scope.currentCat = cat;
            
            $scope.faded = false; // Fade In
        }, fadingDuration)
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
    
<<<<<<< HEAD
    /* Show Message --- */
    $scope.showMsg = function() {
        $scope.msgVisible = true;
=======
    if (nameOrXClicked) {
        const catLi = event.target.parentElement,
              clickedCatName = catLi.className; // Chloe
        
        switch (event.target.className) {
            // Select
            case 'cat-name':
                if (currentCat !== clickedCatName) {
                    currentCat = clickedCatName;
                    const catObject = cats.get(clickedCatName); // {color: "#C8CECE", clicksCount: 0, name: "Tom", src: "images/tom.png", listItem: "<li ..
                    fadeOutIn(catObject);
                }
                break;
            // Remove
            case 'remove fa fa-times':
                catLi.remove();
                cats.delete(clickedCatName);
                if (clickedCatName === currentCat) {
                    displayRandomCat();
                } 
                if (cats.size === 0) {
                    catView.empty()
                    document.body.style.backgroundColor = 'transparent';
                    catsNamesList.style.padding = 0;
                    addCatForm.style.color = 'grey';
                    newCat.addBtn.style.backgroundColor = 'grey';
                    addCatSign.style.color = 'grey';
                }  
        }
        
>>>>>>> c2f391a779de04a08dd4dc99d74fc6bae9a84d48
    }
    
    /* Hide Message --- */
    $scope.hideMsg = function() {
        $scope.msgVisible = false;
    }
}]);
