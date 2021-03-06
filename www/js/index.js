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

		socket = io.connect(url);

		if( socket )
		{
			socket.emit("subscribe", id);

			socket.on("evento", function(evento)
			{
				var db = window.openDatabase("c4", "1.0", "C4 DB", 1000000);

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
					navigator.notification.alert(evento.content, function() {}, evento.channel);
					navigator.notification.vibrate(500);
				});
			});
		}
	},
	onClose: function()
	{
		if( socket ) { socket.disconnect(); }
		navigator.app.exitApp();
	},
	onExit: function()
	{
		if( socket ) { socket.disconnect(); }
		window.localStorage.removeItem("id");
		navigator.app.exitApp();
	}
};

