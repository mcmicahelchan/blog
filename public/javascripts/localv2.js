
$().ready(function(){
	if ($("#hidden").html() == '1')
	{
		$("#uerr").show("fast");
	}
	else
	{
		$("#outline p").hide("fast");
	}
});
