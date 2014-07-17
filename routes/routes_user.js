module.exports = function(app){

	var mysql=require("mysql");
	var config=require("../config/config");

	var client = mysql.createConnection({
	  user: config.mariaDB.user,
	  password: config.mariaDB.password,
	  host: config.mariaDB.host,
	  port: config.mariaDB.port,
	  database: config.mariaDB.database
	});

	// GET

	var findAllUsers = function(req, res){
		client.query('SELECT user_id, user_name, user_pass, user_mail, user_profile, DATE_FORMAT(user_last_connection, "%d/%m/%Y %H:%i:%S") as user_last_connection FROM users',
	      function (err_users, results_users, fields_users) {
	        if (err_users) {
	            console.log("Error en la función findAllUsers: " + err_users.message);
	            res.send("{ERROR: "+err_users.message+"}");
	        }else{
	          console.log("Consulta de usuarios realizada con exito.");
	          res.json(results_users);
	        }
	      }
	  );
	}

	// GET

	var findOneUser = function(req, res){
		client.query('SELECT user_id, user_name, user_pass, user_mail, user_profile, DATE_FORMAT(user_last_connection, "%d/%m/%Y %H:%i:%S") as user_last_connection FROM users WHERE user_id="'+req.params.id+'"',
	      function (err_user, results_user, fields_user) {
	        if (err_user) {
	            console.log("Error en la función findOneUser: " + err_user.message);
	            res.send("{ERROR: "+err_user.message+"}");
	        }else{
	          console.log("Consulta de usuario realizada con exito.");
	          res.json(results_user);
	        }
	      }
	  );
	};

	// POST

	var saveUser = function(req, res){
		client.query('INSERT INTO users (user_id, user_name, user_pass, user_mail, user_profile) values ("'+req.body.user_id+'","'+req.body.user_name+'","'+req.body.user_pass+'","'+req.body.user_mail+'","'+req.body.user_profile+'")',
	      function (err_user, results_user, fields_user) {
	        if (err_user) {
	            console.log("Error en la función saveUser: " + err_user.message);
	            res.send("{ERROR: "+err_user.message+"}");
	        }else{
	          console.log("Usuario guardado con éxito.");
	          findAllUsers(req,res); // Si ha ido bien devolvemos todos los usuarios.
	        }
	      }
	  );
	};

	// PUT

	var changeUser = function(req, res){
		client.query('UPDATE users SET user_name="'+req.body.user_name+'", user_pass="'+req.body.user_pass+'", user_mail="'+req.body.user_mail+'", user_profile="'+req.body.user_profile+'" WHERE user_id="'+req.params.id+'"',
	      function (err_user, results_user, fields_user) {
	        if (err_user) {
	            console.log("Error en la función changeUser: " + err_user.message);
	            res.send("{ERROR: "+err_user.message+"}");
	        }else{
	          console.log("Usuario modificado con éxito.");
	          findOneUser(req,res); // Si ha ido bien devolvemos los datos actualizados del usuario.
	        }
	      }
	  );
	};

	// DELETE

	var deleteUser = function(req, res){
		client.query('DELETE FROM users WHERE user_id="'+req.params.id+'"',
	      function (err_user, results_user, fields_user) {
	        if (err_user) {
	            console.log("Error en la función deleteUser: " + err_user.message);
	            res.send("{ERROR: "+err_user.message+"}");
	        }else{
	          console.log("Usuario eliminado con éxito.");
	          findAllUsers(req,res); // Si ha ido bien devolvemos todos los usuarios.
	        }
	      }
	  );
	}

	// Routes
	app.get("/usuarios/",findAllUsers);
	app.get("/usuarios/:id",findOneUser);
	app.post("/usuarios/",saveUser);
	app.put("/usuarios/:id",changeUser);
	app.delete("/usuarios/:id",deleteUser);

}