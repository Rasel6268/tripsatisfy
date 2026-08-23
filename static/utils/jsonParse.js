const jsonParse = (jsonString) => {

    if(isValidJSON(jsonString)){
        return JSON.parse(jsonString);
    }else{
        return {};
    }

}

function isValidJSON(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
}


module.exports = jsonParse;