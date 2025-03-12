import {Task} from './task';
import {addTask, editTask, getAllTasks, getImportantTasks, getTodayTasks} from './storage';
import {renderTasks, renderAllTasks} from './dom';

const taskModal = document.querySelector('.task-modal');
const taskModalForm = document.querySelector('.task-modal-form');
const editTaskModal = document.querySelector('#edit-task');
const editTaskModalForm = editTaskModal.querySelector('.task-modal-form');
const taskArea = document.querySelector('.task-area');


function closeTaskModal() {
    taskModal.style.display = 'none';
    taskModalForm.reset();
}

function closeEditTaskModal() {
    editTaskModal.style.display = 'none';
    editTaskModalForm.reset();
}


taskModal.querySelector('.fa-xmark').addEventListener('click', () => {
    closeTaskModal();
})

taskModal.querySelector('.cancel').addEventListener('click', () => {
    closeTaskModal();
})

taskModalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const projId = document.querySelector('.proj-id').textContent;
    const taskName = document.querySelector('#taskName').value;
    const taskDesc = document.querySelector('#taskDesc').value;
    const taskDate = document.querySelector('#taskDate').value;
    const taskPriority = document.querySelector('#taskPriority').value;
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newTask = new Task(taskName, projId, taskId, taskDesc, taskDate, taskPriority);
    newTask.completed = false;
    addTask(projId, newTask)
    renderTasks(projId);
    closeTaskModal();
})


editTaskModal.querySelector('.fa-xmark').addEventListener('click', () => {
    closeEditTaskModal();
})

editTaskModal.querySelector('.cancel').addEventListener('click', () => {
    closeEditTaskModal();
})

editTaskModalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const contentHeading = document.querySelector('.content-heading');
    const contentHeadingChild = contentHeading.querySelector('i')


    const projId = document.querySelector('.projectId').textContent;
    const taskId = document.querySelector('.taskId').textContent;

    const newName = document.querySelector('#editTaskName').value;
    const newDesc = document.querySelector('#editTaskDesc').value;
    const newDate = document.querySelector('#editTaskDate').value;
    const newPriority = document.querySelector('#editTaskPriority').value;

    editTask(projId, taskId, newName, newDesc, newDate, newPriority);
    if(contentHeadingChild) {
        renderTasks(projId);
    }
    else {
        if (contentHeading.textContent.includes('Important')) {
            taskArea.innerHTML = '';
            const taskArr = getImportantTasks();
            renderAllTasks(taskArr)
        }
        else if(contentHeading.textContent.includes('Today')) {
            taskArea.innerHTML = '';
            const taskArr = getTodayTasks();
            renderAllTasks(taskArr);
        }
        else if(contentHeading.textContent.includes('This Week')) {
            taskArea.innerHTML = '';
            const taskArr = getTodayTasks();
            renderAllTasks(taskArr);
        }
        else if(contentHeading.textContent.includes('Completed')) {
            taskArea.innerHTML = '';
            const taskArr = getCompletedTasks();
            renderAllTasks(taskArr);
        }
        else {
            taskArea.innerHTML = '';
            const taskArr = getAllTasks();
            renderAllTasks(taskArr);
        }
        
    }
    closeEditTaskModal();
})

export function openTaskDescriptionModal(description) {
    const modal = document.getElementById('taskDescriptionModal');
    const descriptionText = document.getElementById('taskDescriptionText');

    // Set the task description text
    descriptionText.textContent = description;

    // Display the modal
    modal.style.display = 'flex';

    // Close the modal when the user clicks on the close button
    const closeButton = modal.querySelector('.fa-xmark');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


export const createEditTaskModal = () => {
    editTaskModal.style.display = 'flex';
}


export const createTaskModal = () => {
    taskModal.style.display = 'flex';
}

