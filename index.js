const newBtn = document.getElementById("newBtn");
const formId = document.getElementById("formId");
const startBtn = document.getElementById("startBtn");
const form = document.getElementById("myForm");

newBtn.addEventListener("click", () => {
    formId.classList.remove("hidden");
})

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    formId.classList.remove("hidden");
    console.log(data);
})