import {getProjects, editProj, delProj, getTasks, getAllTasks, deleteTask, getImportantTasks, getTodayTasks, getWeekTasks, toggleTaskCompletion} from './storage';
import {createTaskModal, createEditTaskModal, openTaskDescriptionModal} from './task_modal';
import {displayAllTasks, displayTodayTasks, displayImportantTasks, displayCompletedTasks, displayWeekTasks} from './filters';

const projectsContainer = document.querySelector('.projects');
const contentHeading = document.querySelector('.content-heading');
const contentHeadingChild = contentHeading.querySelector('i')
const taskArea = document.querySelector('.task-area');

function editProject(projectId) {
    let projectName = window.prompt('Enter Project Name');
    if (projectName != null) {
        contentHeading.innerHTML = '';
        taskArea.innerHTML = '';
        editProj(projectName, projectId);
        renderProject()
    }
    renderProject()
}


function deleteProject(projectId) {
    const confirmation = confirm("Do you want to delete the project ?")
    
    if(confirmation) {
        contentHeading.innerHTML = '';
        taskArea.innerHTML = '';
        delProj(projectId);
        renderProject();
        
        contentHeading.textContent = 'All';
        displayAllTasks();
    }
}

function renderHeading(projectId, projectName) {
    if (projectName == '' || projectId == '') {
        return;
    }
    else {
        contentHeading.innerHTML = '';
        contentHeading.textContent = projectName;

        const addProject = document.createElement('i');
        addProject.className = 'add-task fa-solid fa-plus';
        addProject.addEventListener('click', () => {
            createTaskModal();
        })

        const projId = document.createElement('span');
        projId.classList.add('hidden')
        projId.classList.add('proj-id')
        projId.textContent = projectId;

        contentHeading.appendChild(addProject);
        contentHeading.appendChild(projId);

        renderTasks(projectId);
    }

    
}

function generateProject(project) {
    const projectP = document.createElement('p');

    const projectId = document.createElement('span');
    const projectEdit = document.createElement('i');
    const projectDel = document.createElement('i');
    const projectName = document.createElement('span');

    projectP.classList.add('project');
    projectId.classList.add('project-id');

    projectEdit.classList.add('fa-solid');
    projectEdit.classList.add('fa-pen-to-square');
    projectDel.classList.add('fa-solid');
    projectDel.classList.add('fa-trash');

    

    projectName.textContent = project.name;
    projectId.textContent = project.id;

    projectDel.addEventListener('click', () => {
        const id = project.id;
        deleteProject(id);
    })

    projectEdit.addEventListener('click', () => {
        const id = project.id;
        editProject(id);
    })

    projectName.addEventListener('click', () => {
        const id = project.id;
        const projName = project.name;
        
        renderHeading(id, projName);
    })

    projectP.appendChild(projectName);
    projectP.appendChild(projectId);
    projectP.appendChild(projectEdit);
    projectP.appendChild(projectDel);

    projectsContainer.appendChild(projectP);
}

export const renderProject = () => {
    const projectArray = getProjects();
    projectsContainer.innerHTML = '';

    if(projectArray.length > 0) {
        projectArray.forEach(project => {
            generateProject(project)
        });
    }
}

export const renderAllTasks = (taskArr) => {

    taskArr.forEach((task) => {
        const taskName = task.name;
        const taskId = task.id;
        const projId = task.projectId;
        const taskDesc = task.description;
        const taskDate = task.date;
        const taskPriority = task.priority;

    // Create the task container
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add('all',`priority-${taskPriority}`)

    // Create the task heading
        const taskHeading = document.createElement('p');
        taskHeading.classList.add('task-heading');

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('rounded-checkbox');
        checkbox.checked = task.completed;
        

        // Create the task name text node
        const taskNameText = document.createTextNode(taskName);

        

        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task.id);
    
    // Dynamically re-render based on current view
            const heading = document.querySelector('.content-heading').textContent;
            if (heading === 'All') {
                displayAllTasks();
            } else if (heading === 'Important') {
                displayImportantTasks();
            } else if (heading === 'Today') {
                displayTodayTasks();
            } else if (heading === 'This week') {
                displayWeekTasks();
            } else if (heading === 'Completed') {
                displayCompletedTasks();
            }
        });

        // Create the hidden task ID span
        const taskIdSpan = document.createElement('span');
        taskIdSpan.classList.add('hidden', 'taskId');
        taskIdSpan.textContent = taskId;

        // Create the hidden project ID span
        const projectIdSpan = document.createElement('span');
        projectIdSpan.classList.add('hidden', 'projectId');
        projectIdSpan.textContent = projId;

        // Append elements to the task heading
        taskHeading.appendChild(checkbox);
        taskHeading.appendChild(taskNameText);
        taskHeading.appendChild(taskIdSpan);
        taskHeading.appendChild(projectIdSpan);

        // Create the task date
        const taskDatePara = document.createElement('p');
        taskDatePara.classList.add('task-date');
        taskDatePara.textContent = taskDate;

        // Create the task priority
        const taskPriorityPara = document.createElement('p');
        taskPriorityPara.classList.add('task-priority', taskPriority);
        taskPriorityPara.textContent = taskPriority;

        // Create the task info icon
        const taskInfoIcon = document.createElement('i');
        taskInfoIcon.classList.add('fa-solid', 'fa-circle-info');

        taskInfoIcon.addEventListener('click', () => {
            openTaskDescriptionModal(taskDesc);
        })

        // Create the task info paragraph
        const taskInfoPara = document.createElement('p');
        taskInfoPara.classList.add('task-info');
        taskInfoPara.appendChild(taskInfoIcon);

        // Create the task buttons container
        const taskButtonsDiv = document.createElement('div');
        taskButtonsDiv.classList.add('task-buttons');

        // Create the edit button
        const editButton = document.createElement('i');
        editButton.classList.add('fa-solid', 'fa-pen-to-square');

        // Add event listener to the edit button
        editButton.addEventListener('click', () => {
            createEditTaskModal();
        });

        // Create the delete button
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa-solid', 'fa-trash');

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Do you want to delete task ?")

            if(confirmation) {
                deleteTask(projId, taskId);
                taskArea.innerHTML = '';

                if(contentHeading.textContent.includes('Important') && !(contentHeadingChild)) {
                    console.log('Imp');
                    const taskArray = getImportantTasks();
                    renderAllTasks(taskArray);
                }
                else if(contentHeading.textContent.includes('Today') && !(contentHeadingChild)) {
                    console.log('Today');
                    const taskArray = getTodayTasks();
                    renderAllTasks(taskArray);
                }
                else if(contentHeading.textContent.includes('This week') && !(contentHeadingChild)) {
                    console.log('This Week');
                    const taskArray = getWeekTasks();
                    renderAllTasks(taskArray);
                }
                else if(contentHeading.textContent.includes('Completed') && !(contentHeadingChild)) {
                    console.log('completed');
                    const taskArray = getCompletedTasks;
                    renderAllTasks(taskArray);
                }
                else {
                    const taskArray = getAllTasks();
                    renderAllTasks(taskArray);
                }
                
            }
        });

        // Append buttons to the task buttons container
        taskButtonsDiv.appendChild(editButton);
        taskButtonsDiv.appendChild(deleteButton);

        // Append all elements to the task container
        taskDiv.appendChild(taskHeading);
        taskDiv.appendChild(taskDatePara);
        taskDiv.appendChild(taskPriorityPara);
        taskDiv.appendChild(taskInfoPara);
        taskDiv.appendChild(taskButtonsDiv);

        // Append the task to the task area
        taskArea.appendChild(taskDiv);
    })
}

