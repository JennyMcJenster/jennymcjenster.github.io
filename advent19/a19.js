// shorthands
var floor = Math.floor;
var ceil = Math.ceil;

// ui stuff
window.onload = function ()
{
	var tabspace = '\xa0\xa0\xa0\xa0';

	var textarea_i = document.getElementById("a19_in");
	var textarea_o = document.getElementById("a19_out");
	var textarea_c = document.getElementById("a19_code");

	var select_d = document.getElementById("a19_picker");
	var button_t = document.getElementById("a19_time");

	for (var i=0; i<DF.length; ++i)
	{
		var DFI = DF[i]; var I = i.toString(); var II = (i+1).toString();
		var DFT = ' &nbsp;&bull;&nbsp; '+ DFI.title;
		var og = '<optgroup label="'+ II + DFT +'">';
		for (var p=0; p<DFI.parts.length; ++p)
		{
			var DFIP = DFI.parts[p]; var P = p.toString(); var PP = (p+1).toString()
			og += '<option value="'+ I +","+ P +'">'+ II +'.'+ PP + DFT +'</option>';
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
		button_t.onclick = function ()
		{
			var T0 = performance.now();
			textarea_o.value = func(input);
			var T1 = performance.now();
			var perftime = ceil((T1-T0) * 10) / 10;
			button_t.innerText = "~"+ String(perftime) +" ms";
		}
		button_t.onclick();
	}
}

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
]},{
	title: "1202 Program Alarm",
	input: "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,23,5,27,2,27,10,31,1,31,9,35,1,35,5,39,1,6,39,43,2,9,43,47,1,5,47,51,2,6,51,55,1,5,55,59,2,10,59,63,1,63,6,67,2,67,6,71,2,10,71,75,1,6,75,79,2,79,9,83,1,83,5,87,1,87,9,91,1,91,9,95,1,10,95,99,1,99,13,103,2,6,103,107,1,107,5,111,1,6,111,115,1,9,115,119,1,119,9,123,2,123,10,127,1,6,127,131,2,131,13,135,1,13,135,139,1,9,139,143,1,9,143,147,1,147,13,151,1,151,9,155,1,155,13,159,1,6,159,163,1,13,163,167,1,2,167,171,1,171,13,0,99,2,0,14,0",
	parts: [
function (Input)
{
	var I = Input.split(",");
	I[1] = "12"; I[2] = "2";
	var IL = I.length;
	var curpos = 0;
	var get_io = function (p_opcode)
	{
		if (p_opcode+3 >= IL) return "Input too short to get i/o";
		var vpos_a = parseInt(I[p_opcode+1]);
		if (vpos_a >= IL) return "IO index (input 1) out of range";
		var vpos_b = parseInt(I[p_opcode+2]);
		if (vpos_b >= IL) return "IO index (input 2) out of range";
		var vpos_o = parseInt(I[p_opcode+3]);
		if (vpos_o >= IL) return "IO index (output) out of range";
		return [parseInt(I[vpos_a]), parseInt(I[vpos_b]), vpos_o];
	};
	var oplist = {
		"1": function (Pos) {
			var IO = get_io(Pos);
			if (typeof IO === "string") return IO;
			I[IO[2]] = IO[0] + IO[1];
			return 4; // move pointer by 4
		},"2": function (Pos) {
			var IO = get_io(Pos);
			if (typeof IO === "string") return IO;
			I[IO[2]] = IO[0] * IO[1];
			return 4; // move pointer by 4
		},"99": function (Pos) {
			return false; // halt program
		}
	};
	while (curpos < IL)
	{
		var opcode = I[curpos];
		if (opcode in oplist)
		{
			var opres = (oplist[opcode])(curpos);
			if (typeof opres === "string") return opres;
			if (opres == false) return I[0]; // result
			if (typeof opres === "number")
			{ curpos += opres; continue; }
		}
		return "Unexpected stop";
	}
	return I.join(",");
},
function (Input)
{
	var IS = Input.split(","); var IL = IS.length;
	for (var i=0; i<IL; ++i) IS[i] = parseInt(IS[i]);
	var I = new Array();
	var expect = 19690720;
	for (var noun=0; noun<100; ++noun)
		for (var verb=0; verb<100; ++verb)
	{
		I[0] = IS[0]; I[1] = noun; I[2] = verb;
		for (var i=3; i<IL; ++i) I[i] = IS[i];
		var Pos = 0;
		var Run = true;
		while (Run && Pos < IL) {
			switch (I[Pos]) {
				case 1: // ADD and jump 4
					I[I[Pos+3]] = I[I[Pos+1]] + I[I[Pos+2]];
					Pos += 4; break;
				case 2: // MULTIPLY and jump 4
					I[I[Pos+3]] = I[I[Pos+1]] * I[I[Pos+2]];
					Pos += 4; break;
				case 99: // HALT program for result
					if (I[0]==expect) return I[1]*100 + I[2];
					Run = false; break;
				default: return "Unknown opcode";
			}
		}
		if (Pos >= IL) return "Unresolved stop";
		continue;
	}
	return "Result not reached";
}
]}
];
