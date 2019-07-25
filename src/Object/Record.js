class Record {
    constructor(id, uid, amount, category, date, description, type, file, path) {
        this.id = id;
        this.uid = uid;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
        this.type = type;
        this.file = file;
        this.path = path;
    }
}

export default Record;