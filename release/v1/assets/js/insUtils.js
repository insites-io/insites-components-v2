const camelCaseToDash = function(myStr){
	return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

module.exports = {
    camelCaseToDash
}