import {Project} from './project';
import {addToStorage} from './storage';
import {renderProject} from './dom';

const modal = document.querySelector('.project-modal');
const modalForm = document.querySelector('.project-modal-form');


function closeModal() {
    modal.style.display = 'none';
    modalForm.reset();
}

modal.querySelector('.fa-xmark').addEventListener('click', () => {
    closeModal()
})
modal.querySelector('.cancel').addEventListener('click', () => {
    closeModal()
})
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = modal.querySelector('#projectName').value;
    const projectId = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const newProject = new Project(projectName, projectId);

    addToStorage(newProject);
    renderProject();
    console.log(newProject);
    
    closeModal();
})


export const createProjectModal = () => {
    modal.style.display = 'flex';
}