export const renderTasks = (projectId) => {

    taskArea.innerHTML = '';
    const taskArr = getTasks(projectId);


    
    taskArr.forEach((task) => {
        const taskName = task.name;
        const taskId = task.id;
        const projId = task.projectId;
        const taskDesc = task.description;
        const taskDate = task.date;
        const taskPriority = task.priority;

    // Create the task container
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add('all',`priority-${taskPriority}`)

    // Create the task heading
        const taskHeading = document.createElement('p');
        taskHeading.classList.add('task-heading');

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('rounded-checkbox');
        checkbox.checked = task.completed;
        

        // Create the task name text node
        const taskNameText = document.createTextNode(taskName);

        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task.id);
            renderTasks(task.projectId); // Re-render the current project view
        });

        // Create the hidden task ID span
        const taskIdSpan = document.createElement('span');
        taskIdSpan.classList.add('hidden', 'taskId');
        taskIdSpan.textContent = taskId;

        // Create the hidden project ID span
        const projectIdSpan = document.createElement('span');
        projectIdSpan.classList.add('hidden', 'projectId');
        projectIdSpan.textContent = projId;

        // Append elements to the task heading
        taskHeading.appendChild(checkbox);
        taskHeading.appendChild(taskNameText);
        taskHeading.appendChild(taskIdSpan);
        taskHeading.appendChild(projectIdSpan);

        // Create the task date
        const taskDatePara = document.createElement('p');
        taskDatePara.classList.add('task-date');
        taskDatePara.textContent = taskDate;

        // Create the task priority
        const taskPriorityPara = document.createElement('p');
        taskPriorityPara.classList.add('task-priority', taskPriority);
        taskPriorityPara.textContent = taskPriority;

        // Create the task info icon
        const taskInfoIcon = document.createElement('i');
        taskInfoIcon.classList.add('fa-solid', 'fa-circle-info');

        taskInfoIcon.addEventListener('click', () => {
            openTaskDescriptionModal(taskDesc);
        })

        // Create the task info paragraph
        const taskInfoPara = document.createElement('p');
        taskInfoPara.classList.add('task-info');
        taskInfoPara.appendChild(taskInfoIcon);

        // Create the task buttons container
        const taskButtonsDiv = document.createElement('div');
        taskButtonsDiv.classList.add('task-buttons');

        // Create the edit button
        const editButton = document.createElement('i');
        editButton.classList.add('fa-solid', 'fa-pen-to-square');

        // Add event listener to the edit button
        editButton.addEventListener('click', () => {
            createEditTaskModal();
        });

        // Create the delete button
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa-solid', 'fa-trash');

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Do you want to delete task ?")
            const identification = projId;

            if(confirmation) {
                deleteTask(projId, taskId);
                renderTasks(identification);
            }
            
        });

        // Append buttons to the task buttons container
        taskButtonsDiv.appendChild(editButton);
        taskButtonsDiv.appendChild(deleteButton);

        // Append all elements to the task container
        taskDiv.appendChild(taskHeading);
        taskDiv.appendChild(taskDatePara);
        taskDiv.appendChild(taskPriorityPara);
        taskDiv.appendChild(taskInfoPara);
        taskDiv.appendChild(taskButtonsDiv);

        // Append the task to the task area
        taskArea.appendChild(taskDiv);
    })
}