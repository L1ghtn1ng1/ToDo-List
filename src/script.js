import './styles.css';
import { ToDoItem } from './todo';
import { Project } from './todo';
const general = new Project('General');
const today = new Project('Today');
const week = new Project('This Week');
const notes = new Project('Notes');
let allProjects = {};
let allDates = {};
let allTasks = {};
allProjects['General'] = general;
allProjects['Today'] = today;
allProjects['This Week'] = week;
allProjects['Notes'] = notes;
const generalBtn = document.getElementById('generalBtn');
const todayBtn = document.getElementById('todayBtn');
const weekBtn = document.getElementById('weekBtn');
const notesBtn = document.getElementById('notesBtn');
const addBtn = document.getElementById('addNew');
const typeBtn = document.querySelector('.typeBtn');
const taskBtn = document.getElementById('taskBtn');
const addNewTask = document.querySelector('.addNewTask');
const noteBtn = document.getElementById('noteBtn');
const addNewNote = document.querySelector('.addNewNote');
const projectBtn = document.getElementById('projectBtn');
const addNewProject = document.querySelector('.addNewProject');
const formSpace = document.querySelector('.formSpace');

let lastPressedButton = null; // Variable to store the last pressed button

// Add a click event listener to all buttons
document.addEventListener('click', (e) => {
    // Check if the clicked element is a button
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('chosen')) {
        lastPressedButton = e.target;
    }
});


generalBtn.addEventListener('click', (e) => {
    general.renderTasks();
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('chosen'));
    generalBtn.classList.add('chosen');
});

todayBtn.addEventListener('click', (e) => {
    today.renderToday(allDates);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('chosen'));
    todayBtn.classList.add('chosen');
});

weekBtn.addEventListener('click', (e) => {
    week.renderWeek(allDates);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('chosen'));
    weekBtn.classList.add('chosen');
});

notesBtn.addEventListener('click', (e) => {
    notes.renderTasks();
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('chosen'));
    notesBtn.classList.add('chosen');
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('deleteProj')) {
        const projectName = e.target.getAttribute('data-project-name');
        if (projectName && allProjects[projectName]) {
            console.log("before Tasks");
            console.log(allTasks);
            console.log(allTasks['trial']);
            console.log("before dates: ");
            console.log(allDates);
            Object.entries(allTasks).forEach(([key, value]) => {
                if (value === allProjects[projectName]) {
                    delete allTasks[key];   
                    delete allDates[key];
                    week.removeItem(key);  
                    today.removeItem(key);
                    console.log("after dates:");
                    console.log(allDates);
                    console.log("after tasks: ");
                    console.log(allTasks);
                }
            });
            allProjects[projectName].clearTasks();
            delete allProjects[projectName];
            const temp = e.target.closest('.projDiv');
            temp.remove(); // Remove the project from the UI
        }
    }
});
function attachButtonListeners(form) {
    const lowPriority = form.querySelector('#lowPriority');
    const mediumPriority = form.querySelector('#medPriority');
    const highPriority = form.querySelector('#highPriority');
    if (lowPriority && mediumPriority && highPriority) {
        lowPriority.addEventListener('click', () => {
            lowPriority.classList.add('selected');
            lowPriority.style.backgroundColor = '#008119';
            lowPriority.style.color = 'white';
            mediumPriority.classList.remove('selected');
            mediumPriority.style.backgroundColor = 'white';
            mediumPriority.style.color = '#f7b500';
            highPriority.classList.remove('selected');
            highPriority.style.backgroundColor = 'white';
            highPriority.style.color = '#d00000';
        });

        mediumPriority.addEventListener('click', () => {
            mediumPriority.classList.add('selected');
            mediumPriority.style.backgroundColor = '#f7b500';
            mediumPriority.style.color = 'white';
            lowPriority.classList.remove('selected');
            lowPriority.style.backgroundColor = 'white';
            lowPriority.style.color = '#008119';
            highPriority.classList.remove('selected');
            highPriority.style.backgroundColor = 'white';
            highPriority.style.color = '#d00000';
        });

        highPriority.addEventListener('click', () => {
            highPriority.classList.add('selected');
            highPriority.style.backgroundColor = '#d00000';
            highPriority.style.color = 'white';
            lowPriority.style.backgroundColor = 'white';
            lowPriority.style.color = '#008119';
            lowPriority.classList.remove('selected');
            mediumPriority.classList.remove('selected');
            mediumPriority.style.backgroundColor = 'white';
            mediumPriority.style.color = '#f7b500';
        });
    }
    const cancelBtn = form.querySelector('#cancelBtn');

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        formSpace.style.display = 'none';
    });

    const submitBtn = form.querySelector('#submitBtn');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        //get the values from the form
        let dueDate = null;
        const form = document.querySelector('.addNewForm.active');


        let title = form.querySelector('#title').value;
        if (!title) {
            alert("No title entered!");
            return;
        } else if (title in allProjects) {
            alert("Title already exists!");
            return;
        }
        let description = form.querySelector('#desc');
        if (description) {
            description = description.value;
        }
        if (form.classList.contains('addNewTask')) {
            dueDate = form.querySelector('#date').value;
            if (!dueDate) {
                alert("No due date selected!");
                return;
            }
        }
        let priority = form.querySelector('.priority-btns.selected')
        if (form.classList.contains('addNewTask')) {
            if (!priority) {
                alert("No priority selected!");
                return;
            }
            priority = priority.value;
        }
        // check if its a task, project or note
        if (form.classList.contains('addNewTask')) {
            let newTask = new ToDoItem(title, description, dueDate, priority);
            if (lastPressedButton && lastPressedButton.classList.contains('project', 'chosen')) {
                let project = allProjects[lastPressedButton.innerText];
                project.addItem(newTask);
                project.renderTasks();
                allTasks[newTask.title] = project;
                console.log("Adding task to allTasks for project:");
                setTimeout(() => {
                    console.log(allTasks);  // Logs after the task is added to the map
                }, 0);
            } else {
                general.addItem(newTask);
                general.renderTasks();
                // allTasks.set(newTask,general);
                // console.log("Adding task to allTasks for general:");
                // console.log(allTasks);
                
            }
            const check = document.querySelector('#done');
            check.addEventListener('click', (e) => {
                if (check.checked) {
                    newTask.completed = true;
                } else {
                    newTask.completed = false;
                }
            });
            allDates[dueDate] = newTask;

        } else if (form.classList.contains('addNewProject')) {
            let newProject = new Project(title);
            newProject.renderProjects();
            allProjects[title] = newProject;
        } else {
            let newNote = new ToDoItem(title, description, null, null);
            notes.addItem(newNote);
            notes.renderTasks();
        }
        formSpace.style.display = 'none';
        form.reset();
    });
}

