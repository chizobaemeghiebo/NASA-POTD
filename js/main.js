let mainImg = document.querySelector('.main-img')
let date = document.querySelector('.date')
let copyright = document.querySelector('.copyright')
let hidden = document.querySelector('.hidden')
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  document.querySelector('.iframe').style.display = 'none'
  const choice = document.querySelector('input').value
  fetch(`https://api.nasa.gov/planetary/apod?api_key=H69qw1MEOVlg9NeY83dMIQznTO1MkaRfwQSxphdN&date=${choice}`)
    .then((res) => res.json())
    .then((data) => {
      hidden.style.display = 'flex'
      document.querySelector('h2').innerText = data.title
      const img = data.hdurl
      if (data.media_type === 'image') {
        mainImg.src = `${img}`
      } else if (data.media_type === 'video') {
        document.querySelector('iframe').style.display = 'flex'
        document.querySelector('iframe').src = data.url
      }
      document.querySelector('p').innerText = 'Explanation: ' + data.explanation
      date.innerText = 'Date: ' + data.date
      if (data.copyright) {
        let copy = data.copyright
        copy = copy.replaceAll(/\n/g, ' ')
        copyright.innerText = `\u00A9` + copy.trim()
      } else {
        copyright.style.display = 'none'
      }
    })
    .catch((err) => {
      console.log(`error ${err}`)
    })
}
