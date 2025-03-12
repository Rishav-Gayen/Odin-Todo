import {createProjectModal} from './modules/project_modal';
import {renderProject} from './modules/dom'
import {displayAllTasks, displayImportantTasks, displayTodayTasks, displayWeekTasks, displayCompletedTasks} from './modules/filters';


const openButton = document.querySelector('.fa-bars');
const closeButton = document.querySelector('.fa-xmark')
const sidebar = document.querySelector('.sidebar');
const addProject = document.querySelector('.add-project');
const allButton = document.querySelector('.all');
const importantButton = document.querySelector('.important');
const todayButton = document.querySelector('.today');
const weekButton = document.querySelector('.week');
const completedButton = document.querySelector('.completed');
const contentHeading = document.querySelector('.content-heading');

window.addEventListener('load', () => {
    renderProject()
})


openButton.addEventListener('click', () => {
    openButton.classList.toggle('hidden');
    closeButton.classList.toggle('hidden');
    sidebar.style.display = 'block';
})

closeButton.addEventListener('click', ()=> {
    closeButton.classList.toggle('hidden');
    openButton.classList.toggle('hidden');
    sidebar.style.display = 'none';
})

addProject.addEventListener('click', () => {
    createProjectModal();
})

allButton.addEventListener('click', () => {
    contentHeading.textContent = allButton.textContent;
    displayAllTasks();
})

importantButton.addEventListener('click', () => {
    contentHeading.textContent = importantButton.textContent;
    displayImportantTasks();
})

todayButton.addEventListener('click', () => {
    contentHeading.textContent = todayButton.textContent;
    displayTodayTasks();
})

weekButton.addEventListener('click', () => {
    contentHeading.textContent = weekButton.textContent;
    displayWeekTasks();
})

completedButton.addEventListener('click', () => {
    contentHeading.textContent = completedButton.textContent;
    displayCompletedTasks();
})


