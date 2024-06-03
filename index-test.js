import Stats from "./stats.js"

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
            background-color: #111;
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

    getChildren() {
        return this.children
    }

}

new class DivStage extends DivSprite {
    constructor() {
        super()
        this.setWidth('100vw')
        this.setHeight('100vh')
        this.setFilter('grayscale(1)')
        // this.setBackground(`url(bg.jpg)`)
        // this.setBackgroundSize('100% 100%')
        document.body.style.overflow = 'hidden'
        document.body.append(this.node)

        let container = []

        // let count = 510
        // for (let i = 0; i < count; i++) {
        //     let cols = 30
        //     let x = 50 * (i % cols)
        //     let y = 50 * Math.floor(i / cols)
        //     const s = this.addChild(new DivSprite)
        //     s.setWidth('50px')
        //     s.setHeight('50px')
        //     s.setX(x + 'px')
        //     s.setY(y + 'px')
        //     s.setAlpha('.3')
        //     s.setBackground(`rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`)
        //     // s.setBackground(`url(sample.png)`)
        //     // s.setBackgroundSize('100%')
        //     container.push(s)
        // }

        const s = this.addChild(new DivSprite)
        s.setWidth('auto')
        s.setHeight('50px')
        s.setX('10px')
        s.setY('10px')
        s.setInnerHTML(`<br><br><br>
            <h1>DivSprite for Game Developement</h1>
            Mac Air Apple M2 + Chrome + HTMLDivTag<br>
            10000 sprites 30fps<br>
            7500 sprites 43fps<br>
            5000 sprites 60fps
        `)
        s.setBackground('transparent')
        s.setTextColor('white')
        s.setTextFontFamily('system-ui')

        // 30fps 10000 sprites
        // 43fps 7500 sprites
        // 60fps 5000 sprites
        let count = 10000
        let unit = 1.47 * 7.5
        let cols = 1470 / unit
        for (let i = 0; i < count; i++) {
            let x = unit * (i % cols)
            let y = unit * Math.floor(i / cols)
            const s = this.addChild(new DivSprite)
            s.setWidth(unit + 'px')
            s.setHeight(unit + 'px')
            s.setX(x + 'px')
            s.setY(y + 'px')
            s.setAlpha('.3')
            s.setBackground(`rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`)
            container.push(s)
        }

        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);

        let r = 0
        const update = () => {
            stats.begin();

            container.forEach(c => c.setRotation(r))
            r += .5

            stats.end();

            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
}
