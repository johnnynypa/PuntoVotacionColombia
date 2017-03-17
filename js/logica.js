var cedulas = new Array();
var depar = new Array();
var muni = new Array();
var puesto = new Array();
var direccion = new Array();
var fecha = new Array();
var mesa = new Array();


function imp(){
	var output = "";
	for(var i =0; i < cedulas.length; i++){
		output+=cedulas[i]+'@&%'+depar[i].split('<')[0]+'@&%'+muni[i]+'@&%'+puesto[i]+'@&%'+direccion[i]+'@&%'+fecha[i]+'@&%'+mesa[i]+'\n';
	}
	return output;
}

var elem = document.getElementById('descargar');

elem.download = "archivo.txt";


var loadDatas = function(){
	var cc = $("#cc").val();
    $.ajax({
        url: "controller/scraping.php",
        method: "get",
        dataType: "text",
        data:{
            nCedula:cc,
        },
        success: function(respuesta){
					try{
						var tabla = respuesta.split('<table')[1].split('</table')[0].split('class="tblbgcolort">');
						if(tabla){
							cedulas.push(cc);
							depar.push(tabla[2].split('</td></tr><tr><td class="tblbgcolor"><strong>Municipio:</strong></td><td class="tblbgcolor">')[0].split('</td>')[0]+'</td>');
							muni.push(tabla[2].split('</td></tr><tr><td class="tblbgcolor"><strong>Municipio:</strong></td><td class="tblbgcolor">')[0].split('</td>')[2].split('<td class="tblbgcolor">')[1]);
							puesto.push(tabla[3].split('<td>')[2].split('</td>')[0]);
							direccion.push(tabla[3].split('<td>')[2].split('div')[1].split('>')[1].split('<')[0]);
							fecha.push(tabla[4].split('<td>')[2].split('<')[0]);
							mesa.push(tabla[4].split('<td>')[2].split('<td class="tblbgcolor">')[2].split('<')[0]);
							llenarTabla();
						}else{
							alert("Documento no valido");
						}
					}catch(err){
						alert("Ha ocurrido un error, verifique el documento y su conexion a internet");
					}
          
        }
    });
}



function llenarTabla(){
	var output = '<table class="table"><thead><tr><td>Cedula</td><td>Departamento</td><td>Municipio</td><td>Puesto</td><td>Dirección Puesto</td><td>Fecha de inscripción</td><td>Mesa</td></tr></thead><tbody>';
	for(var i =0; i < cedulas.length; i++){
		output += '<tr><td>'+cedulas[i]+'</td>';
		output += '<td>'+depar[i]+'</td>';
		output += '<td>'+muni[i]+'</td>';
		output += '<td>'+puesto[i]+'</td>';
		output += '<td>'+direccion[i]+'</td>';
		output += '<td>'+fecha[i]+'</td>';
		output += '<td>'+mesa[i]+'</td></tr>';
	}
  output+= '</tbody></table>';
	$('#DatTable').html(output);
	elem.href = "data:application/octet-stream,"+ encodeURIComponent(imp());
}