addBtn.addEventListener('click', (e) => {
    typeBtn.classList.remove('hidden');
    typeBtn.classList.add('active');
    formSpace.style.display = 'flex';
});

taskBtn.addEventListener('click', (e) => {
    ;
    taskBtn.classList.add('selected');
    addNewTask.classList.remove('hidden');
    addNewTask.classList.add('active');
    if (addNewNote.classList.contains('active')) {
        noteBtn.classList.remove('selected');
        addNewNote.classList.add('hidden');
        addNewNote.classList.remove('active');
    }
    if (addNewProject.classList.contains('active')) {
        projectBtn.classList.remove('selected');
        addNewProject.classList.add('hidden');
        addNewProject.classList.remove('active');
    }
    attachButtonListeners(addNewTask);
});

noteBtn.addEventListener('click', (e) => {
    noteBtn.classList.add('selected');
    addNewNote.classList.remove('hidden');
    addNewNote.classList.add('active');
    if (addNewTask.classList.contains('active')) {
        taskBtn.classList.remove('selected');
        addNewTask.classList.add('hidden');
        addNewTask.classList.remove('active');
    }
    if (addNewProject.classList.contains('active')) {
        projectBtn.classList.remove('selected');
        addNewProject.classList.add('hidden');
        addNewProject.classList.remove('active');
    }
    attachButtonListeners(addNewNote);
});

projectBtn.addEventListener('click', (e) => {
    projectBtn.classList.add('selected');
    addNewProject.classList.remove('hidden');
    addNewProject.classList.add('active');
    if (addNewTask.classList.contains('active')) {
        taskBtn.classList.remove('selected');
        addNewTask.classList.add('hidden');
        addNewTask.classList.remove('active');
    }
    if (addNewNote.classList.contains('active')) {
        noteBtn.classList.remove('selected');
        addNewNote.classList.add('hidden');
        addNewNote.classList.remove('active');
    }
    attachButtonListeners(addNewProject);
});

