export class ToDoItem {
    constructor(title, description = null, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    editDescription(description) {
        this.description = description;
    }
}

export class Project {
    #content;
    constructor(title) {
        this.title = title;
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);

    }
    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.renderTasks();
    }
    renderTasks() {
        this.#content = document.querySelector('.content');
        this.#content.innerHTML = '';
        const taskTitle = document.getElementById('taskTitle');
        taskTitle.innerHTML = '';
        taskTitle.textContent = this.title;
        for (const items of this.items) {
            const card = document.createElement('div');
            card.classList.add('card');
            switch (items.priority) {
                case 'LOW':
                    card.classList.add('low');
                    break;
                case 'MEDIUM':
                    card.classList.add('medium');
                    break;
                case 'HIGH':
                    card.classList.add('high');
                    break;
            }

            const cardLeft = document.createElement('div');
            cardLeft.classList.add('card-left');
            card.appendChild(cardLeft);

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('leftDiv');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = 'done';
            checkBox.name = 'done';
            if (items.completed) {
                checkBox.checked = true;
            } else {
                checkBox.checked = false;
            }
            leftDiv.appendChild(checkBox);

            const heading = document.createElement('label');
            heading.htmlFor = 'done';
            heading.textContent = items.title;
            const description = document.createElement('p');
            description.textContent = items.description;
            leftDiv.appendChild(heading);
            cardLeft.appendChild(leftDiv);
            cardLeft.appendChild(description);

            const cardRight = document.createElement('div');
            cardRight.classList.add('card-right');
            card.appendChild(cardRight);
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            const date = document.createElement('p');
            date.textContent = items.dueDate;
            dateDiv.appendChild(date);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');
            //add image to button
            deleteBtn.addEventListener('click', () => {
                this.removeItem(items);
            });
            cardRight.appendChild(dateDiv);
            cardRight.appendChild(deleteBtn);
            this.#content.appendChild(card);
        }
    }
    renderProjects() {
        const projectList = document.querySelector('.projects');
        const project = document.createElement('button');
        const deleteProj = document.createElement('button');
        const projDiv = document.createElement('div');
        projDiv.classList.add('projDiv');
        projDiv.appendChild(project);
        projDiv.appendChild(deleteProj);
        deleteProj.classList.add('deleteProj');
        deleteProj.setAttribute('data-project-name', this.title);
        this.#content = document.querySelector('.content');
        project.classList.add('project');
        project.addEventListener('click', () => {
            this.renderTasks();
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => button.classList.remove('chosen'));
            project.classList.add('chosen');
        });
        project.textContent = this.title;
        projectList.appendChild(projDiv);

    }

    renderToday(dates) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        Object.entries(dates).forEach(([key, value]) => {
            if (key === `${year}-${month}-${day}`) {
                if (!this.items.some(item => item.title === value.title && item.dueDate === value.dueDate)) {
                    this.addItem(value);
                }
            }
        });
        this.renderTasks();
    }

    renderWeek(dates) {
        const today = new Date();
        const week = [];

        const dayOfWeek = today.getDay();

        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        for (let i = 0; i < 7; i++) {

            const day = new Date(today);
            day.setDate(today.getDate() + diffToMonday + i);  
            week.push(day.toISOString().slice(0, 10)); 
        }
                
        Object.entries(dates).forEach(([key, value]) => {
            if (week.includes(key)) {
                if (!this.items.some(item => item.title === value.title && item.dueDate === value.dueDate)) {
                    this.addItem(value);
                }
            }
        });
        this.renderTasks();
    }

    clearTasks() {
        console.log(`Clearing tasks for project: ${this.title}`);
        this.items = [];
        this.title = 'Nothing to do!';
        this.renderTasks();
    }
}
