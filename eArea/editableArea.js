/*
    Copyright � 2006, 2008 Oliver Moran

    This file is part of eArea.

    eArea is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    eArea is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with eArea.  If not, see <http://www.gnu.org/licenses/>.
*/

function insertEditableArea(editableAreaName, editableAreaWidth, editableAreaHeight, editableAreaLayout, editableAreaStyle) {
	var boldButton = '<img src="eArea/icons/stock_text_bold.png" value="Bold" alt="Bold" name="' + editableAreaName + '" class="editableAreaButton" id="bold" style="width:24px; height:24px;">';
	var italicButton = '<img src="eArea/icons/stock_text_italic.png" value="Italic" alt="Italic" name="' + editableAreaName + '" class="editableAreaButton" id="italic" style="width:24px; height:24px;">';
	var underlinedButton = '<img src="eArea/icons/stock_text_underlined.png" value="Underlined" alt="Underlined" name="' + editableAreaName + '" class="editableAreaButton" id="underline" style="width:24px; height:24px;">';
	var alignLeftButton = '<img src="eArea/icons/stock_text_left.png" value="Align Left" alt="Align Left" name="' + editableAreaName + '" class="editableAreaButton" id="justifyleft" style="width:24px; height:24px;">';
	var justifyButton = '<img src="eArea/icons/stock_text_justify.png" value="Justify" alt="Justify" name="' + editableAreaName + '" class="editableAreaButton" id="justifyfull" style="width:24px; height:24px;">';
	var alignCenterButton = '<img src="eArea/icons/stock_text_center.png" value="Align Center" alt="Align Center" name="' + editableAreaName + '" class="editableAreaButton" id="justifycenter" style="width:24px; height:24px;">';
	var alignRightButton = '<img src="eArea/icons/stock_text_right.png" value="Align Right" alt="Align Right" name="' + editableAreaName + '" class="editableAreaButton" id="justifyright" style="width:24px; height:24px;">';
	var editableArea = '<iframe src="eArea/blank.html?style=' + escape(editableAreaStyle) + '&width=' + escape(editableAreaWidth) + 'px&height=' + escape(editableAreaHeight) + '" id="' + editableAreaName + '" \n style="width:' + editableAreaWidth + 'px; height:' + editableAreaHeight + 'px; border-style:inset; border-width:thin;" frameborder="0px"></iframe>';

	var editableAreaHTML = editableAreaLayout;
	editableAreaHTML = editableAreaHTML.replace("[bold]", boldButton);
	editableAreaHTML = editableAreaHTML.replace("[italic]", italicButton);
	editableAreaHTML = editableAreaHTML.replace("[underlined]", underlinedButton);
	editableAreaHTML = editableAreaHTML.replace("[align-left]", alignLeftButton);
	editableAreaHTML = editableAreaHTML.replace("[justify]", justifyButton);
	editableAreaHTML = editableAreaHTML.replace("[align-center]", alignCenterButton);
	editableAreaHTML = editableAreaHTML.replace("[align-right]", alignRightButton);
	editableAreaHTML = editableAreaHTML.replace("[edit-area]", editableArea);
	
	if (document.designMode) {
		document.write(editableAreaHTML);
		ititButtons(editableAreaName);
	} else {
		// create a normal <textarea> if document.designMode does not exist
		document.write('<textarea id="' + editableAreaName + '" style="width:' + editableAreaWidth + 'px; height:' + editableAreaHeight + 'px; ' + editableAreaStyle + '"></textarea>');
	}
}

function editableAreaContents(editableAreaName) {
	if (document.designMode) {
		// Explorer reformats HTML during document.write() removing quotes on element ID names
		// so we need to address Explorer elements as window[elementID]
		if (window[editableAreaName]) return window[editableAreaName].contentWindow.document.body.innerHTML;
		return document.getElementById(editableAreaName).contentWindow.document.body.innerHTML;
	} else {
		// return the value from the <textarea> if document.designMode does not exist
		return document.getElementById(editableAreaName).value;
	}
}

function ititButtons(editableAreaName) {
	var kids = document.getElementsByTagName('img');

	for (var i=0; i < kids.length; i++) {
		if (kids[i].className == "editableAreaButton" && kids[i].name == editableAreaName) {
			kids[i].onmouseover = buttonMouseOver;
			kids[i].onmouseout = buttonMouseOut;
			kids[i].onmouseup = buttonMouseUp;
			kids[i].onmousedown = buttonMouseDown;
			kids[i].onclick = buttonOnClick;
		}
	}
}

function buttonMouseOver() {
	// events for mouseOver on buttons
	// e.g. this.style.xxx = xxx
}

function buttonMouseOut() {
	// events for mouseOut on buttons
	// e.g. this.style.xxx = xxx
}


function buttonMouseUp() {
	// events for mouseUp on buttons
	// e.g. this.style.xxx = xxx
}

function buttonMouseDown(e) {
	// events for mouseDown on buttons
	// e.g. this.style.xxx = xxx

	// prevent default event (i.e. don't remove focus from text area)
	var evt = e ? e : window.event; 

	if (evt.returnValue) {
		evt.returnValue = false;
	} else if (evt.preventDefault) {
		evt.preventDefault( );
	} else {
		return false;
	}
}

function buttonOnClick() {
	// Explorer reformats HTML during document.write() removing quotes on element ID names
	// so we need to address Explorer elements as window[elementID]
	if (window[this.name]) { window[this.name].document.execCommand(this.id, false, null); }
	else { document.getElementById(this.name).contentWindow.document.execCommand(this.id, false, null); }
}