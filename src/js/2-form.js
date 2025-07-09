import '../css/styles.css';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';


let formData = {
  email: '',
  message: '',
};


loadFormData();


form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);



function onInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted with data:', formData);

  
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (parsedData.email) form.elements.email.value = parsedData.email;
    if (parsedData.message) form.elements.message.value = parsedData.message;
  } catch (error) {
    console.error('Invalid JSON in localStorage:', error);
  }
}