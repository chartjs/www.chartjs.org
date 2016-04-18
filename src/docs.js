export default (sectionID, blocks = [1,0], canvasIndex = 0) => {
	let section = document.getElementById(sectionID);

	let canvas = section.querySelectorAll('canvas')[canvasIndex];

	let codeElements = section.querySelectorAll('code.lang-javascript');

	let code = blocks.map((index)=>{
		return codeElements[index].textContent;
	}).join('');


	try {
		new Function(['ctx', 'options'], code)(canvas, {});
	}
	catch(err){	}

}
