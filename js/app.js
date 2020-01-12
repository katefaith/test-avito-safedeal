'use strict';

loadGallery();

document.querySelector('.gallery').addEventListener('click', showModal);
document.querySelector('.modal').addEventListener('click', closeModal);

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

function showModal(event) {
    let target = event.target;
    if (target.tagName != 'IMG') return;
    
    let url = 'https://boiling-refuge-66454.herokuapp.com/images/' + target.parentNode.id;
    loadPictureInfo(url);

    document.querySelector('.modal').classList.add('modal--show');
}

function loadPictureInfo(url) {
    fetch(url)
        .then(response => response.json())
        .then(picture => {
            let html = `<img src="${picture.url}" alt="photo" />`;
            document.querySelector('.modal__image').innerHTML = html;

            html = '';
            if (picture.comments.length) {
                picture.comments.forEach(comment => {
                    let date = timestampToDate(comment.date);
                    html += `
                        <div class="comment  comments-list__item">
                            <p class="comment__date">${date}</p>
                            <p class="comment__text">${comment.text}</p>
                        </div>`;
                });
                document.querySelector('.comments-list').innerHTML = html;
            }
        })
        .catch(error => console.log(error))
}

function timestampToDate(timestamp) {
    var date = new Date();
    date.setTime(timestamp);
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
}

function closeModal(event) {
    let isBtnClose = event.target.classList.contains('modal__btn-close');
    let isOutOfModal = event.target.classList.contains('modal');

    if (isBtnClose || isOutOfModal) {
        document.querySelector('.modal').classList.remove('modal--show');
        clearModal();
    }
}

function clearModal() {
    let html = '<p class="comments-list__notice">Комментариев пока нет</p>';
    document.querySelector('.comments-list').innerHTML = html;
}