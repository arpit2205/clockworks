let timerObj = {
            minutes: 0,
            seconds: 0,
            timerId: 0
}

function soundAlarm() {
        let alarm = new Audio("test.mp3")
        alarm.play()
        
    }

function updateValue(key, value) {
        if(value<0) {
            value = 0
            console.log('Positive number only')
        }

        if(key=="seconds") {
            if(value<10) {
                value = "0" + value
            }
        }

        if(value>59) {
            value = 59
        }

        $("#" + key).html(value || 0)
        timerObj[key] = value

    }

    //To declare and call a function automatically on the first time
    //Self-calling function
(function detectChanges(key) {
    console.log("detect change")

    let input = "#" + key + "-input"
    $(input).change(function() {
        updateValue(key, $(input).val())
        console.log(`$(input).val()`)
    })

    $(input).keyup(function() {
        updateValue(key, $(input).val())
    })

    return arguments.callee

})("minutes")("seconds")

function startTimer() {
    buttonManager(["start", false], ["stop", true], ["pause", true])
    freezeInput()

    timerObj.timerId = setInterval(function() {
        timerObj.seconds--
        if(timerObj.seconds<0) {
            if(timerObj.minutes == 0){
                soundAlarm()
                return stopTimer()
            }
            timerObj.seconds=59
            timerObj.minutes--
        }
        updateValue("minutes", timerObj.minutes)
        updateValue("seconds", timerObj.seconds)
    }, 1000)
}

function stopTimer() {
    clearInterval(timerObj.timerId) //To stop the upper setIntervale()
    buttonManager(["start", true], ["stop", false], ["pause", false])
    unfreezeInput()

    updateValue("minutes", $("#minutes-input").val())
    updateValue("seconds", $("#seconds-input").val())
}

function pauseTimer() {
    buttonManager(["start", true], ["stop", true], ["pause", false])
    clearInterval(timerObj.timerId)
}

// ... is a rest operator. We can pass n number of parameters while calling this function
// Those parameters are made into a list
function buttonManager(...buttonsArray) {
    for(let i=0; i<buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-btn"
        
        if(buttonsArray[i][1]) {
            $(button).removeAttr("disabled")
        } else {
            $(button).attr("disabled", "disabled")
        }
    }
}

function freezeInput() {
    $("#minutes-input").attr("disabled", "disabled")
    $("#seconds-input").attr("disabled", "disabled")
}

function unfreezeInput() {
    $("#minutes-input").removeAttr("disabled")
    $("#seconds-input").removeAttr("disabled")
}


//Current date
var d = new Date(); 
day = d.getDay()
if (day==0)
document.getElementById("day").innerHTML = "Sunday"
else if (day==1)
document.getElementById("day").innerHTML = "Monday"
else if (day==2)
document.getElementById("day").innerHTML = "Tuesday"
else if (day==3)
document.getElementById("day").innerHTML = "Wednesday"
else if (day==4)
document.getElementById("day").innerHTML = "Thursday"
else if (day==5)
document.getElementById("day").innerHTML = "Friday"
else if (day==6)
document.getElementById("day").innerHTML = "Saturday"

date = d.getDate()
month = d.getMonth()
year = d.getFullYear()

document.getElementById("date").innerHTML = date + '-' + month + '-' + year


