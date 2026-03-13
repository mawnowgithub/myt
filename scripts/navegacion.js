$(document).ready ( function(){
	
/* funcion para controlar el historial con el boton atras */
$(window).bind("hashchange", function(){
	
	var destino=document.location.hash;
	
	/*moverse entre pagina principal y ayuda*/
	
	if(destino=="#principal"){
	$("#contenedor-superior-interfaz").removeClass("bajar");
	$("#contenedor-inferior-interfaz").addClass("mostrar");;	

	}else if(destino== "#pagina_ayuda"){
	$("#contenedor-superior-interfaz").addClass("bajar");
	$("#contenedor-inferior-interfaz").removeClass("mostrar");
		
	}else if(destino=="#home" && reiniciando==true){
		
	$("#confirmar-salir").addClass("mostrar");
	
	$("#boton-cancelar").click(function(){	
	$("#confirmar-salir").removeClass("mostrar");
	document.location.hash="principal";
	});
	
	$("#boton-aceptar").click(function(){
	$("#confirmar-salir").removeClass("mostrar");	
	reiniciar();
	});
	
			
	}else if(destino="#home" && reiniciando==false){
		
		reiniciando=true;
	}
	
	
/* funcion para volver a ir al home al actualizar la página*/

	
});

})