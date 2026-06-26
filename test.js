
const synonyms = ["hi","hello","welcome"] 
series(synonyms)


const loadWordDetails = (id) => {

    console.log("ID=", id)

    const url = "https://openapi.programming-hero.com/api/word/" + id

    console.log("URL=", JSON.stringify(url))

    fetch(url)
      .then(res => res.json())
      .then(json => displayWordDetails(json.data))
      .catch(err => console.log(err))
}