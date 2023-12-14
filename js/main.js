const statuses = {
    COMPLETED: "completed",
    PENDING: "pending",
    NOT_COMPLETED: "not_completed"
}


// Форматирование строки времени
const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
};


// Форматтер времениы
const dateFormatter = new Intl.DateTimeFormat('ru-RU', options);

let data = [
    {
        "id": 1,
        "description": "Описание проблемы",
        "created":  dateFormatter.format(new Date()),
        "status": statuses.NOT_COMPLETED
    },
    {
        "id": 2,
        "description": "Описание проблемы 2",
        "created":  dateFormatter.format(new Date()),
        "status": statuses.PENDING
    },
    {
        "id": 3,
        "description": "Описание проблемы 3",
        "created":  dateFormatter.format(new Date()),
        "status": statuses.COMPLETED
    },
   
]

console.log(data)

let table =  new Table(".table_container")

const editButton = document.querySelector("#editBtn");
editButton.addEventListener("click", ()=>{
    if (!table.editMode){
        editButton.classList.remove("btn-info");
        editButton.classList.add("btn-success");
        editButton.textContent = "Сохранить"
    }
    else{
        table.confirmSaves()
        editButton.classList.add("btn-info");
        editButton.classList.remove("btn-success");
        editButton.textContent = "Редактировать"
    }
    table.editMode = !table.editMode
    table.render()
})