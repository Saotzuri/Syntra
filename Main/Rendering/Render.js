class simpleString {
    constructor(str, x = 300, y = 30) {
        this.str = str;
        this.x = x;
        this.y = y;
    }

    render() {
        Renderer.drawString(this.str, this.x, this.y, true);
        return this
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setText(str) {
        this.str = str;
        return this;
    }
}

export default { simpleString };