let prompt=document.querySelector("#prompt")
let submitbutton=document.querySelector("#submit")
let chatContainer=document.querySelector(".chat-container")
let imageButon=document.querySelector("#image")
let image=document.querySelector("#image img")

let imageinput=imageButon.querySelector("#image input")

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div;
}

const API_URL= "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBDogLlbHFH27JYCBklJAE1hg8NHRMPAMI"

let user={
    message:null,
    file:{
        mime_type:null,
        data: null
    }

}

async function generateResponse(aiChatBox){
    let text=aiChatBox.querySelector(".ai-chat-area")
    let requestBody = {
        contents: [{
            role: "user",
            parts: [{ text: user.message},(user.file.data?[{inline_data:user.file}]:[])] // Fix: Correct JSON format
        }],
        generationConfig: { 
            maxOutputTokens: 100 // Optional: Limits response size
        }
    };

    let requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(requestBody)
    };

    try{
        let response=await fetch(API_URL,requestOptions)
        let data=await response.json()
        let apiResponse= data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse

    }
    catch(error){
        console.log(error)
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"}) 
        image.src= `img.svg`
        image.classList.remove("choose")
        user.file={}
        
    }
    
}

function handlechatResponse(userMessage){
    user.message=userMessage;
    let html = `
    <img src="user.png" alt="User Icon" id="userImage" width="40">
    <div class="user-chat-area">
        ${user.message}
        ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
    </div>`
    prompt.value=""
    let userChatBox=createChatBox(html,"user-chat-box")
    chatContainer.appendChild(userChatBox)
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
    setTimeout(()=>{
        let html=`<img src="ai.png" alt="AI Icon" id="aiImage" width="35">
            <div class="ai-chat-area">
            <img src="loading.webp" alt="" class="load" width="50px">
        
            </div>`

        let aiChatBox=createChatBox(html,"ai-chat-box")
        chatContainer.appendChild(aiChatBox)
        generateResponse(aiChatBox)

    },600)
}


prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
    }
    
})

submitbutton.addEventListener("click",()=>{
    handlechatResponse(prompt.value)
})

imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0]
    if (!file) return
    let reader=new FileReader()
    reader.onload=(e)=>{
        console.log(e)
        let base64string=e.currentTarget.result.split(",")[1]
        user.file={
            
            mime_type:file.type,
            data: base64string
            
        }
        image.src= `data:${user.file.mime_type};base64,${user.file.data}`
        image.classList.add("choose")
    }
    
    reader.readAsDataURL(file)

})

imageButon.addEventListener("click",()=>{
    imageButon.querySelector("input").click()
})