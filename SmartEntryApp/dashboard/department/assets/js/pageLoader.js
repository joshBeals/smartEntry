
const LoadPage = (page) => {
	document.querySelector('#copy').style.display = 'none';
	fetch(`${page}.html`)
	.then(res => res.text())
	.then(data => document.querySelector('#appBody').innerHTML = data)
	.catch(err => console.log(err));
}

const LoadTable = (firstLink, secondLink) => {
	document.querySelector('#appBody').innerHTML = '';
	document.querySelector('#main-name').innerHTML = firstLink;
	document.querySelector('#first-link').innerHTML = secondLink;
	document.querySelector('#copy').style.display = 'block';
}