var isItImportant = false;
var isDetailsVisible = true;
var serverUrl = "http://fsdi.azurewebsites.net/api";

function toggleDetailsVisibility() {
    //hide/show the capture
    if(isDetailsVisible) {
        $("#capture").hide();
        isDetailsVisible = false;
    }
    else {
        $("#capture").show();
        isDetailsVisible = true;
    }
}

function toggleImportant() {
    console.log("Icon Clicked");

    if (!isItImportant){        
        $("#iImportant").removeClass("far").addClass("fas");
        isItImportant = true;
    } else {
        isItImportant = false;
        $("#iImportant").removeClass("fas").addClass("far");
    }
}

function saveTask() {
    console.log("Save Clicked")

    var title =$("#txtTitle").val();
    var date =$("#txtDate").val();
    var status =$("#selStatus").val();
    var location =$("#txtLocation").val();
    var color =$("#txtColor").val();
    var desc =$("#txtDesc").val();
   
    var myTask = new Task(0, title, isItImportant, date, status, location, color, desc);
    
    console.log(myTask);
    console.log(JSON.stringify(myTask));
    console.log("Starting ajax");
    //save to server
    $.ajax({
        url: serverUrl + '/tasks',
        type: "POST",
        data: JSON.stringify(myTask),
        contentType: "application/json",
        success: function(res) {
            console.log("Server says: ", res);
            
            // display task 
            displayTask(res);

        },
        error: function(errorDet) {
            console.log("Error", errorDet);
        }
    });    
    clearForm();
    //$(document.body).append('title','isItImportant','date','status','location','color');
}

function displayTask(task) {
    // create the syntax
    var syntax = `<div class='task card' style="${task.color}">
    <i class="far fa-star task-star task-section-sm"></i>
    <div class='task-desc'>        
        <h5>${task.title}</h5>
        <label>${task.description}</label>
    </div>
    <label class='task-section'>${task.dueDate}</label>
    <label class='task-section'>${task.location}</label>

    <div class='task-section-sm'>
        <i class="fas fa-trash" onclick="deleteTask(${task.id})"></i> 
    </div>

    </div>`;
    

    // append the syntax to existing html
    $("#tasks-list").append(syntax);
}

function retrieveData() {
    $.ajax({
        url: serverUrl + "/tasks",
        type:"GET",
        success: function(res){
            console.log("retrieving", res);

            for(let i=0; i < res.length; i++) {
                if(task.user === "Trey"){
                let task = res[1];
                displayTask(task);
                }
            } 
        },
        error: function(errorDet) {
            console.log("Error Retrieving", res);
        },

    });

    clearForm();

}

function deleteTask(id) {
    console.log("Should delete a task", id);

    //create an ajax 
    //url: serverUrl + '/tasks/' + id

    // on succe
}

function clearForm() {
    // clear an input, set its val to ''.           xxxxx.val('');
}

function testRequest() {
    $.ajax({
        url:"https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function(res) {
            console.log("Yeei it worked!!", res)
        },
        error: function(errorDetails) {
            console.log("Ouch we have an error :(", errorDetails)
        }
    });
}

function init() {
    console.log("Task Manager");

    $('#txtColor').spectrum({type: "component"});

    retrieveData();

    //events
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnDetails").click(toggleDetailsVisibility);
    
}

window.onload = init;


