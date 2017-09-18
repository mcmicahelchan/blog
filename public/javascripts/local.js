$("h1").hover(function(){console.log("yes");});

$().ready(function(){
	$("p").hide("fast");
	console.log("ok");
	$("#registerForm").submit(function() {
		var mes = $("#registerForm input");
		var warn = $("#registerForm p");
		return check(mes, warn);
	});
	$("#reset").click(function() {

		$("#outline p").hide("fast");
		$("input").removeClass("error");
		$("#nrepeat").removeClass("nrepeat_show").addClass("nrepeat_dis");
		$("#irepeat").removeClass("irepeat_show").addClass("irepeat_dis");
		$("#prepeat").removeClass("prepeat_show").addClass("prepeat_dis");
		$("#erepeat").removeClass("erepeat_show").addClass("erepeat_dis");
	});
	if ($("#hidden").html() == '0')
	{
		$("#nrepeat").removeClass("nrepeat_show").addClass("nrepeat_dis");
		$("#irepeat").removeClass("irepeat_show").addClass("irepeat_dis");
		$("#prepeat").removeClass("prepeat_show").addClass("prepeat_dis");
		$("#erepeat").removeClass("erepeat_show").addClass("erepeat_dis");
	}
	if ($("#hidden").html() == '1')
	{
		$("#nrepeat").addClass("nrepeat_show").removeClass("nrepeat_dis");
	}
	if ($("#hidden").html() == '2')
	{
		$("#irepeat").addClass("irepeat_show").removeClass("irepeat_dis");
	}
	if ($("#hidden").html() == '3')
	{
		$("#prepeat").addClass("prepeat_show").removeClass("prepeat_dis");
	}
	if ($("#hidden").html() == '4')
	{
		$("#erepeat").addClass("erepeat_show").removeClass("erepeat_dis");
	}


});

$("input").focus(function(){
	$(this).addClass("tianxie");
});

function check(inputs,warning)
{
	var valid = true;
	if (!checkUsername($(inputs[0]).val()))
	{
		$(warning[0]).show("fast");
		$(inputs[0]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[0]).hide("fast");
		$(inputs[0]).removeClass("error");
	}
	if (!checkId($(inputs[1]).val()))
	{
		$(warning[1]).show("fast");
		$(inputs[1]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[1]).hide("fast");
		$(inputs[1]).removeClass("error");
	}
	if (!checkTelephone($(inputs[2]).val()))
	{
		$(warning[2]).show("fast");
		$(inputs[2]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[2]).hide("fast");
		$(inputs[2]).removeClass("error");
	}
	if (!checkMail($(inputs[3]).val()))
	{
		$(warning[3]).show("fast");
		$(inputs[3]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[3]).hide("fast");
		$(inputs[3]).removeClass("error");
	}
	if (!checkPassword($(inputs[4]).val()))
	{
		$(warning[4]).show("fast");
		$(inputs[4]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[4]).hide("fast");
		$(inputs[4]).removeClass("error");
	}
	if (($(inputs[4]).val()) != ($(inputs[5]).val()))
	{
		$(warning[5]).show("fast");
		$(inputs[5]).addClass("error");
		valid = false;
	}
	else
	{
		$(warning[5]).hide("fast");
		$(inputs[5]).removeClass("error");
	}
	return valid;
}

function checkUsername(username)
{
	return username.match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null;
}
function checkId(studentId)
{
	return studentId.match(/^[1-9]{1}[0-9]{7}$/) != null;
}
function checkTelephone(tele)
{
	return tele.match(/(^[1-9]{1}[0-9]{10}$)/) != null;
}
function checkMail(mailbox)
{
	return mailbox.match(/^[0-9a-zA-Z_\-]+@(([0-9a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) != null;
}
function checkPassword(password)
{
	return password.match(/^[0-9a-zA-Z-_]{6,12}$/) != null;
}

