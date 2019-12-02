// ui stuff
window.onload = function ()
{
	var tabspace = '\xa0\xa0\xa0\xa0';

	var textarea_i = document.getElementById("a19_in");
	var textarea_o = document.getElementById("a19_out");
	var textarea_c = document.getElementById("a19_code");

	var select_d = document.getElementById("a19_picker");
	var button_g = document.getElementById("a19_go");

	for (var i=0; i<DF.length; ++i)
	{
		var DFI = DF[i]; var I = i.toString(); var II = (i+1).toString();
		var DFT = ' &nbsp;&bull;&nbsp; &quot;'+ DFI.title +'&quot;';
		var og = '<optgroup label="Day '+ II + DFT +'">';
		for (var p=0; p<DFI.parts.length; ++p)
		{
			var DFIP = DFI.parts[p]; var P = p.toString(); var PP = (p+1).toString()
			og += '<option value="'+ I +","+ P +'">Day '+ II +', Part '+ PP + DFT +'</option>';
		}
		select_d.innerHTML += og +'</optgroup>';
	}

	select_d.onchange = function ()
	{
		var sel = this.value.split(',');
		if (sel.length != 2) return false;
		var D = parseInt(sel[0]);
		var P = parseInt(sel[1]);
		var input = DF[D].input;
		var func = DF[D].parts[P];
		textarea_i.value = input;
		textarea_c.value = func.toString().replace(/\t/g,tabspace);
		textarea_o.value = func(input);
	}
}

// shorthands
var floor = Math.floor;

// actual solutions
var DF = [
{
	title: "The Tyranny of the Rocket Equation",
	input: "88519\n117448\n108285\n121718\n64281\n56719\n69305\n116255\n85453\n137199\n122492\n70729\n149169\n86016\n74378\n135644\n141249\n63641\n61727\n116510\n60001\n85691\n66437\n112556\n73871\n77359\n110859\n124192\n120229\n64408\n139830\n148029\n65862\n84766\n146598\n106148\n76313\n132619\n126445\n124908\n136279\n86875\n87832\n74624\n139808\n93470\n129969\n55892\n122861\n58742\n116963\n111110\n145501\n112617\n71513\n104804\n83016\n136218\n50194\n146859\n148831\n140601\n92783\n85701\n124258\n80228\n100029\n120209\n95788\n86545\n148580\n129744\n117411\n90408\n104237\n100642\n98879\n145146\n121711\n98084\n129186\n69759\n92088\n146954\n143940\n60302\n110277\n110550\n134676\n99848\n120876\n97516\n134259\n68168\n69821\n54549\n134847\n72155\n143606\n74241",
	parts: [
function (Input)
{
	var masses = Input.split("\n");
	var fuel = 0;
	for (var i=0; i<masses.length; ++i)
		fuel += floor(parseInt(masses[i]) / 3) - 2;
	return fuel;
},
function (Input)
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
]}
];
