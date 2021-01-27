
var StateDataArray = [];


function pageInit(_branch){
    //load state data array
    InitStateDataArray();


    //Create HTML objects for each semester
    //load dropdown menu
    LoadSpecNames("szerkezet");
    //torzsanyag
    LoadSubjectElements();
    
    //agazat + spec
    jQuery(function($) {
		var spec = $("#Specializations").find(':selected').attr('data-szak');
        LoadBranchElements(_branch,spec);
        LoadSpecElements(_branch,spec);
        SetActive();
        RefreshState();
    });
}

function RefreshState(){
    SetState();
    SetColor();
}
function SetActive(){
    //reset
    StateDataArray.forEach(item => {
        item.active = 0;
    });
    var subject_array = document.getElementsByClassName('targy');
    for (var i = 0; i < subject_array.length; ++i) {
        var item = subject_array[i];  
        var code = "";
        var unique = "";
        code = item.getAttribute("code");
        if(item.hasAttribute("uniquecode")){
            unique = item.getAttribute("uniquecode");
        }
        for(var j =0;j<StateDataArray.length;j++){
            if(StateDataArray[j].uniquecode !== undefined){
                if(StateDataArray[j].uniquecode == unique){
                    //item found
                    StateDataArray[j].active = 1;
                    break;
                }
            }else if(StateDataArray[j].code == code){
                    //item found
                    StateDataArray[j].active = 1;
                    break;
            }

        }
    }
}
function InitStateDataArray(){
    //emty array
    StateDataArray = [];

    subjectsData.Groups.forEach(branch => {
        //iterate branches (torzs + agazat)
        branch.subjects.forEach(subject =>{
            //load all subject from group
            var newsubject ={
                type: branch.type,
                name:subject.name,
                code:subject.code,
                uniquecode:subject.uniquecode,
                prereq:subject.elo,
                substitues:subject.substitues,
                status:0, //0 - nem felvett, 1 -felvett, 2 - teljesitett
                felveheto:0, //0 - nem felveheto, 1 -felveheto
                specprereq:0,
                active:0,
            };
            StateDataArray.push(newsubject);
        });
        if("specializations" in branch){
            branch.specializations.forEach(spec=>{
                //iterate specs
                spec.subjects.forEach(specSubject =>{
                    //load all subject from spec
                    var newsubject ={
                        type: branch.type,
                        name:specSubject.name,
                        code:specSubject.code,
                        uniquecode:specSubject.uniquecode,
                        prereq:specSubject.elo,
                        substitues:specSubject.substitues,
                        status:0,
                        felveheto:0,
                        specprereq:0,
                        active:0,
                    };
                    StateDataArray.push(newsubject);
                });
            });
        }
    });

}

function ClearDataForBranchSubjects(){
    StateDataArray.forEach(item =>{
        if(item.type != "torzs"){
            item.status = 0;
            item.felveheto = 0;
        }
    });
}
function SetState(){
    StateDataArray.forEach(item =>{
        //check for prequirements
        if(item.prereq.length == 0){
            item.felveheto = 1;
        }else{
            var AllCompleted = true;
            item.prereq.forEach(preSubject =>{
                // var
                for(var i = 0; i<StateDataArray.length;i++){
                    if(StateDataArray[i].code == preSubject && StateDataArray[i].active == 1){
                        if(StateDataArray[i].status != 2){
                            AllCompleted = false;
                            break;
                        }
                    }   
                }
                if(AllCompleted){
                    item.felveheto = 1;
                }else{
                    // item.felveheto = 0;
                }
            });
        }
    
    });
}




/*******************************************************************************************************
 * Colour
 * *****************************************************************************************************/
function SetColor(){

    var subject_array = document.getElementsByClassName('targy');
    for (var i = 0; i < subject_array.length; ++i) {
        var item = subject_array[i];  
        var code = "";
        var unique = "";
        code = item.getAttribute("code");
        if(item.hasAttribute("uniquecode")){
            unique = item.getAttribute("uniquecode");
        }
        var found = false;
        var index = 0;
        for(var j =0;j<StateDataArray.length;j++){
            if(StateDataArray[j].uniquecode !== undefined){
                if(StateDataArray[j].uniquecode == unique){
                    //item found
                    found = true;
                    index = j;
                    break;
                }
            }else{
                if(StateDataArray[j].code == code){
                    //item found
                    found = true;
                    index = j;
                    break;
                }
            }

        }
        if(found){
            if(StateDataArray[index].felveheto == 1){
                if(StateDataArray[index].status == 0){
                    item.className = "targy felveheto";
                }else if(StateDataArray[index].status == 1){
                    item.className = "targy felvett";
                }else if(StateDataArray[index].status == 2){
                    item.className = "targy teljesitett";
                }
            }else if (StateDataArray[index].felveheto == 0){
                item.className = "targy";
            }
        }
    }
}
