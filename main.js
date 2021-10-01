class Wordbreaker{
    generaRandomIndex(arr){
        return Math.floor(Math.random()*arr.length)
    }
    shuffleWord(word){
        const wordArr = [...word]
        for(let i = 0; i <wordArr.length; i++){
            let randIndex = this.generaRandomIndex(word)
            let tempLetter = ""
            let currentLetter = wordArr[i]
            let randLetter = wordArr[randIndex]
            // swapping the names
            tempLetter = currentLetter
            wordArr[i] = randLetter
            wordArr[randIndex] = tempLetter
        }
        return wordArr.join('')
    }
    compareWords(userWord, realWord){
        return userWord.toLowerCase() == realWord.toLowerCase()
    }
    reduceScore(score){
        const newScore = score-1
        return newScore
    }
}
const words = ['boys', 'girls', 'programmers', 'programming', 'laptop', 'touch', 'typing', 'learning', 'something', 'new',
'today', 'wonderful', 'day', 'yesterday', 'was', 'paper', 'paperplane', 'book', 'pity']

const input = document.querySelector('.game-center__input')
const encryptedWordBox = document.querySelector('.game-center__word')
const numberOfCracked = document.querySelector('.number')
const statusBox = document.querySelector('.game-center__chances')
const checkBtn = document.querySelector('#check')
const revealBtn  = document.querySelector('#reveal')
const nextWordBtn = document.querySelector('#next')

const game = new Wordbreaker()
let selectedWord = words[game.generaRandomIndex(words)]
let shuffledWord = game.shuffleWord(selectedWord)
let score = 6
let crackedWords = 0
encryptedWordBox.innerHTML = shuffledWord
nextWordBtn.addEventListener('click', () => {
    score = 6
    selectedWord = words[game.generaRandomIndex(words)]
    shuffledWord = game.shuffleWord(selectedWord)
    encryptedWordBox.innerHTML = shuffledWord
    statusBox.innerHTML = `6 chances remaining`
})

checkBtn.addEventListener('click', () => {
    const userGuess = input.value 
    if(userGuess == '') return
    if(game.compareWords(userGuess, selectedWord)){
        statusBox.innerHTML = `You won! The word was "${selectedWord}". Your score is ${score}`
        crackedWords += 1
        numberOfCracked.innerHTML = crackedWords
        input.value = ''
    }else{
        score = game.reduceScore(score)
        if(score == 0){
            statusBox.innerHTML = `Out of chances! The word was "${selectedWord}"`
            input.value = ''
        }else{
            statusBox.innerHTML = `Wrong! You have ${score} chances remaining`
        }
    }
})
revealBtn.addEventListener('click', () => {
    // if(userGuess == '') return
    statusBox.innerHTML = `The word is "${selectedWord}".`
})
