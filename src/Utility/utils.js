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

exports.timestampToDateString = function (timestamp) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(timestamp.seconds);
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
}

exports.isArrayEmpty = function(arr) {
    for(let i = 0; i < arr.length; ++i) {
        if(arr[i] !== "") return 0;
    }
    return 1;
}

exports.isArrayFull = function(arr) {
    for(let i = 0; i < arr.length; ++i) {
        if(arr[i] === "") return 0;
    }
    return 1;
}

exports.insertionSort = function (arr) {
    for (let i = 0; i < arr.length; ++i) {
        let unsorted = arr[i];
        let j = i - 1;
        while (unsorted < arr[j] && j >= 0) {
            // swap the elements
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = unsorted;
    }
    return arr
}

exports.handleAccountError = (error) => {
    console.log(`Error Code: ${error.code}, Message: ${error.message}`);
}