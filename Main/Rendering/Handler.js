class Handler {
    static JavaColor = java.awt.Color
    static Color(color = [255, 255, 255, 255]) {
        const [r, g, b, a] = color
        return new this.JavaColor(r / 255, g / 255, b / 255, a / 255)
    }    
}

export default Handler;