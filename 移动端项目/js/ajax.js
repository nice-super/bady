function promiseAjax(json){
    let url = json.url;
    let method = json.method || 'GET';
    let data = json.data || {};
    let str = '';
    for(let k in data){
        str += k + '=' +data[k] + '&';
    }
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        if(method.toLowerCase()=='get'){
            xhr.open(method,`${url}?${str}_=${new Date().getTime()}`,true);
            xhr.send();
        }else if(method.toLowerCase()=='post'){
            xhr.open(method,url,true);
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            xhr.send(str.slice(0,str.lastIndexOf("&")));
        }
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState==4){
                if(xhr.status.toString().startsWith("2")){
                    resolve(xhr.responseText);
                }else{
                    throw new Error(xhr.status);
                }
            }
        }
    })
}