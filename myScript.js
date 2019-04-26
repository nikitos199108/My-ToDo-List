//localStorage.clear();
var list = document.querySelector("ul");
var sortedTextBut = document.getElementById("SortText");
var sortedDateBut = document.getElementById("SortDate");
var resetBut = document.getElementById("Reset");
var tasksList = [];
var idGen = 0;

var inner;
var array;
var idStor;

statusSortText = false;
statusSortDate = false;

var changedArr;
var filterArr;
statusSort = false;
statusFilter = false;

console.log(tasksList);

document.getElementById('search').addEventListener('input',e=>{
    statusFilter = true;
    if (statusSort === true){
        var filterArrSort = filterTasks(e.target.value,changedArr);
        filterArr = filterArrSort;
        newTask(filterArrSort);
    } else {
        var filterArrBase = filterTasks(e.target.value,tasksList);
        filterArr = filterArrBase;
        newTask(filterArrBase);
    }

})

resetBut.addEventListener("click", function (e) {

    statusSort = false;

    newTask(tasksList);
});

sortedTextBut.addEventListener("click", function (e) {

    if (statusFilter) {

        if(!statusSortText) {
            var sortTextUp = [...filterArr];
            changedArr = sortTextUp;
            sortTextUp.sort(function(a, b){
                var taskA = a.text.toLowerCase();
                var taskB = b.text.toLowerCase();
                if (taskA < taskB) {
                    return -1;
                }
                if (taskA > taskB) {
                    return 1;
                }
                return 0;
            });
            statusSortText = true;
            newTask(sortTextUp);

        } else if(statusSortText) {
            var sortTextDown = [...filterArr];
            changedArr = sortTextDown;
            sortTextDown.sort(function(a, b){
                var taskA = a.text.toLowerCase();
                var taskB = b.text.toLowerCase();
                if (taskA > taskB) {
                    return -1;
                }
                if (taskA < taskB) {
                    return 1;
                }
                return 0;
            });
            newTask(sortTextDown);
            statusSortText = false;
        }

    } else {
        statusSort = true;
        if(!statusSortText) {
            var sortTextUp = [...tasksList];
            changedArr = sortTextUp;
            sortTextUp.sort(function(a, b){
                var taskA = a.text.toLowerCase();
                var taskB = b.text.toLowerCase();
                if (taskA < taskB) {
                    return -1;
                }
                if (taskA > taskB) {
                    return 1;
                }
                return 0;
            });
            statusSortText = true;
            newTask(sortTextUp);

        } else if(statusSortText) {
            var sortTextDown = [...tasksList];
            changedArr = sortTextDown;
            sortTextDown.sort(function(a, b){
                var taskA = a.text.toLowerCase();
                var taskB = b.text.toLowerCase();
                if (taskA > taskB) {
                    return -1;
                }
                if (taskA < taskB) {
                    return 1;
                }
                return 0;
            });
            newTask(sortTextDown);
            statusSortText = false;
        }
    }
});

sortedDateBut.addEventListener("click", function (e) {

    if (statusFilter) {
        if(!statusSortDate) {
            var sortDateUp = [...filterArr];
            changedArr = sortDateUp;
            sortDateUp.sort(function(a, b){
                var dateA = new Date(a.parsdate);
                var dateB = new Date(b.parsdate);

                return dateA-dateB;
            });
            statusSortDate = true;
            newTask(sortDateUp);

        } else if(statusSortDate) {
            var sortDateDown = [...filterArr];
            changedArr = sortDateDown;
            sortDateDown.sort(function(a, b){
                var dateA = new Date(a.parsdate);
                var dateB = new Date(b.parsdate);

                return dateB-dateA;
            });
            newTask(sortDateDown);
            statusSortDate = false;
        }
    } else {
        statusSort = true;
        if(!statusSortDate) {
            var sortDateUp = [...tasksList];
            changedArr = sortDateUp;
            sortDateUp.sort(function(a, b){
                var dateA = new Date(a.parsdate);
                var dateB = new Date(b.parsdate);

                return dateA-dateB;
            });
            statusSortDate = true;
            newTask(sortDateUp);

        } else if(statusSortDate) {
            var sortDateDown = [...tasksList];
            changedArr = sortDateDown;
            sortDateDown.sort(function(a, b){
                var dateA = new Date(a.parsdate);
                var dateB = new Date(b.parsdate);

                return dateB-dateA;
            });
            newTask(sortDateDown);
            statusSortDate = false;
        }
    }
});

list.addEventListener("click", function (ev) {
    if(ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        tasksList.forEach((elem)=>{
            if(ev.target.id == elem.id) {
                if (!elem.toggle) {
                    elem.toggle = true;
                }else if (elem.toggle) {
                    elem.toggle = false;
                }
            }
        });
        locStor();
    }else if (ev.target.tagName === "SPAN") {
        var div = ev.target.parentNode;
        div.remove();

        var delId = ev.target.parentNode.id;
        delTaskFromList(delId);
    }
}, false);

function addTaskToList() {
    var inputTask = document.getElementById("toDoEl");
    var inputValue = inputTask.value;
    var inputLenth = inputTask.value.length;

    var inputDate = document.getElementById("date");
    var inputDateValue = inputDate.value;
    var parseDate = new Date (inputDateValue);
    var date = formatDate(inputDateValue);

    if (inputLenth === 0) {
        inputTask.focus();
    } else if (date === "NaN.NaN.NaN"){
        inputDate.focus();
        return false;
    } else {

        var task = {
            text: inputValue,
            date: date,
            id: idGen,
            parsdate: parseDate,
            toggle: false,
        };
        tasksList.push(task);
        locStor();
        newTask(tasksList);
        idGen++;
    }
}

function newTask(arg) {

    var clearNode = document.getElementById("list");
    clearNode.innerHTML = '';

    arg.forEach((elem)=>{

        var li = document.createElement("li");
        li.id = elem.id;
        var date = elem.date;
        var text = elem.text;

        var t = document.createTextNode(date + " - " + text);
        li.appendChild(t);

        document.getElementById("list").appendChild(li);
        document.getElementById("toDoEl").value = "";
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("X");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        if(elem.toggle) {
            li.classList.toggle("checked");
        }
    });
    locStor();
}

function formatDate(inputDate) {
    var inputParseDate = Date.parse(inputDate);

    var dateFunc = new Date(inputParseDate);

    var day = dateFunc.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    var month = dateFunc.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    var year = dateFunc.getFullYear();

    return day + '.' + month + '.' + year;
}

function delTaskFromList(delId) {
    console.log(tasksList);
    var b = delId.toString();

    tasksList.forEach((elem, index)=>{

        var a = elem.id.toString();

        if (a === b){
            tasksList.splice(index,1);
        }
    });
    locStor();
}

function filterTasks(val,tasksArr){
    return tasksArr.filter(i=>((~i.text.indexOf(val)) || (~i.date.indexOf(val))));
};

function locStor() {
    array = tasksList;
    inner = list.innerHTML;
    idStor = idGen;
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("inner", inner);
    localStorage.setItem("idStor", idStor);
}

if(localStorage.getItem("array") && localStorage.getItem("inner")) {
    tasksList = JSON.parse(localStorage.getItem("array"));
    list.innerHTML = localStorage.getItem("inner");
    idGen = +(localStorage.getItem("idStor"))+1;
}




