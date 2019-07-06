$(document).ready(function(){
    $("#container").fadeIn("slow");
        $("#navbar").slideDown("slow");

});
//INIZIO TO DO LIST
let task = JSON.parse(localStorage.getItem('task'));

function fetchTask() {
    if (task != null) {
        var taskResult = document.getElementById("lista");
        taskResult.innerHTML = "";

        for (var i = 0; i < task.length; i++) {
            var name = task[i].name;

            taskResult.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-center">' + name + '<a href="#" onclick="cls(' + [i] + ')" class="badge badge-danger badge-pill">X</a></li>';
        }
    }
}

fetchTask();

function cls(x) {
    task.splice(x, 1);
    localStorage.setItem('task', JSON.stringify(task));
    fetchTask()
}

document.getElementById("textArea").addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addNote();
    }
});

function addNote() {
    let valueNote = document.getElementById("textArea").value;
    if (valueNote == '') {
        showAlert()

    } else {

        var tasks = {
            name: valueNote
        }

        if (localStorage.getItem('task') == null) {
            task = [];
            task.push(tasks);
            localStorage.setItem('task', JSON.stringify(task));
        } else {
            task.push(tasks);
            localStorage.setItem('task', JSON.stringify(task));
        }
        fetchTask()
        document.getElementById("textArea").value = "";
    }
}

function reset() {
    localStorage.clear();
    document.getElementById("lista").innerHTML = '';
}

function showAlert() {
    document.getElementById("alert").innerHTML = '<div class="alert alert-danger fade show" role="alert">Devi inserire qualcosa!</div>';
    window.setTimeout(function () {
        $('.alert').alert('close');
    }, 2000);
}
//FINE TO DO LIST



//INIZIO RANDOM QUOTE GENERATOR
var quotes = [
            "\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>",
              "\"Either I will find a way, or I will make one.\"<br> - <small><em>Philip Sidney</em></small>",
              "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- <small><em>Thomas A. Edison</em></small>",
              "\"You are never too old to set another goal or to dream a new dream.\"<br>- <small><em>C.S Lewis</em></small>",
              "\"You will be required to do wrong no matter where you go. It is the basic condition of life, to be required to violate your own identity.\"<br>- <small><em>Philip K. Dick</em></small>",
             "\"I do know that the slickest way to lie is to tell the right amount of truth at the right time — and then shut up.\"<br>- <small><em>Jubal Harshaw</em></small>"
];

var randomNumber = Math.floor(Math.random() * quotes.length);
var str = quotes[randomNumber],
    i = 0,
    isTag,
    text;

(function type() {
    text = str.slice(0, ++i);
    if (text === str) return;

    document.getElementById('quoteDisplay').innerHTML = text;

    var char = text.slice(-1);
    if (char === '<') isTag = true;
    if (char === '>') isTag = false;

    if (isTag) return type();
    setTimeout(type, 30);
}());
//FINE RANDOM QUOTE GENERATOR




//INIZIO WEATHER
window.addEventListener("load", () => {
    let long;
    let lat;
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/4ae0ef56ae3043beb6cd7f5c7b754ea4/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        icon
                    } = data.currently;
                    let celsius = Math.round((temperature - 32) * (5 / 9));

                    temperatureDegree.textContent = celsius + "°";
                    locationTimezone.textContent = data.timezone;


                    setIcons(icon, document.querySelector(".icon"));
                })

        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "black"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})
//FINE WEATHER


//INIZIO RELAX TIME
let relax = document.getElementById("relax");
let btnSounds = relax.querySelectorAll('button');
let btnStop = document.getElementById("relaxFooter").querySelector('button');
let audio = relax.querySelectorAll('audio');
let y = 0;

while (y < audio.length) {
audio[y].loop = true;
    y++;
}
    

