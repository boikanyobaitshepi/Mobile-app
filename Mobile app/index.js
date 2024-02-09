import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-c755b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const groceryListInDB = ref(database, "groceryList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const groceryListEl = document.getElementById("grocery-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(groceryListInDB, inputValue);
    clearInputFieldEl()
});

onValue(groceryListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearGroceryListEl();


        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemToGrocerylistEl(currentItem);
        }
    } else {
        groceryListEl.innerHTML = "Your list is Empty";
    }
});

function clearGroceryListEl() {
    groceryListEl.innerHTML = "";  
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}  

function appendItemToGrocerylistEl(currentItem) {
    let itemID = currentItem[0];
    let itemValue = currentItem[1];
    
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `groceryList/${itemID}`);
        remove(exactLocationOfItemInDB);
    });

    groceryListEl.appendChild(newEl);
}

// Get the user's name
const name = prompt("what is your name?");

//  welcome message
const welcomeMessage = (`Welcome To my app,${name}! `);

//Display welcome messsage
alert(`welcome ${name} My name is Boikanyo Silabel lets make a list`);