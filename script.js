let requestURL = '/data.json';

let request = new XMLHttpRequest();
let w = 'weekly';

request.open ('GET', requestURL);

request.responseType = 'json';
request.send();

const data = () => {
    return request.response;
}

const daily = (timeFrame) => {

    const title = document.querySelectorAll('.title');
    const current = document.querySelectorAll('.current');
    const previous = document.querySelectorAll('.previous');
    
    for (let index = 0; index < title.length; index++) {
        
        const titleName = data()[index].title;
        
        const currentHrs = 
        (timeFrame==="daily"? data()[index].timeframes.daily.current:
        (timeFrame==="weekly"? data()[index].timeframes.weekly.current:
        data()[index].timeframes.monthly.current));
        
        const previousHrs = 
        (timeFrame==="daily"? data()[index].timeframes.daily.previous:
        (timeFrame=="weekly"? data()[index].timeframes.weekly.previous:
        data()[index].timeframes.monthly.previous));

        title[index].textContent = titleName;
        current[index].textContent = `${currentHrs}hrs`;
        previous[index].textContent = `Last week - ${previousHrs}hrs`;
    }
}

const times = document.querySelector('.times');
times.addEventListener('click', () => {
    const timeFrames = document.querySelectorAll('.time-frames');

    const q = event.target.classList[0]

    if (q == "time-frames") {

    timeFrames.forEach((time) => {

        time.classList.remove('active');
    })

    event.target.classList.add('active');
    w = event.target.textContent.toLocaleLowerCase();
    
    
    daily(w);
}})

window.onload = () => {
    daily(w);
}
