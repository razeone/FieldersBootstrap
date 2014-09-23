$(function(){
	$('head').load('templates/head.html');
	$('#header').load('templates/header.html');
	$('#homeButton').click(function(){
		console.log('Ola k ase');
		window.location.href = 'index.html';
	});
});