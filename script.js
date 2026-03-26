

const display=document.getElementById('studentTableBody');

const studentArr= JSON.parse(localStorage.getItem('data')) || [];

console.log(studentArr);

function saveData(){
    localStorage.setItem('data',JSON.stringify(studentArr));
}

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

//toggle mobile
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//enable scroll after the 5 reows added in the table

function applyScroll() {
  const body = document.getElementById("studentTableBody");
  const scrollArea = document.getElementById("tableScrollArea");

  if (body.children.length > 5) {
    scrollArea.style.maxHeight = "300px";
    scrollArea.style.overflowY = "auto";
  } else {
    scrollArea.style.maxHeight = "none";
    scrollArea.style.overflowY = "visible";
  }
}
//display student data afer re-loading
window.onload = function () {
  displayData();
};

//display data after form submitted in the table
function displayData(){
  
    display.innerHTML='';
    studentArr.forEach((student,index) => {
          const row=document.createElement('tr');
          row.classList.add(`row${index}`);
          row.innerHTML=`
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.age}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
          <td class="space-x-7">
            <i class="ri-delete-bin-6-fill" class="delete_btn btn"   onclick="deleterow(${index})" ></i>
            <i class="ri-edit-fill"  class="edit-btn btn" onclick="editrow(${index})"></i>       
          </td>`
          display.appendChild(row);
    });
}
//add student data
function addStudentData(){
        console.log("add student details");
         const name = document.getElementById("name").value.trim();
        const id = document.getElementById("id").value;
       const email = document.getElementById("email").value.trim();
       const contact = document.getElementById("contact").value.trim();
        
       const student={
          
          name:document.getElementById('name').value,
          id:document.getElementById('id').value,
          age:document.getElementById('age').value,
          email:document.getElementById('email').value,
          contact:document.getElementById('contact').value,
       }
        //  Validation
  const nameRegex = /^[A-Za-z ]+$/;
  const idRegex = /^[0-9]+$/;
  const contactRegex = /^[0-9]{10,}$/;

  if (!name || !id || !email || !contact) {
    alert("All fields required");
    return;
  }

  if (!nameRegex.test(name)) {
    alert("Name only letters");
    return;
  }

  if (!idRegex.test(id)) {
    alert("ID only numbers");
    return;
  }

  if (!contactRegex.test(contact)) {
    alert("Contact must be 10 digits");
    return;
  }

  //  Duplicate ID check
  if (studentArr.some(s => s.id === id)) {
    alert("Student ID already exists!");
    return;
  }
       console.log(studentArr);
       studentArr.push(student);
       saveData();
       displayData();
       document.getElementById('studentForm').reset();

}

//deleting rows in a table
function deleterow(index){
    const deletedrow=document.querySelector(`.row${index}`);
    studentArr.splice(index,1);
    saveData();
    deletedrow.remove();
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add("hidden");
  }
});

//edit row and record in the table
function editrow(index){
  //load the existing values in the pop up form
    document.getElementById('editname').value=studentArr[index].name;
    document.getElementById('editid').value=studentArr[index].id;
    document.getElementById('editcontact').value=studentArr[index].contact;
    document.getElementById('editemail').value=studentArr[index].email;
    document.getElementById('editage').value=studentArr[index].age;
    document.getElementById('editpop').classList.add('show');
   
    //update the changes
    document.getElementById('editsubmit').addEventListener('click', (e)=>{
      e.preventDefault();
        studentArr[index].name=document.getElementById('editname').value;
        studentArr[index].id=document.getElementById('editid').value;
        studentArr[index].contact=document.getElementById('editcontact').value;
        studentArr[index].email=document.getElementById('editemail').value;
        studentArr[index].age=document.getElementById('editage').value;
          const rows=document.querySelector(`.row${index}`);
          //insert in the existing row
        rows.innerHTML=`
                      <td >${studentArr[index].name}</td>
                      <td >${studentArr[index].id}</td>
                      <td >${studentArr[index].age}</td>
                      <td >${studentArr[index].email}</td>
                      <td >${studentArr[index].contact}</td>
                      <td class="space-x-7">
            <i class="ri-delete-bin-6-fill" class="delete_btn btn"   onclick="deleterow(${index})" ></i>
            <i class="ri-edit-fill"  class="edit-btn btn" onclick="editrow(${index})"></i>       
          </td>`
         //save cchanges
         saveData();
         //close the pop up after changes submitted
        closepopup();
      

    })





}

function closepopup(){
    document.getElementById('editpop').classList.remove('show');
     document.body.style.overflow = "auto";
}



