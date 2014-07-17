module.exports = function(app){

	console.log("Listo para enrutar peticiones.");

	// TABLE USERS
	require("./routes_user")(app);

}