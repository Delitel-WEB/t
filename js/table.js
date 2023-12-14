class Table {
  constructor(container_id) {
    this.container = document.querySelector(container_id);
    this.requests = [];
    this.editMode = false;
    this.render();
  }

  handleRequests() {
    this.requests = [];
    data.forEach((request, index) => {
      let requestStatus = null;

      if (this.editMode) {
        requestStatus = `
          <td>
            <select id="status_selector" class="form-select" data-index="${index}">
              <option class="completed" value="${statuses.COMPLETED}" ${request.status === statuses.COMPLETED ? "selected" : ""}>Выполнено</option>
              <option class="pending" value="${statuses.PENDING}" ${request.status === statuses.PENDING ? "selected" : ""}>В работе</option>
              <option class="not_completed" value="${statuses.NOT_COMPLETED}" ${request.status === statuses.NOT_COMPLETED ? "selected" : ""}>Не выполнено</option>
            </select>
          </td>
        `;
      } else {
        if (request.status === statuses.COMPLETED) {
          requestStatus = `<td class="completed">Выполнено</td>`;
        } else if (request.status === statuses.PENDING) {
          requestStatus = `<td class="pending">В работе</td>`;
        } else {
          requestStatus = `<td class="not_completed">Не выполнено</td>`;
        }
      }
      let element = `
        <tr>
          <td>${index + 1}</td>
          <td>${request.created}</td>
          <td>${this.editMode ? `<input id="description_editor" class="form-control" value="${request.description}" data-index="${index}">` : request.description}</td>
          ${requestStatus}
        </tr>
    `;
      this.requests.push(element);
    });
  }

  confirmSaves(){
    const isConfirmed = confirm("Вы уверены, что хотите изменить статус заявки?");
    if (isConfirmed) {
      this.container.querySelectorAll("#status_selector").forEach((selector) => {
        const index = selector.dataset.index;
        const selectStatus = selector.value;
        data[index].status = selectStatus;
      });
      this.container.querySelectorAll("#description_editor").forEach((input) => {
        const index = input.dataset.index;
        const inputText = input.value;
        data[index].description = inputText;
      })
    }
  }

  render() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.handleRequests();

    let table = document.createElement("table");
    table.innerHTML = `
        <table>
        <thead>
            <tr>
                <th id="">Номер заявки</th>
                <th id="date_filter">Дата добавления</th>
                <th id="">Описание проблемы</th>
                <th id="">Статус заявки</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                ${this.requests.join("")}
            </tr>
        </tbody>
        </table>
        `;

    this.container.appendChild(table);
}}
