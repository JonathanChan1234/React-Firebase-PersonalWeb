exports.findAllMonth = function (recordList) {
    var month = [];
    if (recordList) {
        recordList.forEach(record => {
            let t = new Date(record.date.seconds * 1000);
            let found = month.find(function (element) {
                return (t.getMonth() + 1) === element;
            });
            if (found === undefined) month.push(t.getMonth() + 1);
        });
        return month;
    }
    return [];
}