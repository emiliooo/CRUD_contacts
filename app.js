var app = new function()  {
    this.FormTabels = [];

    this.Local = function(){
           this.firstname = document.getElementById('firstname').value;
           this.lastname = document.getElementById('lastname').value;
           this.phone = document.getElementById('phone').value;
           this.email = document.getElementById('email').value;
           var StuObj = {firstname :this.firstname,lastname:this.lastname,phone:this.phone,email:this.email}
           var vEmail = this.validateEmail(this.email)
        
          
       if (this.firstname.length > 0 && this.lastname.length > 0 ) {
         if(vEmail === true){
            if(check === -1){
                this.FormTabels.push(StuObj);
            }else{
                this.FormTabels.splice(check,1,StuObj)
            }
                localStorage.Records = JSON.stringify(this.FormTabels);
                document.getElementById('add').innerHTML = 'Add';
                this.initial();
            }else{
            alert('nie poprawny e-mail')  
            }
        }else{
        alert('Pola nie moga byc puste') 
        }
    }
    this.validateEmail = function(email) 
    {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
    }

    this.initial = function(){
        document.getElementById('cells').innerHTML = " ";
        if(localStorage.Records){
            this.FormTabels = JSON.parse(localStorage.Records); 
            for(var i = 0 ;i< this.FormTabels.length ; i++){
                this.preparateTabel(i,this.FormTabels[i].firstname ,this.FormTabels[i].lastname,this.FormTabels[i].phone,this.FormTabels[i].email)
            }
        }
    }

    this.preparateTabel = function(index,firstname,lastname,phone,email){
         
        var table = document.getElementById("cells")
        var row = table.insertRow();
        var firstNameCell = row.insertCell(0);
        var lastnameCell = row.insertCell(1);
        var phoneCell = row.insertCell(2);
        var emailCell = row.insertCell(3);
        var buttonDel = row.insertCell(4);

        firstNameCell.innerHTML = firstname;
        lastnameCell.innerHTML = lastname;
        phoneCell.innerHTML = phone;
        emailCell.innerHTML = email;
        buttonDel.innerHTML = ' <button type="" onclick="app.removeCell('+index+')"> DELETE</button> <button onclick="app.editCell('+index+')">EDIT</button>'
    }
    this.removeCell = function (index){
        var table = document.getElementById('cells');
        table.deleteRow(index)
        this.FormTabels.splice(index,1);
        localStorage.Records = JSON.stringify(this.FormTabels)
        app.Count();
    }
    var check = -1;
    this.editCell = function(index){ 
           check = index;
           document.getElementById('firstname').value = this.FormTabels[index].firstname;
           document.getElementById('lastname').value = this.FormTabels[index].lastname;
           document.getElementById('email').value = this.FormTabels[index].email;
           document.getElementById('phone').value = this.FormTabels[index].phone;
           document.getElementById('add').innerHTML = 'Update';
    }
    this.Count = function(){
        var el = document.getElementById('counter');
        var name = 'Contact';
            if( this.FormTabels.length ){
                if( this.FormTabels.length  > 1){
                    name = 'Contacts';
                }
                el.innerHTML =  this.FormTabels.length  + ' ' + name;
            }else{
                el.innerHTML = 'No ' + name;
            }
    }
}
window.onload = function()
{
  app.initial();
  app.Count();
}