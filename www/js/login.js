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
		if( this.id != null )
		{
			window.localStorage.setItem("id", this.id);
			location.href = "index.html";
		}
	}
};

