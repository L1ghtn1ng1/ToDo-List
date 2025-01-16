import './styles.css';
import { ToDoItem } from './todo';
import { Project } from './todo';
const general = new Project('General');
const today = new Project('Today');
const week = new Project('This Week');
const notes = new Project('Notes');

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
const submitBtn = document.getElementById('submitBtn');
const lowPriority = document.getElementById('lowPriority'); 
const mediumPriority = document.getElementById('medPriority');
const highPriority = document.getElementById('highPriority');

function attachPriorityButtonListeners(form) {
    const lowPriority = form.querySelector('#lowPriority');
    const mediumPriority = form.querySelector('#medPriority');
    const highPriority = form.querySelector('#highPriority');
    if (!lowPriority || !mediumPriority || !highPriority) {
        console.error("Priority buttons are missing!");
        return;
    }

    lowPriority.addEventListener('click', () => {
        lowPriority.style.backgroundColor = '#008119';
        lowPriority.style.color = 'white';
        mediumPriority.style.backgroundColor = 'white';
        mediumPriority.style.color = '#f7b500';
        highPriority.style.backgroundColor = 'white';
        highPriority.style.color = '#d00000';
    });

    mediumPriority.addEventListener('click', () => {
        mediumPriority.style.backgroundColor = '#f7b500';
        mediumPriority.style.color = 'white';
        lowPriority.style.backgroundColor = 'white';
        lowPriority.style.color = '#008119';
        highPriority.style.backgroundColor = 'white';
        highPriority.style.color = '#d00000';
    });

    highPriority.addEventListener('click', () => {
        highPriority.style.backgroundColor = '#d00000';
        highPriority.style.color = 'white';
        lowPriority.style.backgroundColor = 'white';
        lowPriority.style.color = '#008119';
        mediumPriority.style.backgroundColor = 'white';
        mediumPriority.style.color = '#f7b500';
    });
}

addBtn.addEventListener('click', (e) => {
    typeBtn.classList.remove('hidden');
    typeBtn.classList.add('active');
});

// remove the buttons and form when clicked outside of the typeBtn
// document.addEventListener('click', (e) => {
//     if (e.target !== typeBtn && e.target !== addBtn && typeBtn.classList.contains('active') && !typeBtn.contains(e.target)) {
//         typeBtn.classList.add('hidden');
//         typeBtn.classList.remove('active');
//     }
// });

taskBtn.addEventListener('click', (e) => {;
    taskBtn.classList.add('selected');
    addNewTask.classList.remove('hidden');
    addNewTask.classList.add('active');
    if(addNewNote.classList.contains('active')) {
        noteBtn.classList.remove('selected');
        addNewNote.classList.add('hidden');
        addNewNote.classList.remove('active');
    }
    if(addNewProject.classList.contains('active')) {
        projectBtn.classList.remove('selected');
        addNewProject.classList.add('hidden');
        addNewProject.classList.remove('active');
    }
    attachPriorityButtonListeners(addNewTask);
} );

noteBtn.addEventListener('click', (e) => {
    noteBtn.classList.add('selected');
    addNewNote.classList.remove('hidden');
    addNewNote.classList.add('active');
    if(addNewTask.classList.contains('active')) {
        taskBtn.classList.remove('selected');
        addNewTask.classList.add('hidden');
        addNewTask.classList.remove('active');
    }
    if(addNewProject.classList.contains('active')) {
        projectBtn.classList.remove('selected');
        addNewProject.classList.add('hidden');
        addNewProject.classList.remove('active');
    }
});

projectBtn.addEventListener('click', (e) => {
    projectBtn.classList.add('selected');
    addNewProject.classList.remove('hidden');
    addNewProject.classList.add('active');
    if(addNewTask.classList.contains('active')) {
        taskBtn.classList.remove('selected');
        addNewTask.classList.add('hidden');
        addNewTask.classList.remove('active');
    }
    if(addNewNote.classList.contains('active')) {
        noteBtn.classList.remove('selected');
        addNewNote.classList.add('hidden');
        addNewNote.classList.remove('active');
    }
    attachPriorityButtonListeners(addNewProject);
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

});