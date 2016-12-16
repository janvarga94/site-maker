document.body.onmousedown=function(e){
	if(e.which!=1) return;				//if is not left click return, if is start creating element
		newEl=document.createElement(document.getElementById('whichTag').value);
		newEl.style.backgroundColor='rgba(0,0,0,0.1)';
		newEl.style.position='absolute';
		newEl.style.left=e.pageX-getOffset(selected.el).left;
		newEl.style.top=e.pageY-getOffset(selected.el).top;	
		newEl.oncontextmenu= function(ev) {						//so that we could select it
		    ev.stopPropagation();
		    ev.preventDefault();
		    if(ev.which==3){
		    	changeSelection(this);
		    }
		    return false;
		};
		selected.el.appendChild(newEl);
	mouseDown.startX=e.pageX;
	mouseDown.startY=e.pageY;	
}
document.body.onmousemove=function(ev) {	
	if(ev.which!=1) return;	
	var whatToChange=(el('radR1').checked ? selected.el.style : selected.el);
    if(newEl!=null){ 			//if we are creating then change size with dragging
			var newWhatToChange=(el('radR1').checked ? newEl.style : newEl);
			newWhatToChange.width=ev.pageX-mouseDown.startX;
			if(Keyboard.keyToBool['SHIFT'])	 //if is pressed shift that resize proportionally
									newWhatToChange.height=newEl.style.width;
			else					
									newWhatToChange.height=ev.pageY-mouseDown.startY;
	}
	if(mouseDown.leftTop){		// if changing size with left top corner
	 	if(Keyboard.keyToBool['SHIFT']){ //if is pressed shift that resize proportionally
	 		selected.el.style.left=ev.pageX-getOffset(selected.el.parentElement).left;
			selected.el.style.top=ev.pageX-mouseDown.startX+mouseDown.startY-selected.el.parentElement.offsetTop;

			whatToChange.width=mouseDown.startWidth-(ev.pageX-mouseDown.startX);
			whatToChange.height=mouseDown.startHeight-mouseDown.startWidth+parseInt(whatToChange.width);
	 	}else{
			selected.el.style.left=ev.pageX-getOffset(selected.el.parentElement).left;
			selected.el.style.top=ev.pageY-getOffset(selected.el.parentElement).top;
			
			whatToChange.width=mouseDown.startWidth-(ev.pageX-mouseDown.startX);
			whatToChange.height=mouseDown.startHeight-(ev.pageY-mouseDown.startY);
		}			
		fixReplace(selected.el);
	}
	if(mouseDown.rightBottom){	// if changing size with right bottom corner
		if(Keyboard.keyToBool['SHIFT']){ //if is pressed shift that resize proportionally
			whatToChange.width=mouseDown.startWidth+ev.pageX-mouseDown.startX;
			whatToChange.height=mouseDown.startHeight+parseInt(whatToChange.width)-mouseDown.startWidth;
		}else{
			whatToChange.width=mouseDown.startWidth+ev.pageX-mouseDown.startX;
			whatToChange.height=mouseDown.startHeight+ev.pageY-mouseDown.startY;
		}
		fixReplace(selected.el);
	}
	if(mouseDown.replace){		//if replacing
		selected.el.style.left=ev.pageX-getOffset(selected.el).width/2-getOffset(selected.el.parentElement).left;
		selected.el.style.top=ev.pageY-getOffset(selected.el).height/2-getOffset(selected.el.parentElement).top;
		fixReplace(selected.el);
	}
	if(mouseDown.leftTopRot || mouseDown.rightBottomRot){		//if rotating
		var deg=ev.pageX-mouseDown.startX;
			selected.el.style['transform']='rotate('+ deg  +'deg)';
	}
}
document.body.onmouseup=function(ev) {		 						
		    var distanceX=Math.abs(mouseDown.startX-ev.pageX);			//measuring distance
			var distanceY=Math.abs(mouseDown.startY-ev.pageY);

			if(distanceX*distanceY<2000 && newEl!=null)		//if surface is less that 2k px x px  that delete created element
				selected.el.removeChild(newEl);	
			
			mouseDown.leftTop=
			mouseDown.leftTopRot=
			mouseDown.rightBottom=
			mouseDown.rightBottomRot=
			mouseDown.replace=
									false;
			newEl=null;
};
document.body.oncontextmenu=function(ev) {
		    ev.preventDefault();    //we dont want menu to appear
		    if(ev.which==3){ 
		   		changeSelection(document.body);
		    }
};
document.body.ondragstart = function() { return false; }  // draggig is causing bugs

document.getElementById('leftTop').onmousedown=
document.getElementById('rightBottom').onmousedown=
document.getElementById('leftTopRot').onmousedown=
document.getElementById('rightBottomRot').onmousedown=
document.getElementById('replace').onmousedown=
		function(e){
				e.stopPropagation();
				if(e.which!=1) return;
				mouseDown[this.id]=true;
				mouseDown.startWidth=getOffset(selected.el).width;
				mouseDown.startHeight=getOffset(selected.el).height;
				mouseDown.startX=e.pageX;
				mouseDown.startY=e.pageY;
		}

el('radR1').onchange = 
el('radR2').onchange = function(){						//switching sizes style and attr
							if(el('radR1').checked){			
								console.log("here1");
								selected.el.style.width = selected.el.width;
								selected.el.style.height = selected.el.height;

								selected.el.removeAttribute('width');	
								selected.el.removeAttribute('height');		
									
							}else{	
								console.log(selected.el.style.width.int());
								selected.el.width = selected.el.style.width.int();
								selected.el.height = selected.el.style.height.int();


								selected.el.style.width=null;
								selected.el.style.height=null;	
							}
						}			