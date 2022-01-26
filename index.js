const url = `https://api.nasa.gov/planetary/apod?api_key=`
const subForm = document.getElementById('form-submit-api')
let saveCounter = 0;
subForm.addEventListener('submit', e => {
    e.preventDefault()
    const apiKey = document.getElementById('apiKey').value
    //fetch 10 photos from NASA API
    fetch(url + `${apiKey}` + '&count=10')
        .then(r => r.json())
        .then(arr => {
            showPhoto(arr[0])
            arr.forEach(renderPhoto)
        })
})
const dateForm = document.getElementById('form-pick-date')
dateForm.addEventListener('submit', e => {
    e.preventDefault()
    const requestDate = document.getElementById('end-date').value
    //fetch data for date entered
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${requestDate}&end_date=${requestDate}`)
        .then(r=>r.json())
        .then(data => {
            renderPhoto(data[0])
            showPhoto(data[0])
        })
})
//DELETE SAVED PHOTO ASPECTS
//STYLE THIS BAD BOY

function renderPhoto(obj) {
    if (obj.media_type = 'image') {
        console.log(obj)
        const newImg = document.createElement('img')
        const gallery = document.getElementById('gallery-section')
        //check for hdurl or url
        newImg.src = obj.url
        //set width in CSS
        newImg.style.width = "100px"
        newImg.style.height = "100px"
        newImg.alt = obj.title
        newImg.addEventListener('click', () => {
            showPhoto(obj)
        })
        gallery.appendChild(newImg)
    }
}

function showPhoto(obj) {
    //info needed:
    //explanation, date, url, title, 
    const photoDate = document.getElementById('photo-date');
    photoDate.innerText = dateFormatting(obj.date);

    const photoExplanation = document.querySelector('p');
    photoExplanation.textContent = obj.explanation;

    const photoUrl = document.querySelector('#image-section img');
    photoUrl.src = obj.url;
    photoUrl.alt = obj.title;
    //set width and height in CSS
    photoUrl.style.width = "500px"

    const photoTitle = document.querySelector('.title');
    photoTitle.textContent = obj.title;
}

function dateFormatting(oldDate) {
    if(oldDate[2] == '/'){
        return oldDate
    }
    else{
       const formattedDate = oldDate.split("-");
    return `${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}` 
    }
}

const saveButton = document.querySelector('.save-button')
saveButton.addEventListener('click', e => {
    let passObj = {
        title: "",
        date: "",
        url: "",
        explanation: ""
    }
    passObj.title = document.querySelector('.title').textContent;
    passObj.date = document.querySelector('#photo-date').textContent;
    passObj.url = document.querySelector('#image-section img').src;
    passObj.explanation = document.querySelector('#image-section p').innerText;
    savePhoto(passObj);
})

let arrSaved = [];

function savePhoto(incomeObj) {
    if (arrSaved.find( ({title}) => title === incomeObj.title)){
        alert('Photo already liked')
        return
    }
    arrSaved[saveCounter] = incomeObj
    let placeForSaved = document.querySelector('#liked-photos');
    let imgItem = document.createElement("img");
    imgItem.src = arrSaved[saveCounter].url
    imgItem.alt = arrSaved[saveCounter].title
    imgItem.addEventListener('click', () => {
        showPhoto(incomeObj)
    })
    imgItem.style.width = '100px'
    imgItem.style.height = '100px'
    placeForSaved.appendChild(imgItem);
    saveCounter++
}


// {date: '1995-07-08', explanation: 'July 8, 1995   Damage to Apollo 13  Picture Credit…ghted to Robert J. Nemiroff and Jerry T. Bonnell.', hdurl: 'https://apod.nasa.gov/apod/image/a13_servicemod.gif', media_type: 'image', service_version: 'v1', …}
// date: "1995-07-08"
// explanation: "July 8, 1995   Damage to Apollo 13  Picture Credit: NASA, Crew of Apollo 13 Explanation:  In April of 1970, after an oxygen tank exploded and damaged their service module, the Apollo 13 astronauts were forced to abandon their plans to make the third manned lunar landing. The extent of the damage is revealed in this photo, taken as the crippled module was drifting away - jettisoned prior to their reentry and eventual safe splashdown. An entire panel on the right side of the module is seen to have been blown away and damage to internal structures is apparent.  For more information about the picture see the NASA photo caption.  We keep an archive of Astronomy Pictures of the Day.   Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert J. Nemiroff and Jerry T. Bonnell."
// hdurl: "https://apod.nasa.gov/apod/image/a13_servicemod.gif"
// media_type: "image"
// service_version: "v1"
// title: "Damage to Apollo 13"
// url: "https://apod.nasa.gov/apod/image/a13_servicemod.gif"