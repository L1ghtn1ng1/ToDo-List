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


addBtn.addEventListener('click', (e) => {
    typeBtn.classList.remove('hidden');
    typeBtn.classList.add('active');
});

document.addEventListener('click', (e) => {
    if (e.target !== typeBtn && e.target !== addBtn && typeBtn.classList.contains('active') && !typeBtn.contains(e.target)) {
        typeBtn.classList.add('hidden');
        typeBtn.classList.remove('active');
    }
});
