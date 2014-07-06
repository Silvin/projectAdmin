$(document).ready(function(){


	$("#btnSaveClient").click(function(){

		//Guardamos el formulario 
		$("#loadingModal").modal("show");
		$.ajax({  
			  dataType	: "JSON",
			  url		: "/client/save-ajax",
			  type		: "POST",
			  data		: $("#frmNewClient").serialize(),
			  success	: function(result){
			  	  $("#myModal").modal('hide');
			  	  $("#clientid option:selected").each(function(index, val) {
			  	  	 $(this).removeAttr('selected');
			  	  });
			  	  $("#loadingModal").modal("hide");
			  	  
			  	  $("#clientid").append('<option selected="selected" value="' +  result._id.$oid + '">'+ result.name +'</option>');
			  	  $("#clientName").attr("value","");
			  	  $("#clientAddress").attr("value","");
			  	  $("#clientContactname").attr("value","");
			  	  $("#clientEmail").attr("value","");

		      }
	    }); 

	});
	
});