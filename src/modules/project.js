export class Project {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task);
    }
}