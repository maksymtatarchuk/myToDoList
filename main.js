var n = 0; 

function mainBlocking() {
  var block = document.getElementById('blocking');
  if (block.getAttribute('class') != 'blocking'){
    block.setAttribute('class', 'blocking');
  }else{
    block.removeAttribute('class');
  }
}

function addTask() {
  var getFocus = document.getElementById('NoteTextAdd');
  getFocus.focus();
  
  var element = document.getElementsByClassName('container')[0];
  n += 1;
  
  var div = document.createElement('div');
  div.setAttribute('id', 'note-' + n); 
  div.setAttribute('class', 'note');
  
  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox'); 
  let check = 'noteCrossOut(' + n + ')';
  input.setAttribute('onclick', check); 
  
  var note = document.createElement('p'); 
  note.setAttribute('id', 'text-' + n); 
  var text = document.getElementById('NoteTextAdd').value;
  if(text === '' || text === ' '){ 
    n -= n;
    return alert('Input text')
  }
  note.setAttribute('value', text); 
  note.innerHTML = text; 
  
  var buttonE = document.createElement('button'); 
  var btnE = 'noteEditFrame(' + n + ')';
  buttonE.setAttribute('class', 'btn');
  buttonE.setAttribute('onclick', btnE); 
  buttonE.innerHTML = 'Edit';
  
  var buttonD = document.createElement('button');
  buttonD.setAttribute('class', 'btn'); 
  var btnD = 'noteDelete(' + n + ')';
  buttonD.setAttribute('onclick', btnD); 
  buttonD.innerHTML = 'Delete'; 
 
  element.appendChild(div); 
  div.appendChild(input); 
  div.appendChild(note); 
  div.appendChild(buttonE); 
  div.appendChild(buttonD); 
  
  //edit div
  var eDiv = document.createElement('div');
  eDiv.setAttribute('id', 'eDiv-' + n);
  //eDiv.setAttribute('class','editor');
  element.appendChild(eDiv);
  
  noteFrameHide(); 
  console.log(n); } 

function noteFrameHide(){
  mainBlocking();
  var getFocus = document.getElementById('NoteTextAdd');
  document.getElementById("noteFrame").classList.toggle('active');
  document.getElementById('NoteTextAdd').value = '';
  getFocus.focus();
} 

function noteCrossOut(m) {
  m = 'text-' + m;
  var element = document.getElementById(m);
  var atr = element.getAttribute('class');
    if(atr === null){
      element.setAttribute('class', 'crossOut');
    }else{
      element.removeAttribute('class'); 
    } 
  }

function noteEditFrame(m){
  var num = document.getElementById('eDiv-' + m);
  console.log(num);
   if(num.hasAttribute('class')){
      return editCancel(m);
   }else{
     lastEditClose();
   }
  num.setAttribute('class','editor');
  console.log(num);
  
  var pre = document.getElementById('text-' + m).getAttribute('value');

  var form = document.createElement('form');
  form.setAttribute('class', 'editor');
 
  var input = document.createElement('input');
  input.setAttribute('id','editText');
  input.setAttribute('type','text');
  input.setAttribute('class','noteText');
  input.setAttribute('maxlength','130');
  input.setAttribute('value', pre)
  input.setAttribute('placeholder','Maximum 130 characters.');
    
  var edit = document.createElement('button');
  edit.setAttribute('type','button');
  edit.setAttribute('class','btn');
  var e = 'noteEdit(' + m + ')';
  edit.setAttribute('onclick', e);
  edit.innerHTML = 'Enter';
    
  var cancel = document.createElement('button');
  cancel.setAttribute('class','btn');  
  var c = 'editCancel(' + m + ')'; 
  cancel.setAttribute('onclick', c);
  cancel.innerHTML = 'Cancel';
      
  num.appendChild(form);
  form.appendChild(input);
  form.appendChild(edit);
  form.appendChild(cancel);
  } 

function editCancel(m) {
  var m = 'eDiv-' + m;
  var elementEdit = document.getElementById(m);
  elementEdit.removeAttribute('class');
  elementEdit.innerHTML = '';
}

function noteEdit(m) {
  var inpFocus = document.getElementById('editText');
  inpFocus.focus();
  var element = document.getElementById('text-' + m);
  var txt = document.getElementById('editText').value;
  if(txt === '' || txt === ' '){ 
      return alert('Input text')
  }
  element.setAttribute('value', txt);
  element.innerHTML = txt;
  editCancel(m);
}

function noteDelete(n) {
  var m = 'eDiv-' + n;
  n = 'note-' + n;
  console.log(n, m);
  var element = document.getElementById(n);
  var elementEdit = document.getElementById(m);
  console.log(element, elementEdit);                                            
  elementEdit.remove();
  element.remove();
}

function lastEditClose(){
   var dom = document.getElementsByClassName('editor')[0];
    console.log(dom)
   if(dom === undefined) {return};
   var dom = dom.getAttribute('id');
   dom = dom.split('-');
   dom.shift();
   editCancel(dom);
}