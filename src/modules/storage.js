import {format, startOfWeek, parseISO, differenceInCalendarDays} from 'date-fns';

export const addToStorage = (project) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects')) || [];
    projectsArray.push(project);
    localStorage.setItem('projects',JSON.stringify(projectsArray));
}

export const getProjects = () => {
    let projectsArray = JSON.parse(localStorage.getItem('projects')) || [];
    return projectsArray;
}

export const editProj = (projectName, projectId) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    projectsArray.forEach((project) => {
        if(project.id == projectId) {
            project.name = projectName;
        }
    })
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

export const delProj = (projectId) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    // Delete the project from the projects array
    projectsArray.forEach((project) => {
        if (project.id == projectId) {
            const index = projectsArray.indexOf(project);
            if (index > -1) {
                projectsArray.splice(index, 1);
            }
        }
    });

    // Delete all tasks associated with the project from the taskArray
    tasksArray = tasksArray.filter((task) => task.projectId !== projectId);

    // Save the updated arrays to localStorage
    localStorage.setItem('projects', JSON.stringify(projectsArray));
    localStorage.setItem('taskArray', JSON.stringify(tasksArray));
}

export const getTasks = (projectId) => {
    let taskArray;
    let projectsArray = JSON.parse(localStorage.getItem('projects')) || [];
    projectsArray.forEach((project) => {
        if(project.id == projectId) {
            taskArray = project.tasks;
        }
    })

    return taskArray;
}

export const addTask = (projectId, task) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    projectsArray.forEach((project) => {
        if(project.id == projectId) {
            project.tasks.push(task);
            tasksArray.push(task);
        }
    })

    localStorage.setItem('projects', JSON.stringify(projectsArray));
    localStorage.setItem('taskArray', JSON.stringify(tasksArray))
}

export const editTask = (projectId, taskId, name, description, date, priority) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    projectsArray.forEach((project) => {
        if (project.id == projectId) {
            project.tasks.forEach((task) => {
                if(task.id == taskId) {
                    task.name = name;
                    task.description = description;
                    task.date = date;
                    task.priority = priority;
                }
            })
        }
    })

    tasksArray.forEach((task) => {
        if (task.id == taskId) {
            task.name = name;
            task.description = description;
            task.date = date;
            task.priority = priority;
        }
    });

    localStorage.setItem('taskArray', JSON.stringify(tasksArray));
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

export const deleteTask = (projectId, taskId) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    projectsArray.forEach((project) => {
        if (project.id == projectId) {
            project.tasks.forEach((task) => {
                if(task.id == taskId) {
                   const index = project.tasks.indexOf(task);
                   if(index > -1) {
                        project.tasks.splice(index, 1);
                    }
                }
            })
        }
    })

    tasksArray.forEach((task) => {
        if (task.id == taskId) {
            const index = tasksArray.indexOf(task);
            if (index > -1) {
                tasksArray.splice(index, 1);
            }
        }
    });

    localStorage.setItem('taskArray', JSON.stringify(tasksArray));
    localStorage.setItem('projects', JSON.stringify(projectsArray));    
}


export const getAllTasks = () => {
    const taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
    return taskArray;
}

export const getImportantTasks = () => {
    const importantTaskArray = [];
    const taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    taskArray.forEach((task) => {
        if (task.priority == 'high') {
            importantTaskArray.push(task);
        }
    })

    return importantTaskArray;
}

export const getTodayTasks = () => {
    const getTodayTasksArray = [];
    const taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
    const today = format(new Date(), 'yyyy-MM-dd');

    taskArray.forEach((task) => {
        if(task.date == today) {
            getTodayTasksArray.push(task);
        }
    })

    return getTodayTasksArray;
}

export const getWeekTasks = () => {
    const weekTasksArray = [];
    const taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });

    taskArray.forEach((task) => {
        const taskDate = parseISO(task.date);
        const dayDifference = differenceInCalendarDays(taskDate, weekStart);

        if (dayDifference >= 0 && dayDifference <= 7) {
            weekTasksArray.push(task);
        }
    })

    return weekTasksArray;
}


export const toggleTaskCompletion = (taskId) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];

    // Update in projects array
    projectsArray.forEach(project => {
        project.tasks.forEach(task => {
            if(task.id === taskId) {
                task.completed = !task.completed;
            }
        });
    });

    // Update in taskArray
    tasksArray.forEach(task => {
        if(task.id === taskId) {
            task.completed = !task.completed;
        }
    });

    localStorage.setItem('projects', JSON.stringify(projectsArray));
    localStorage.setItem('taskArray', JSON.stringify(tasksArray));
};

export const getCompletedTasks = () => {
    let tasksArray = JSON.parse(localStorage.getItem('taskArray')) || [];
    const completedTasksArray = []

    tasksArray.forEach((task) => {
        if(task.completed == true) {
            completedTasksArray.push(task);
        }
    })

    return completedTasksArray;
}