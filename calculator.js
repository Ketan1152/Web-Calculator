var res, solveCalled=false;
var operands = ["+","-","x","÷"];
function numClicked(num){
    if (document.getElementById("display-output").innerText=="" || (operands.includes(document.getElementById("display").innerText.slice(-1)) && document.getElementById("display-output").innerText==res)) {
        document.getElementById("display-output").innerText=num;
    } else{
        if(num=="." && document.getElementById("display-output").innerText.includes(".")){
            return;
        }
        document.getElementById("display-output").innerText+=num;
    }
}
function clearDisplay(){
    document.getElementById("display").innerText="";
    document.getElementById("display-output").innerText="";
}
function pop(){
    if(solveCalled){
        document.getElementById("display").innerText="";
        solveCalled=false;
    } else{
        document.getElementById("display").innerText=document.getElementById("display").innerText.slice(0,-1);
    }
}
function signChange(){
    document.getElementById("display-output").innerText=-parseFloat(document.getElementById("display-output").innerText);
}
// function reciprocal(){
//     if (document.getElementById("display")!=""){
//         document.getElementById("display").innerText="1/("+document.getElementById("display").innerText+")";
//     }
// }
function operation(oper){
    if(solveCalled){
        document.getElementById("display").innerText="";
        solveCalled=false;
    }
    var lastExp = document.getElementById("display").innerText.slice(-1);
    if(operands.includes(lastExp) || lastExp=="."){
        if(res==document.getElementById("display-output").innerText){
            document.getElementById("display").innerText = document.getElementById("display").innerText.slice(0,-1)+oper;
        } else{
            document.getElementById("display").innerText+=document.getElementById("display-output").innerText+oper;
            res=document.getElementById("display-output").innerText;
        }
    } else{
        res=parseFloat(document.getElementById("display-output").innerText);
        document.getElementById("display").innerText += res;
        document.getElementById("display").innerText += oper;
    }
}

function solve(){
    if(document.getElementById("display").innerText==""){
        return;
    }
    var expression, signPositive;
    solveCalled=true;
    if(document.getElementById("display-output").innerText!=res){
        document.getElementById("display").innerText+=document.getElementById("display-output").innerText;
    }
    if(operands.includes(document.getElementById("display").innerText.slice(-1)) && document.getElementById("display").innerText.slice(-1)!="."){
        expression = document.getElementById("display").innerText.slice(0,-1);
    } else{
        expression = document.getElementById("display").innerText;
    }
    temp=expression;
    res=parseFloat(temp);
    temp=temp.slice(`${res}`.length);
    while(temp!=""){
        var operand =temp.slice(0,1);
        temp=temp.slice(1);
        num2=parseFloat(temp);
        switch(operand){
            case operands[0]:
                res+=num2;
                break;
            case operands[1]:
                res-=num2;
                break;
            case operands[2]:
                res*=num2;
                break;
            case operands[3]:
                res/=num2;
                break;
            default:
                break;
        }
        temp=temp.slice(`${num2}`.length);
    }
    document.getElementById("display-output").innerText=res;
    console.log(res);
}