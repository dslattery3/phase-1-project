//ORIGINAL index.js WHEN NASA API IS works


const url = `https://api.nasa.gov/planetary/apod?api_key=`
const subForm = document.getElementById('form-submit-api')
let saveCounter = 0
const newDay = new Date()
const today = newDay.getFullYear()+'-'+(newDay.getMonth()+1)+'-'+newDay.getDate();
const myModal = new bootstrap.Modal(document.getElementById('my-modal'));

let th_gallery = document.querySelector('.main-carousel');
let flkty = new Flickity(th_gallery,{
    cellAllign: 'center',
    autoPlay: true,
    wrapAround: true,
    draggable: false,
    groupCells: '80%',
    freeScroll: false,
    selectedAttraction: 0.015,
    friction: 1,
    autoPlay: 3000,
});

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
    fetch(url + `${apiKey}` + '&count=5')
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
    let requestDate = document.getElementById('end-date').value
    if(apiKey == ''){
        apiKey = api
    }
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api}&start_date=${requestDate}&end_date=${requestDate}`)
        .then(r=>r.json())
        .then(data => {
            showPhoto(data[0])
            renderPhoto(data[0]) 
        })
        dateForm.reset()
        playSpace()
})
function renderPhoto(obj) {
    if ( (obj.media_type = 'image') && ((obj.url.search('.jpg')||(obj.url.search('.gif') ))!= - 1) ) {

        const newHolderImage = document.createElement('div');
        newHolderImage.className = 'carousel-cell'

        const newImg = document.createElement('img')
        const gallery = document.getElementById('gallery-section')
        newImg.src = obj.url
        newImg.alt = obj.title
        newImg.style.display = 'cover';
        newImg.style.width = '20rem';
        newImg.style.height = '20rem';
        
        newImg.addEventListener('click', () => {
            showPhoto(obj);
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
               });
        })

        // gallery.appendChild(newImg)
        newHolderImage.appendChild(newImg);

        flkty.append(newHolderImage);

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
    

function closeModal(){
    myModal.hide();
}

function savePhoto(incomeObj) {
    if (arrSaved.find( ({title}) => title === incomeObj.title)){
        myModal.show();

        return
    }
    arrSaved[saveCounter] = incomeObj
    let placeForSaved = document.querySelector('#liked-photos');
    let imgItem = document.createElement("img");

    let placeForImages = document.querySelector('#liked');
    let imageContainer = document.createElement("div");
    imageContainer.className = "col-lg-3 col-md-4 col-6 mt-1";
    placeForImages.appendChild(imageContainer);

    imgItem.src = arrSaved[saveCounter].url
    imgItem.alt = arrSaved[saveCounter].title
    imgItem.className = "img-fluid img-thumbnail text-bg-success border-success hover-shadow"
    imgItem.style.transition = '0.5s'
    imgItem.addEventListener('mouseover', e =>{
        e.target.className="img-fluid img-thumbnail text-bg-success border-light"
    })
    imgItem.addEventListener('mouseout', e => {
        e.target.className = "img-fluid img-thumbnail text-bg-success border-success"
    })
    imgItem.addEventListener('click', () => {
        showPhoto(incomeObj);
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
           });
    })
    placeForSaved.appendChild(imgItem);

    imageContainer.appendChild(imgItem)

    saveCounter++
    //likeIt()
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

function resetGallery(){
    flkty = undefined;
    flkty = new Flickity(th_gallery,{
        cellAllign: 'center',
        autoPlay: true,
        wrapAround: true,
        draggable: false,
        groupCells: '80%',
        freeScroll: false,
        selectedAttraction: 0.015,
        friction: 1,
        autoPlay: 3000,
    });
}