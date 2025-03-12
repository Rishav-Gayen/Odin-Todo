export class Task {
    constructor(name, projectId, id, description, date, priority) {
        this.name = name;
        this.projectId = projectId;
        this.id = id;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }

    editTask(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }


}