for (let i = 0; i < btnSounds.length; i++) {
    btnSounds[i].addEventListener("dblclick", function () {
        btnSounds[i].classList.toggle("btn-success");
        if (btnSounds[i].querySelector('.volume').style.display == "block") {
            btnSounds[i].querySelector('.volume').style.display = "none";
            btnSounds[i].querySelector('audio').pause();

        } else {
            btnSounds[i].querySelector('.volume').style.display = "block";
            btnSounds[i].querySelector('audio').play();

        }
        btnSounds[i].querySelector('.volume').addEventListener("click", function () {
            let currentVolume = btnSounds[i].querySelector('.volume').value / 100;
            btnSounds[i].querySelector('audio').volume = currentVolume;
        });
    });
}

btnStop.addEventListener("click", function () {
    for (i = 0; i < btnSounds.length; i++) {
        btnSounds[i].classList.remove("btn-success");
        btnSounds[i].querySelector('.volume').style.display = "none";
        btnSounds[i].querySelector('audio').pause();

    }
});
//FINE RELAX TIME

//INIZIO POMODORO
let pomMain = document.getElementById("pomodoro");
let pomFooter = document.getElementById("pomodoroFooter");
let pomTimer = document.getElementById("timer");
let pomStart = pomMain.querySelector("button");
let pomStop = pomMain.querySelector("button").nextElementSibling;

let totalSecond = 0;
let pomPause = false;
let pomLongPause = false;
let pomCounter = 0;

var pomAudio = new Audio('/audio/pom.mp3');
var pomStartAudio = new Audio('audio/pomstart.mp3');


pomStart.addEventListener("click", function () {

    if (totalSecond == 0) {
        timerVar = setInterval(countTimer, 1000);
    }


    function countTimer() {
        ++totalSecond;
        var minute = Math.floor(totalSecond / 60);
        var seconds = Math.floor(totalSecond % 60);
        pomTimer.querySelector("li").innerHTML = minute;
        pomTimer.lastElementChild.innerHTML = seconds;

        //PAUSA LUNGA
        if (totalSecond == 1500 && pomCounter == 4) {
            totalSecond = 0;
            pomTimer.querySelector("li").innerHTML = "00";
            pomTimer.lastElementChild.innerHTML = "00";
            pomLongPause = true;
            pomCounter = 0;
            console.log("pausa lunga")

            //AGGIUNGI POMODORO
        } else if (totalSecond == 1499 && pomPause == false && pomCounter != 4) {
            pomFooter.innerHTML += '<span class="badge badge-pill badge-primary"><img src="/img/apple.svg" width="16" height="16"></span>';
            pomCounter++;
            pomAudio.play();


            //FINE PAUSA LUNGA
        } else if (totalSecond >= 1200 && pomLongPause == true) {
            totalSecond = 0;
            pomTimer.querySelector("li").innerHTML = "00";
            pomTimer.lastElementChild.innerHTML = "00";
            pomLongPause = false;
            console.log("fine pausa lunga")
            pomStartAudio.play();

            //INIZIO PAUSA 5 MIN
        } else if (totalSecond == 1500 && pomPause == false && pomLongPause == false) {
            totalSecond = 0;
            pomTimer.querySelector("li").innerHTML = "00";
            pomTimer.lastElementChild.innerHTML = "00";
            pomPause = true;
            console.log("pausa")

            //FINE PAUSA 5 MIN
        } else if (totalSecond >= 300 && pomPause == true) {
            totalSecond = 0;
            pomTimer.querySelector("li").innerHTML = "00";
            pomTimer.lastElementChild.innerHTML = "00";
            pomPause = false;
            console.log("fine pausa inizio altro pom")
            pomStartAudio.play();


        }
    }
})


pomStop.addEventListener("click", function () {
    clearInterval(timerVar);
    totalSecond = 0;
    pomCounter = 0;
    pomTimer.querySelector("li").innerHTML = "00";
    pomTimer.lastElementChild.innerHTML = "00";
    pomPause = false;
    pomLongPause = false;
    pomFooter.innerHTML = '';
})
//FINE POMODORO
