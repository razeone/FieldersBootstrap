var url = "http://192.168.1.66:8081";

var socket;
var app =
{
	initialize: function()
	{
		this.bindEvents();
	},
	bindEvents: function()
	{
		document.addEventListener('deviceready', this.onStart, false);
		document.addEventListener('backbutton', this.onClose, false);
	},
	onStart: function()
	{
		var id = window.localStorage.getItem("id");

		var db = window.openDatabase("c4", "1.0", "C4 DB", 1000000);

		socket = io.connect(url);

		if( socket )
		{
			socket.emit("subscribe", id);

			socket.on("evento", function(evento)
			{
				db.transaction(function(tx)
				{
					tx.executeSql("insert into mensajes values(1,'" + evento.channel + "','" + evento.content + "')");
				},
				function(error)
				{
					alert("error inserting data: " + error);
				},
				function()
				{
					lista.innerHTML += (evento.channel + ": " + evento.content + "<br/>");
				});
			});
		}

		db.transaction(function(tx)
		{
			tx.executeSql("select * from mensajes", [], function(tx, results)
			{
				var num = results.rows.length;

				var lista = document.getElementById("lista");

				if( num > 0 )
				{
					for(var i = 0; i < num; i++)
					{
						var mensaje = results.rows.item(i);
						lista.innerHTML += (mensaje.canal + ": " + mensaje.mensaje + "<br/>");
					}
				}
				else
				{
					lista.innerHTML = "No hay mensajes nuevos";
				}
			},
			function(error)
			{
				alert("error getting data: " + error);
			});
		},
		function(error)
		{
			alert("error getting data: " + error);
		});
	},
	onClose: function()
	{
		if( socket ) { socket.disconnect(); }
		//navigator.app.exitApp();
		window.history.back();
	}
};

