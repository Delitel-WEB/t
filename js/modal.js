const createRequestBtn = document.querySelector("#create_request");
const modal = document.querySelector("#modal");
const modalContent = modal.querySelector(".modal_content");
const modalExit = modal.querySelector(".exit_btn");
const dateModal = document.querySelector("#date_");
const sendRequest = document.querySelector("#modal_form");


modal.addEventListener("click", ()=>{
    modal.classList.remove("show");
});
modalExit.addEventListener("click", ()=>{
    modal.classList.remove("show");
});
modalContent.addEventListener("click", (e)=>{
    e.stopPropagation(); // Предотвращение скрытия модального окна при нажатии на его содержимое
});
createRequestBtn.addEventListener("click", ()=>{
    dateModal.value = dateFormatter.format(new Date());
    modal.classList.add("show");
})


sendRequest.addEventListener("submit", (e) => {
    e.preventDefault()

    let problemInfo = document.querySelector("#problem_info");
    
    data.push({
        "id": 1,
        "description": problemInfo.value,
        "created":  dateFormatter.format(new Date()),
        "status": statuses.NOT_COMPLETED
    })
    table.render();
    console.log(data)
    modal.classList.remove("show");
})
