let x = []
let o = []
let chances = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
const tic = document.querySelectorAll('#tic')
let result = "draw"

function endGame(text) {
    tic.forEach(col =>{
        col.style.cursor = "none"
    })
    document.querySelector('.end').style.display = "block"
    document.querySelector('#endText').innerText = text + " !"
    document.querySelector('.replay').addEventListener('click', ()=>{
        location.reload()
    })
}

function check() {
    wins.forEach(win=>{
        if (x.includes(win[0]) && x.includes(win[1]) && x.includes(win[2])) {
            result = "x"
            endGame("You won")
        }

        if (o.includes(win[0]) && o.includes(win[1]) && o.includes(win[2])) {
            result = "o"
            endGame("You lose")
        }
    })
}

function change (index) {
    tic[index-1].innerText = "O"
    tic[index-1].style.backgroundColor = "#ecaf4f"
    o.push(index)
    chances.splice(chances.indexOf(index), 1)
}

function choose() {
    let choosed = false

    wins.forEach(win=>{
        if (o.includes(win[0]) && o.includes(win[1]) && chances.includes(win[2]) && !choosed) {
            change(win[2])
            console.log("case 1")
            choosed = true
        } else if (o.includes(win[0]) && o.includes(win[2]) && chances.includes(win[1]) && !choosed) {
            change(win[1])
            console.log("case 1")
            choosed = true
        } else if (o.includes(win[1]) && o.includes(win[2]) && chances.includes(win[0]) && !choosed) {
            change(win[0])
            console.log("case 1")
            choosed = true
        }
    })

    if (choosed) {
        return
    }
    
    wins.forEach(win=>{
        if (x.includes(win[0]) && x.includes(win[1]) && chances.includes(win[2]) && !choosed) {
            change(win[2])
            console.log("case 2")
            choosed = true
        } else if (x.includes(win[0]) && x.includes(win[2]) && chances.includes(win[1]) && !choosed) {
            change(win[1])
            console.log("case 2")
            choosed = true
        } else if (x.includes(win[1]) && x.includes(win[2]) && chances.includes(win[0]) && !choosed) {
            change(win[0])
            console.log("case 2")
            choosed = true
        }
    })

    if (choosed) {
        return
    }

    if (chances.includes(5)) {
        tic[4].innerText = "O"
        tic[4].style.backgroundColor = "#ecaf4f"
        o.push(5)
        chances.splice(chances.indexOf(5), 1)
        console.log("case 3")
    } else {
        let m = Math.floor(Math.random() * chances.length)
        tic[chances[m]-1].innerHTML = "O"
        tic[chances[m]-1].style.backgroundColor = "#ecaf4f"
        o.push(chances[m])
        chances.splice(m, 1)
        console.log("case 4")
    }

}

tic.forEach((elm, index)=>{
    elm.addEventListener('click', ()=>{
        if (x.includes(index+1) || o.includes(index+1)) {
            console.log("Includes");
            return
        }
        elm.innerText = "X"
        elm.style.backgroundColor = "#dc685a"
        x.push(index+1)
        chances.splice(chances.indexOf(index+1), 1)

        check()

        if (result == "x") {
            return
        } else if (chances.length == 0){
            endGame("We draw")
        } else {
            choose()

            check()
        }

    })
})
