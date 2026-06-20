const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")//promise of response
    .then((res)=>res.json()) //promise of json data
    .then(json=>displayLessons(json.data))
}
const loadLevelWord = (id) =>{
    //console.log(id)
   const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayLevelWords(data.data))
}
/*
{
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
}*/
const displayLevelWords = (words) => {
  console.log(words)
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML= "";
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm py-10 px-5 space-y-4 text-center">
          <h1 class="text-[32px] font-bold text-[#000]">${word.word}</h1>
          <h1 class="text-[20px] font-medium text-[#000]">Meaning / Pronunciation</h1>
          <div class="hind-siliguri font-semibold text-[32px]">${word.meaning}/${word.pronunciation}</div>
          <div class="flex justify-between items-center gap-5">
          <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
         <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-microphone"></i></button>
         </div>
         </div>
         
        `
        wordContainer.append(card);
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
     <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>
     `
   //4.append into the container
   levelContainer.appendChild(btnDiv)
  }
  
}
loadLessons();