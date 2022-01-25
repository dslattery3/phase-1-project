let apiDemo = 'DEMO_KEY'
const url = `https://api.nasa.gov/planetary/apod?api_key=`

const subForm = document.getElementById('submit-section')
subForm.addEventListener('submit', e => {
    e.preventDefault()
    const apiKey = document.getElementById('apiKey').value
//fetch 10 photos from NASA API
    fetch(url+`${apiKey}`+'&count=50', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    .then(r => r.json())
    .then(console.log)
})

function renderPhoto(obj){
    const newImg = document.createElement('img')
    const imageContainer = document.getElementById('image-section')
    newImg.src = obj.hdurl
    newImg.alt = obj.title
    imageContainer.appendChild(newImg)
}


// function difference(date1, date2) {  
//     const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
//     const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
//       day = 1000*60*60*24;
//     return(date2utc - date1utc)/day
//   }
  
//   const date1 = new Date("2020-12-10"),
//         date2 = new Date("2021-10-31"),
//         time_difference = difference(date1,date2)
  
//   console.log(time_difference)


    
//Important
//Img


//{copyright: 'Matipon TangmatithamNARIT Text: Matipon Tangmatitham', date: '2022-01-25', explanation: 'Which direction is this comet heading?  Judging by…images submitted to APOD of Comet Leonard in 2021', media_type: 'video', service_version: 'v1', …}
// copyright: "Matipon TangmatithamNARIT Text: Matipon Tangmatitham"
// date: "2022-01-25"
// explanation: "Which direction is this comet heading?  Judging by the tail, one might imagine that Comet Leonard is traveling towards the bottom right, but a full 3D analysis shows it traveling almost directly away from the camera.  With this perspective, the dust tail is trailed towards the camera and can only be seen as a short yellow-white glow near the head of the comet.  The bluish ion tail, however, is made up of escaping ions that are forced directly away from the Sun by the solar wind -- but channeled along the Sun's magnetic field lines.  The Sun's magnetic field is quite complex, however, and occasionally solar magnetic reconnection will break the ion tail into knots that are pushed away from the Sun. One such knot is visible in the featured one-hour time-lapse video captured in late December from Thailand.  Comet Leonard is now fading as it heads out of our Solar System.    Gallery:  Notable images submitted to APOD of Comet Leonard in 2021"
// media_type: "video"
// service_version: "v1"
// title: "Video: Comet Leonard over One Hour"
// url: "https://www.youtube.com/embed/s6IpsM_HNcU?rel=0"
