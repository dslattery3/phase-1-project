const url = `https://api.nasa.gov/planetary/apod?api_key=`
const subForm = document.getElementById('form-submit-api')
let saveCounter = 0
const newDay = new Date()
const today = newDay.getFullYear()+'-'+(newDay.getMonth()+1)+'-'+newDay.getDate();
fetch(`https://api.nasa.gov/planetary/apod?api_key=${api}&start_date=${today}&end_date=${today}`)
    .then(r => r.json())
    .then(data => {
        showPhoto(data[0])
        renderPhoto(data[0])
    })
subForm.addEventListener('submit', e => {
    e.preventDefault()
    const apiKey = document.getElementById('apiKey').value
    if(apiKey == ''){
        apiKey = api
    }
    fetch(url + `${apiKey}` + '&count=10')
        .then(r => r.json())
        .then(arr => {
            showPhoto(arr[0])
            arr.forEach(renderPhoto)
        })
    loading()
})
const dateForm = document.getElementById('form-pick-date')
dateForm.addEventListener('submit', e => {
    e.preventDefault()
    const requestDate = document.getElementById('end-date').value
    if(apiKey == ''){
        apiKey = api
    }
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api}&start_date=${requestDate}&end_date=${requestDate}`)
        .then(r=>r.json())
        .then(data => {
            renderPhoto(data[0])
            showPhoto(data[0])
        })
        dateForm.reset()
        playSpace()
})
function renderPhoto(obj) {
    if (obj.media_type = 'image') {
        const newImg = document.createElement('img')
        const gallery = document.getElementById('gallery-section')
        newImg.src = obj.url
        newImg.alt = obj.title
        newImg.addEventListener('mouseover', e =>{
            e.target.style.width = '125px'
            e.target.style.height = '125px'
        })
        newImg.addEventListener('mouseout', e => {
            e.target.style.width ='90px'
            e.target.style.height = '90px'
        })
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
    imgItem.addEventListener('mouseover', e =>{
        e.target.style.width = '125px'
        e.target.style.height = '125px'
    })
    imgItem.addEventListener('mouseout', e => {
        e.target.style.width ='90px'
        e.target.style.height = '90px'
    })
    imgItem.addEventListener('click', () => {
        showPhoto(incomeObj)
    })
    placeForSaved.appendChild(imgItem);
    saveCounter++
    likeIt()
}
const spaceSound = new Audio('./spacee.mp3')
function playSpace() {
    spaceSound.play()
}
const loadingSound = new Audio('./squid-game.mp3')
function loading() {
    loadingSound.play()
}
const loveIt = new Audio('./love-it.mp3')
function likeIt() {
    loveIt.play()
}