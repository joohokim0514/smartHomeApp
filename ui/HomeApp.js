var indexPage;
var signinPage;
var createAccountPage;
var securityPage;
var utilitiesPage;
var main;
var signinButton;
var createAccountButton;
var logoutButton;
var signin;
var createAccount;
var securityButton;
var utilitiesButton;
var user = {
    username: "",
    password: ""
}

var autoTemp;
var acSwitch;
var autoSwitch;
var lightSwitch;
var autoOffButton;
var danger;

var alarmSwitch;
var lockButton;
var unlockButton;
var lockIcon;
var unlockIcon;
var doorText;

//declares functions for navigation
function navigateToSigninPage(event) {
    indexPage.style.display = "none";
    signinPage.style.display = "block";
}

function navigateToCreateAccountPage(event) {
    indexPage.style.display = "none";
    createAccountPage.style.display = "block";
}

function navigateToSecurityPageFromSignin(event) {
    user.username = document.getElementById("signinUsername").value;
    document.getElementById("welcomeUser").innerHTML = "Welcome " + user.username;  
    signinPage.style.display = "none";
    main.style.display = "block";
    securityButton.style.fontWeight = "bold";
    utilitiesPage.style.display = "none"; 
    lockButton.disabled = true;
    autoTemp.style.display = "none";
    unlockIcon.style.display = "none";
    document.getElementById("signinUsername").value = "";
    document.getElementById("signinPassword").value = "";
}

