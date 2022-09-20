import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
let formData = {};

populateFormData();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onSetForm, 500));

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log(formData);

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function onSetForm(evt) {
    formData[evt.target.name] = evt.target.value;

    console.log(evt.target.value);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};


function populateFormData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        formData = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if (formData.message) {
            textarea.value = formData.message
        }
        if (formData.email) {
            input.value = formData.email;
        }
    }
}

