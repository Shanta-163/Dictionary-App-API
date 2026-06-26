const series=(arr)=>{
  const createHTML = arr.map((el)=>`<span class="btn">${el}</span>`)
  return(createHTML.join(" "))
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const manageSpinner=(status)=>{
    if (status == true ){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
         document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}
const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")//promise of response
    .then((res)=>res.json()) //promise of json data
    .then(json=>displayLessons(json.data))
}
const loadWordDetails=(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(json=>
        displayWordDetails(json.data))
}

const displayWordDetails =(word)=>{
    //console.log(word)
    const modalBox = document.getElementById("details-container")
      modalBox.innerHTML=`
      <div class="modal-box space-y-[20px]">
   <div class="">
    <h1 class="font-semibold text-[36px] text-[#000]">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
    <h1 class="text-[24px] font-semibold">Meaning</h1>
    <h1 class="font-medium text-[24px] text-[#000]">${word.meaning}</h1>
   </div>
   <div class="">
    <h1 class="text-[24px] font-semibold text-[#000]">Example</h1>
    <p  class="text-[24px] font-regular text-[#000]">${word.sentence}</p>
   </div>
   <div class="">
    <h1 class="text-[24px] font-medium text-[#000] hind siliguri">সমার্থক শব্দ গুলো</h1>
    <div class="">
    ${series(word.synonyms)}
   </div>
   </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Complete Learning</button>
      </form>
    </div>
  </div>
      `
      document.getElementById("word_modal").showModal()

}
const loadLevelWord = (id) =>{
    //console.log(id)
    manageSpinner(true);
   const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>{ 
    removeActive();
    const clickBtn = document.getElementById(`lesson-btn-${id}`);
    //console.log(clickBtn)
    clickBtn.classList.add("active")
    displayLevelWords(data.data)})
}
const removeActive=()=>{
    const lessonBtn = document.querySelectorAll(".lesson-btn");
   // console.log(lessonBtn);
    lessonBtn.forEach(btn=>btn.classList.remove("active"))
}
const displayLevelWords = (words) => {
    
  console.log(words)
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML= "";
    if(words.length == 0){
       wordContainer.innerHTML= `
       <div class="space-y-[12px] text-center col-span-full bg-gray-200 py-[64px]">
       <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <h1 class="text-[#79716B] text-[14px] hind-siliguri font-normal">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
          <h1 class="font-medium text-[40px] text-[#292524]">নেক্সট Lesson এ যান</h1>
         </div>`;
         manageSpinner(false);
         return;
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm py-10 px-5 space-y-4 text-center">
          <h1 class="text-[32px] font-bold text-[#000]">${word.word ? word.word : "Can not find word "}</h1>
          <h1 class="text-[20px] font-medium text-[#000]">Meaning / Pronunciation</h1>
          <div class="hind-siliguri font-semibold text-[32px]">${word.meaning?word.meaning:"Can not find meaning" }/${word.pronunciation ? word.pronunciation : "Can not find pronunciation"}</div>
          <div class="flex justify-between items-center gap-5">
          <button onclick="loadWordDetails(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
         <button onclick = "pronounceWord('${word.word}')" class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-microphone"></i></button>
         </div>
         </div>
         
        `
        wordContainer.append(card);
        manageSpinner(false);
    });
}
const displayLessons= (lessons) =>{
   //console.log(lessons)
   //1.get the container & empty
   const levelContainer =  document.getElementById("level-container")
   levelContainer.innerHTML = "";
   //2.get into every lessons
  for (const lesson of lessons) {
     //3.create elements
     const btnDiv = document.createElement("div")
     btnDiv.innerHTML = `
     <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>
     `
   //4.append into the container
   levelContainer.appendChild(btnDiv)
  }
  
}
loadLessons();

const searchVocabulary=()=>{
    document.getElementById("search-btn").addEventListener("click",()=>{
       const input =  document.getElementById("search-input")
       const searchText = input.value.trim().toLowerCase();
       console.log(searchText)
       fetch("https://openapi.programming-hero.com/api/words/all")
       .then(res=>res.json())
       .then(data=>{
           const allwords = data.data
           console.log(allwords)
           const filterWords = allwords.filter(word=>word.word.toLowerCase().includes(searchText))
            displayLevelWords(filterWords)  
       })
    
    })
}
searchVocabulary()
