let imagee, zoom
let images = []

function preload() {
    let pre = "https://greybeard42.github.io/images/art/"
    images.push(loadImage(pre+"containerShip.png"))
    images.push(loadImage(pre+"lakeHills.png"))
    images.push(loadImage(pre+"mossyStream.png"))
    images.push(loadImage(pre+"sistine.png"))
}

function setup() {
    let cnvs = createCanvas(windowWidth, windowHeight)
    cnvs.parent("canvas")
    colorMode(RGBA)
    noStroke()

    imagee = images[0]
    zoom = imagee.width/6

    slider.min = imagee.width/40
    slider.max = width/20
    slider.value = zoom
    
    imagee.loadPixels()
    frameRate(15)
}

function draw() {
    background(0)

    if(imgselect.value == "containerShip") imagee = images[0]
    else if(imgselect.value == "lakeHills") imagee = images[1]
    else if(imgselect.value == "mossyStream") imagee = images[2]
    else imagee = images[3]

    let xo = imagee.width/2
    let yo = imagee.height/2
    translate(width/2, height/2)
    for (let x = 0; x < imagee.width; x += 1) {
        for (let y = 0; y < imagee.height; y += 1) {
            //red
            fill(360, 0, 0, imagee.get(x-1, y)[0])
            rect((x-xo)*zoom, (y-yo)*zoom, 1/6*zoom, 0.75*zoom)

            //blue (idk why this fixes the order)
            fill(0, 0, 360, imagee.get(x-1, y)[2])
            rect((x+2/3-xo)*zoom, (y-yo)*zoom, 1/6*zoom, 0.75*zoom)

            //green
            fill(0, 360, 0, imagee.get(x, y)[1])
            if(x != imagee.width-1) rect((x+4/3-xo)*zoom, (y-yo)*zoom, 1/6*zoom, 0.75*zoom)
        }
    }

    zoom = slider.value
}

document.addEventListener("wheel", (e) => {
    if(e.deltaY > 0) {
        slider.value -= 1
    } else {
        slider.value -= -1
    }
})