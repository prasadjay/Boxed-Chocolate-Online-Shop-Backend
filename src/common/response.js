module.exports.Error =(message, data) =>{
    let obj =  {
        status: false,
        message: message
    };

    if (data != undefined){
        obj.data = data;
    }
    return obj;
}

module.exports.Success =(message, data) =>{
    let obj =  {
        status: true,
        message: message
    };

    if (data != undefined){
        obj.data = data;
    }
    return obj;
}