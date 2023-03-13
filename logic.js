let daily = document.getElementById('daily');
let weekly = document.getElementById('weekly');
let monthly = document.getElementById('monthly');

let array = ['daily', 'weekly', 'monthly'];

async function getData(type){
    let response = await fetch('data.json');
    //The data of json will be recieved in JSON format, json() function will convert the data into javascript
    //objects format.
    let data = await response.json();
    Array.from(data).forEach((element) => {
        let title = element["title"];
        title = title.toLowerCase();
        if(title=="self care") title = "self-care";
        let timeframes = element["timeframes"];
        let currentTimeElement = "current-time-" + title;
        let previousTimeElement = "previous-time-" + title;
        let currentTime = document.getElementById(currentTimeElement);
        let previousTime = document.getElementById(previousTimeElement);
        let currentHours = timeframes[type].current + "hrs";
        let previousHours = timeframes[type].previous + "hrs";

        let calendarType;
        if(type=="daily") calendarType = "day";
        else if(type=="monthly") calendarType = "month";
        else calendarType = "week";

        currentTime.innerText = currentHours;
        previousTime.innerText = "Last " + calendarType + " - " + previousHours;
    });
}

window.onload = () =>{
    getData("daily");
};

array.forEach((element) => {
    let getElement = document.getElementById(element);
    getElement.addEventListener('click', ()=>{
        getData(element);
        array.forEach((element) => {
            let getElem = document.getElementById(element);
            getElem.style.color = 'hsl(236, 100%, 87%)';
        });
        getElement.style.color = 'white';
    });
});