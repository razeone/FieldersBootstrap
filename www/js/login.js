var app =
{
	initialize: function()
	{
		this.bindEvents();
	},
	bindEvents: function()
	{
		document.addEventListener('deviceready', this.onStart, false);
	},
	onStart: function()
	{
		if( window.localStorage.getItem("id") )
		{
			location.href = "index.html";
		}
	},
	onSetId: function(field)
	{
		this.id = field.value;
	},
	onLogin: function()
	{
		if( this.id != null && this.id != "" )
		{
			this.createSesion();
		}
		else
		{
			alert("El ID es obligatorio");
		}
	},
	createSesion: function()
	{
		window.localStorage.setItem("id", this.id);

		var db = window.openDatabase("c4", "1.0", "C4 DB", 1000000);

		db.transaction(function(tx)
		{
			tx.executeSql("drop table if exists mensajes");
			tx.executeSql("create table if not exists mensajes(id integer, canal varchar(20), mensaje varchar(50))");
		},
		function(error)
		{
			alert("error creating db: " + error);
			navigator.app.exitApp();
		},
		function()
		{
			location.href = "index.html";
		});
	}
};

