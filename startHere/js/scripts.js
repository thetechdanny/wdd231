const myInfo = new URLSearchParams(window.location.search);

const info = document.querySelector("#results");

info.innerHTML = `
<p>This appointment is for ${myInfo.get('first')} ${myInfo.get('last')}</p>`