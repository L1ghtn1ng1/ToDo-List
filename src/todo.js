export class ToDoItem{
    constructor(title, description = null, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    toggleComplete(){
        this.complete = !this.complete;
    }
    setPriority(priority){
        this.priority = priority;
    }
    editDescription(description){
        this.description = description;
    }
}

export class Project{
    #content;
    constructor(title){
        this.title = title;
        this.items = [];
    }
    addItem(item){
        this.items.push(item);
    }
    removeItem(item){
        this.items.splice(this.items.indexOf(item), 1);
    }
    markComplete(){
    }
    editTitle(title){
        this.title = title;
    }
    renderTasks(){
        this.#content = document.querySelector('.content');
        this.#content.innerHTML = '';
        const taskTitle = document.getElementById('taskTitle');
        taskTitle.textContent = this.title;
        for (const items of this.items){
            const card = document.createElement('div');
            card.classList.add('card');

            const cardLeft = document.createElement('div');
            cardLeft.classList.add('card-left');
            card.appendChild(cardLeft);

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('leftDiv');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = 'done';
            checkBox.name = 'done';
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
            cardRight.appendChild(dateDiv);
            this.#content.appendChild(card);
            



        }
    }
    renderProjects(){
        const projectList = document.querySelector('.projects');
        const project = document.createElement('button');
        project.textContent = this.title;
        projectList.appendChild(project);
    }
}
