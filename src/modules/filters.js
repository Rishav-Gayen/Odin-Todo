import {renderAllTasks} from './dom';
import {getAllTasks, getImportantTasks, getTodayTasks, getWeekTasks, getCompletedTasks} from './storage';


const taskContainer = document.querySelector('.task-area');

export const displayAllTasks = () => {
    taskContainer.innerHTML = '';
    const taskArray = getAllTasks();

    renderAllTasks(taskArray);

    console.log('clicked');

}

export const displayImportantTasks = () => {
    taskContainer.innerHTML = '';
    const importantTasks = getImportantTasks();
    renderAllTasks(importantTasks);
}

export const displayTodayTasks = () => {
    taskContainer.innerHTML = '';
    const todayTasks = getTodayTasks();
    renderAllTasks(todayTasks);
}

export const displayWeekTasks = () => {
    taskContainer.innerHTML = '';
    const weekTasks = getWeekTasks();
    renderAllTasks(weekTasks);
}

export const displayCompletedTasks = () => {
    taskContainer.innerHTML = '';
    const completedTasks = getCompletedTasks();
    renderAllTasks(completedTasks);
}