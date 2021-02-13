$(document).ready(function() {

/*******************************************************************************************************
 * Hover
 * *****************************************************************************************************/
    $(document).on('mouseenter', '.targy', function() {
        var SourceAddress = this.getAttribute("code");
        var PrereqArray = [];
        StateDataArray.forEach(subject => {    
            if(subject.code == SourceAddress){
                PrereqArray = subject.prereq;
            }
        });

        var cTargy_array = document.getElementsByClassName('targy');
        for (var i = 0; i < cTargy_array.length; ++i) {
            var code = cTargy_array[i].getAttribute("code");
            var uniquecode = cTargy_array[i].getAttribute("uniquecode");
            //elo
            PrereqArray.forEach(x => {
                if(x.includes("!") && x.includes("~")){ //azonos felev + alairas
                    var newCode = x.replace('!', '').replace('~', '');
                    if(newCode == code){
                        cTargy_array[i].className += " alairasAzonosfelev";
                    }
                }else if(x.includes("!")){ //azonos felev
                    var newCode = x.replace('!', '');
                    if(newCode == code){
                        cTargy_array[i].className += " azonosfelev";
                    }
                }else if(x.includes("~")){//alairas
                    var newCode = x.replace('~', '');
                    if(newCode == code){
                        cTargy_array[i].className += " alairas";
                    }
                }else{//sima elokovetelmeny
                    if(x == code){
                        cTargy_array[i].className += " elokovetelmeny";
                    }
                }
            });
            //uto
            var utoPrereqArray = [];
            StateDataArray.forEach(subject => {    
                if(subject.code == code && subject.code != ""){
                    utoPrereqArray = subject.prereq;
                }
                if(utoPrereqArray.length != 0){
                    utoPrereqArray.forEach(x => {
                        if(x.includes("!") && x.includes("~")){
                            var newCode = x.replace('!', '').replace('~', '');
                            if(newCode == SourceAddress){
                                if(!cTargy_array[i].className.includes("alairasAzonosfelevuto")){
                                    cTargy_array[i].className += " alairasAzonosfelevuto";
                                }
                            }
                        }else if(x.includes("!")){ //azonos felev
                            var newCode = x.replace('!', '');
                            if(newCode == SourceAddress){
                                if(!cTargy_array[i].className.includes("azonosfelevuto")){
                                    cTargy_array[i].className += " azonosfelevuto";
                                }
                            }
                        }else if(x.includes("~")){//alairas
                            var newCode = x.replace('~', '');
                            if(newCode == SourceAddress){
                                if(!cTargy_array[i].className.includes("alairasuto")){
                                    cTargy_array[i].className += " alairasuto";
                                }
                            }
                        }else{//sima elokovetelmeny
                            if(x == SourceAddress){
                                if(!cTargy_array[i].className.includes("utokovetelmeny")){
                                    cTargy_array[i].className += " utokovetelmeny";
                                }
                            }
                        }
                    });
                    // if(utoPrereqArray.some(x=> x == SourceAddress)){
                        // if(!cTargy_array[i].className.includes("utokovetelmeny")){
                        // cTargy_array[i].className += " utokovetelmeny";
                        // }
                    // }
                }
            });
            if(uniquecode != null){
            }
        }

    });

    $(document).on('mouseleave', '.targy', function() {
        var cTargy_array = document.getElementsByClassName('targy');
        for (var i = 0; i < cTargy_array.length; ++i) {
            cTargy_array[i].className = cTargy_array[i].className.replace(' alairasAzonosfelevuto', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' azonosfelevuto', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' alairasuto', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' alairasAzonosfelev', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' utokovetelmeny', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' azonosfelev', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' alairas', '');
            cTargy_array[i].className = cTargy_array[i].className.replace(' elokovetelmeny', '');
        }
    });

/*******************************************************************************************************
 * Click
 * *****************************************************************************************************/
    $(document).on('click', '.targy', function() {

        var code = "";
        var unique = "";
        code = this.getAttribute("code");
        if(this.hasAttribute("uniquecode")){
            unique = this.getAttribute("uniquecode");
        }

        var found = false;
        var index = 0;
        for(var j = 0; j < StateDataArray.length; j++){
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
                StateDataArray[index].status += 1;
                if(StateDataArray[index].status >=3){
                    StateDataArray[index].status = 0;
                }
            }
            //push info to infoBox
            document.getElementById("targyNev").innerHTML = StateDataArray[index].name;
            document.getElementById("targyKredit").innerHTML = StateDataArray[index].credit;
            document.getElementById("targyKod").innerHTML = StateDataArray[index].code;
            if(StateDataArray[index].substitutes === undefined){
                document.getElementById("targyaAlternativ").innerHTML = "Nincs";
            }else{
                document.getElementById("targyaAlternativ").innerHTML = "";
                if(StateDataArray[index].substitutes.length != 0){
                    for(var k = 0;k <StateDataArray[index].substitutes.length;k++){
                        document.getElementById("targyaAlternativ").innerHTML += "<div class='alterSubject'>" + (k+1) + ". " +StateDataArray[index].substitutes[k].name + " - <b>"+StateDataArray[index].substitutes[k].code + "<b>" + "</div>";
                        
                        
                    }
                }else{
                    document.getElementById("targyaAlternativ").innerHTML = "Nincs";                    
                }
            }

        }

        
        RefreshState();

        
    });

});