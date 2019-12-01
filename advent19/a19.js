// ui stuff
window.onload = function ()
{
	var textarea_i = document.getElementById("a19_in");
	var textarea_o = document.getElementById("a19_out");

	var select_d = document.getElementById("a19_day");
	var button_g = document.getElementById("a19_go");

	button_g.onclick = function ()
	{
		var val_i = textarea_i.value;
		var day = select_d.value;
		textarea_o.value = (val_i == "")
			? "NO INPUT GIVEN" : (day == "")
				? "NO DAY SELECTED" : (DF[day])(val_i);
	}
}

// shorthands
var floor = Math.floor;

// actual solutions
var DF = {
	// Day 1 - The Tyranny of the Rocket Equation
	"1_1" : function (Input)
	{
		var masses = Input.split("\n");
		var fuel = 0;
		for (var i=0; i<masses.length; ++i)
			fuel += floor( parseInt(masses[i]) / 3 ) - 2;
		return fuel;
	},
	"1_2" : function (Input)
	{
		var masses = Input.split("\n");
		var fuel = 0;
		for (var i=0; i<masses.length; ++i)
		{
			var ifuel = parseInt(masses[i]);
			while (true) {
				ifuel = floor(ifuel / 3) - 2;
				if (ifuel > 0) fuel += ifuel;
				else break;
			}
		}
		return fuel;
	}
};
