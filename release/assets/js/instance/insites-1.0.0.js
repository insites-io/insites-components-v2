Insites = (() => {
  let methods = {}, version = "v1.0.0";

  function addMethods(method){
    let validated = false;
    if (typeof method === "function" && method.name){
      validated = {
        [`${method.name}`]: method
      }
    } else if (typeof method === "object" && !Array.isArray(method)){
      validated = method;
    }

    if (validated){
      Object.assign(methods, validated);
    } // else console.error("Insites addMethod ")
  }

  return { version, methods, addMethods }
})();
