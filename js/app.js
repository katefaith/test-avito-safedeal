'use strict';

loadGallery();

function loadGallery() {
    let url = 'https://boiling-refuge-66454.herokuapp.com/images/';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = '';

            data.forEach(picture => {
                html += `
                        <div id="${picture.id}" class="gallery__image">
                            <img src="${picture.url}" alt="photo" />
                        </div>`;
            });

            document.querySelector('.gallery').innerHTML = html;
        })
        .catch(error => console.log(error))
}