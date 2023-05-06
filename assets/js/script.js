function getData(){
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let subject = document.getElementById("subject").value
    let message = document.getElementById("message").value
    // validasi data

    if(name == "") {
        return alert("nama harus di isi ")
    }else if (email == "") {
        return alert ("email harus di isi")      
    }else if (phone == "") {
        return alert ("nomor telepon harus di isi")
    }else if (subject == ""){
        return alert ("Subject harus di isi")
    }else if (message == ""){
        return alert ("message harus di isi")
    }
    
    const alamatEmail= "salehjaya97@gmail.com"
    let a = document.createElement("a")
    a.href =`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=perkenalkan nama saya ${name}, bermaksud untuk${message}, tolong hubungi saya di ${phone}`
    a.click()
}

let blogs = []
function getBlog(event){
    event.preventDefault()
    let projectName = document.getElementById("projectName").value
    let desk = document.getElementById("desk").value
    let foto = document.getElementById("foto").files
    let node = document.getElementById("node").checked
    let next = document.getElementById("next").checked
    let reach = document.getElementById("reach").checked
    let typeScript = document.getElementById("typeScript").checked
    let start = document.getElementById("start").value
    let end = document.getElementById("end").value
   
    waktuProject= getDuration(end,start);

    if(projectName==""){
      return  alert("Nama Project Harus di isi")
    }else if(desk==""){
      return  alert("deskripsinya Harus di isi")
    }else if(start=="" || end ==""){
        return alert("harus mengisi waktu awal dan akhir project")
    }
    else if(foto==""){
       return alert("Harus mengupload foto")
    }else if(node==""&& next=="" && reach == "" && typeScript==""){
       return alert("harus memilih minimal 1 teknologi")
    }
    foto = URL.createObjectURL(foto[0])
    function getValue(a) {
        if (a) {
          return "";
        } else {
          return "none";
        }
      }
    node1=getValue(node)
    next1=getValue(next)
    reach1=getValue(reach)
    typeScript1=getValue(typeScript)
    let blog = {
        node1,
        next1,
        reach1,
        typeScript1,
        projectName,
        waktuProject,
        desk,        
        foto
    }
    
    blogs.push(blog)
    console.log(blogs)
    renderBlog()
}
function renderBlog() {
    let blogL=blogs.length
    
    document.getElementById("contents").innerHTML = ""
    for (let i=0; i<blogL; i++){
        document.getElementById("contents").innerHTML += `
        <div class="contents">
        <a href="project-detail.html">  
        <img src="${blogs[i].foto}"/>
            <a class="title-project">${blogs[i].projectName}</a>
            <p class="duration-project">${blogs[i].waktuProject}</p>
            <p class="descrip-project">
                ${blogs[i].desk}
            </p>
            <img class="tech" style="display:${blogs[i].node1};" src="./assets/icon/node.png"/>
            <img class="tech"  style="display:${blogs[i].next1};" src="./assets/icon/next.png"/>
            <img class="tech"  style="display:${blogs[i].reach1};"  src="./assets/icon/reach.png"/>
            <img class="tech" style="display:${blogs[i].typeScript1};" src="./assets/icon/typeScript.png"/>
            <div class="button-edit-delete">
                <button class="edit">edit</button>
                <button class="delete">delete</button>
            </div>
        </a>
        </div>
        `

    }
}

  function getDuration(waktuAkhir, waktuAwal) {
    const distance = new Date(waktuAkhir) - new Date(waktuAwal)
    const monthDistance = Math.floor(distance / (30 *24 * 60 * 60 * 1000))
    
    if(monthDistance>0){
        return waktuProject= monthDistance + "Month Ago" // 1 bulan
    }else{
        return waktuProject="kurang dari 1 bulan"
    }
  }