function navigateToSecurityPageFromCreateAccount(event) {
    user.username = document.getElementById("createAccountUsername").value;
    document.getElementById("welcomeUser").innerHTML = "Welcome " + user.username;  
    createAccountPage.style.display = "none";
    main.style.display = "block";
    securityButton.style.fontWeight = "bold";
    utilitiesPage.style.display = "none"; 
    lockButton.disabled = true;
    autoTemp.style.display = "none";
    unlockIcon.style.display = "none";
    document.getElementById("createAccountUsername").value = "";
    document.getElementById("createAccountPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

//declares functions for security
function logout(event) {
    indexPage.style.display = "block";
    signinPage.style.display = "none";
    createAccountPage.style.display = "none";
    securityPage.style.display = "block";
    utilitiesPage.style.display = "block";
    main.style.display = "none";
    securityButton.style.fontWeight = "normal";
    utilitiesButton.style.fontWeight = "normal";
}

function navigateToSecurity(event) {
    securityPage.style.display = "block";
    utilitiesPage.style.display = "none";
    securityButton.style.fontWeight = "bold";
    utilitiesButton.style.fontWeight = "normal";
}

function navigateToUtilities(event) {
    utilitiesPage.style.display = "block";
    securityPage.style.display = "none";
    utilitiesButton.style.fontWeight = "bold";
    securityButton.style.fontWeight = "normal";
}

//SECURITY
function lockDoor(event) {
    home.lock();
}

function unlockDoor(event) {
    home.unlock();
}

//Response for door
function doorStateResponse(newDoorState) {
    if(newDoorState=="LOCKED") {
        lockIcon.style.display = "block";
        unlockIcon.style.display = "none";
        lockButton.disabled = true;
        unlockButton.disabled = false;
        doorText.innerText = "Front Door: LOCKED";
    }
    else if(newDoorState=="UNLOCKED") {
        unlockIcon.style.display = "block";
        lockIcon.style.display = "none";
        lockButton.disabled = false;
        unlockButton.disabled = true;
        doorText.innerText = "Front Door: UNLOCKED";
    }
}

function toggleAlarm(event) {
    if(alarmSwitch.checked) {
        home.enableAlarm();
    }
    else {
        home.disableAlarm();
    }
}

//Response for alarm
function alarmStateResponse(newAlarmState) {
    if(newAlarmState=="ON") {
        alarmSwitch.checked = true;
    }
    else if(newAlarmState=="OFF") {
        alarmSwitch.checked = false;
    }
}

//UTILITIES
function toggleLight(event) {
    if(lightSwitch.checked) {
        home.lightOn();
    }
    else {
        home.lightOff();
    }
}

//Response for light
function lightStateResponse(newLightState) {
    if(newLightState=="ON") {
        lightSwitch.checked = true;
    }
    else if(newLightState=="OFF") {
        lightSwitch.checked = false;
    }
}

//air conditioning features
function toggleAC(event) {
    if(acSwitch.checked) {
        home.acOn();
    }
    else {
        home.acOff();
    }
}

function acStateResponse(newACState) {
    if(newACState=="ON") {
        acSwitch.checked = true;
    }
    else if(newACState=="OFF") {
        acSwitch.checked = false;
    }
}

function dangerResponse(newState) {
    if(newState=="YES") {
        danger.style.display = "block";
    }
    else {
        danger.style.display = "none";
    }
}

//air conditioning auto mode
function toggleAuto(event) {
    if(autoSwitch.checked) {
        home.enableAutoOff();
        autoTemp.style.display = "block";
    }
    else {
        home.disableAutoOff();
        autoTemp.style.display = "none"; 
    }
}

function setAutoOff() {
    var time = document.getElementById("autoOffTime").value;
    home.setAutoOffTime(time);
}

function autoOffTimeResponse(time) {
    autoOffTimeStatus.innerText = "Timer set to " + time + " seconds";
}

//sets everything once document is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    //declarations
    indexPage = document.getElementById("indexPage");
    signinPage = document.getElementById("signinPage");
    createAccountPage = document.getElementById("createAccountPage");
    securityPage = document.getElementById("securityPage");
    utilitiesPage = document.getElementById("utilitiesPage");
    main = document.getElementById("main");
    signinButton = document.getElementById("signinButton");
    createAccountButton = document.getElementById("createAccountButton");
    logoutButton = document.getElementById("logoutButton");
    signin = document.getElementById("signin");
    createAccount = document.getElementById("createAccount");
    securityButton = document.getElementById("securityButton");
    utilitiesButton = document.getElementById("utilitiesButton");
    danger = document.getElementById("danger");

    acSwitch = document.querySelector('input[id=acSwitch]');
    autoSwitch = document.querySelector('input[id=autoSwitch]');
    autoTemp = document.getElementById("autoTemp");
    lightSwitch = document.querySelector('input[id=lightSwitch]');
    alarmSwitch = document.querySelector('input[id=alarmSwitch]');
    lockButton = document.getElementById("lockButton");
    unlockButton = document.getElementById("unlockButton");
    lockIcon = document.getElementById("lockIcon");
    unlockIcon = document.getElementById("unlockIcon");
    doorText = document.getElementById("doorText");
    autoOffButton = document.getElementById("autoOffButton");

    //eventListeners UI
    signinButton.addEventListener("click", navigateToSigninPage);
    createAccountButton.addEventListener("click", navigateToCreateAccountPage);
    logoutButton.addEventListener("click", logout);
    signin.addEventListener("click", navigateToSecurityPageFromSignin);
    createAccount.addEventListener("click", navigateToSecurityPageFromCreateAccount);
    securityButton.addEventListener("click", navigateToSecurity);
    utilitiesButton.addEventListener("click", navigateToUtilities);

    //SECURITY
    lockButton.addEventListener("click", lockDoor);
    unlockButton.addEventListener("click", unlockDoor);
    alarmSwitch.addEventListener('change', toggleAlarm);

    //UTILITIES
    autoSwitch.addEventListener('change', toggleAuto);
    acSwitch.addEventListener('change', toggleAC);
    lightSwitch.addEventListener('change', toggleLight);
    autoOffButton.addEventListener('click', setAutoOff);

    //initialState
    signinPage.style.display = "none";
    createAccountPage.style.display = "none";
    main.style.display = "none";
    danger.style.display = "none";

    home.setup();
})
