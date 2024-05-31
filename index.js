import Stats from "./stats.js"

// this project (DevSprite.js v1.0 - game engine)
// https://svgjs.dev/docs/3.0/ (svg.js v3.0 - vector library)
// https://howlerjs.com/ (howler.js v2.2.3 - audio library)
// https://github.com/sindresorhus/screenfull (screenfull.js - toggle fullscreen)

// game material urls
// https://doranarasi.itch.io/pixel-stg-player-ships-pack 
// https://screamingbrainstudios.itch.io/seamless-space-backgrounds


class DivSprite {

    node
    children = []

    constructor() {
        this.node = document.createElement('div')
        this.node.style = `
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100px;
            height: 100px;
            background-color: #222;
        `
    }

    destroy() {
        this.children.forEach(child => child.destroy())
        this.children.length = 0
        this.node.remove()
    }

    setX(x) {
        this.node.style.left = x
    }

    getX() {
        return this.node.style.left
    }

    setY(y) {
        this.node.style.top = y
    }

    getY() {
        return this.node.style.top
    }

    setWidth(w) {
        this.node.style.width = w
    }

    getWidth() {
        return this.node.style.width
    }

    setHeight(h) {
        this.node.style.height = h
    }

    getWidth() {
        return this.node.style.height
    }

    setAlpha(a) {
        this.node.style.opacity = a
    }

    getAlpha() {
        return this.node.style.opacity
    }

    setRotation(r) {
        this.node.style.transform = `rotateZ(${r}deg)`
    }

    getRotation() {
        return this.node.style.transform
    }

    setScale(s) {
        this.node.style.transform = `scale(${s})`
    }

    getScale(s) {
        return this.node.style.transform
    }

    setFilter(f) {
        this.node.style.filter = f
    }

    getFilter() {
        return this.node.style.filter
    }

    setBackground(bg) {
        this.node.style.background = bg
    }

    setBackgroundSize(s) {
        this.node.style.backgroundSize = s
    }

    setBackgroundPos(p) {
        this.node.style.backgroundPosition = p
    }

    getBackground() {
        return this.node.style.background
    }

    setTextFontFamily(f) {
        this.node.style.fontFamily = f
    }

    setTextColor(c) {
        this.node.style.color = c
    }

    setInnerHTML(t) {
        this.node.innerHTML = t
    }

    addChild(child) {
        this.node.append(child.node)
        this.children.push(child)
        return child
    }

    addChildAt(child, index) {
        this.node.insertBefore(child.node, this.node.children[index]);
        this.children.push(child)
        return child
    }

    removeChild(child) {
        let c = [...this.node.children]
        let idx = c.findIndex(i => i == child.node)
        if (idx > -1) {
            child.destroy()
            this.children.splice(idx, 1)
        }
    }

    removeChildAt(index) {
        let c = this.children
        let child = c[index]
        if (index < c.length && index > -1 && child) {
            child.destroy()
            this.children.splice(index, 1)
        }
    }

    getChildren() {
        return this.children
    }

}

class Ship extends DivSprite {

    constructor() {
        super()
        this.setBackground('url("./assets/stg-ship/player_ship_001/player_ship_32x32.png")')
        this.setBackgroundPos(`${32 * 6}px 0px`)
        this.setWidth('32px')
        this.setHeight('32px')
        this.setX('100px')
        this.setY('100px')
    }

}

class Bullet extends DivSprite {
    constructor() {
        super()
        this.setBackground('url("./assets/stg-ship/player_ship_001/shoot_main_32x32.png")')
        this.setBackgroundPos(`${32 * 3}px ${32 * -1}px`)
        this.setWidth('32px')
        this.setHeight('32px')
        this.setX('100px')
        this.setY('100px')
    }

    run() {
        const update = () => {
            let y = parseFloat(this.getY()) - 32 + 'px'
            this.setY(y)
            if (parseFloat(this.getY()) < -64) {
                this.destroy()
            } else
                requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
    }
}

new class DivStage extends DivSprite {

    stageFocus = true
    mouseX = 0
    mouseY = 0
    isShoot = false

    constructor() {
        super()

        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);
        const update = () => {
            stats.begin();
            this.loop(R)
            stats.end();
            this.stageFocus && requestAnimationFrame(update);
        }

        this.setBackground('url("./assets/space-bg/Small 512x512/Green Nebula/Green_Nebula_07-512x512.png")');
        this.setWidth('100vw')
        this.setHeight('100vh')
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden'
        document.body.style.imageRendering = 'pixelated';
        // document.body.style.filter = `hue-rotate(${360 * Math.random()}deg)`
        document.body.append(this.node)
        document.body.onmouseleave = () => this.stageFocus = false
        document.body.onmouseenter = () => { this.stageFocus = true, requestAnimationFrame(update) }
        document.body.onmousemove = e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        document.body.onkeydown = () => this.isShoot = true;
        document.body.onkeyup = () => this.isShoot = false;

        let ship = this.addChild(new Ship)
        ship.setScale(3)

        const s = this.addChild(new DivSprite)
        s.setWidth('auto')
        s.setHeight('50px')
        s.setX('10px')
        s.setY('10px')
        s.setInnerHTML(`<br><br><br>
            <h1>DivSprite for Game Developement</h1>
            Mac Air Apple M2 + Chrome + HTMLDivTag<br>
            <span style="color:#179979">mousemove + keyboard to control ship</span><br><br>
            10000 sprites 30fps<br>
            7500 sprites 43fps<br>
            5000 sprites 60fps
        `)
        s.setBackground('transparent')
        s.setTextColor('white')
        s.setTextFontFamily('system-ui')

        const R = {
            bgScroll: 0,
            ship,
            now: Date.now(),
        }

        requestAnimationFrame(update);
    }

    loop(R) {
        this.setBackgroundPos('0px ' + (R.bgScroll += .1) + 'px')
        R.ship.setX(this.mouseX - 16 + 'px')
        R.ship.setY(this.mouseY - 16 + 'px')
        if ((Date.now() - R.now > 50) && this.isShoot) {
            let bullet = this.addChild(new Bullet)
            bullet.setX(this.mouseX - 16 + 'px')
            bullet.setY(this.mouseY - 16 - 80 + 'px')
            bullet.setScale('3')
            bullet.run()
            R.now = Date.now()
        }
    }
}


