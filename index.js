const url = `https://api.nasa.gov/planetary/apod?api_key=`
const subForm = document.getElementById('form-submit-api')
let saveCounter = 0
const newDay = new Date()
const today = newDay.getFullYear()+'-'+(newDay.getMonth()+1)+'-'+newDay.getDate();
fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${today}&end_date=${today}`)
    .then(r => r.json())
    .then(data => {
        showPhoto(data[0])
        renderPhoto(data[0])
    })
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
function renderPhoto(obj) {
    if (obj.media_type = 'image') {
        const newImg = document.createElement('img')
        const gallery = document.getElementById('gallery-section')
        newImg.src = obj.url
        newImg.alt = obj.title
        newImg.addEventListener('click', () => {
            showPhoto(obj)
        })
        gallery.appendChild(newImg)
    }
}
function showPhoto(obj) {
    const photoDate = document.getElementById('photo-date');
    photoDate.innerText = dateFormatting(obj.date);

    const photoExplanation = document.querySelector('p');
    photoExplanation.textContent = obj.explanation;

    const photoUrl = document.querySelector('#image-section img');
    photoUrl.src = obj.url;
    photoUrl.alt = obj.title;

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
    placeForSaved.appendChild(imgItem);
    saveCounter++
}