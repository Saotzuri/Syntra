class Element {
    constructor(baseInstance, element, name, texts) {
        this.baseInstance = baseInstance;
        this.element = element;
        this.elementName = name;
        this.texts = texts;

        const savedData = this.baseInstance.pogData.elements?.[name];
        if (savedData) {
            this.element.setX(savedData.x.pixels());
            this.element.setY(savedData.y.pixels());
            
            if (savedData.texts) {
                Object.entries(savedData.texts).forEach(([key, text]) => {
                    if (this.texts[key]) this.texts[key].setText(text);
                });
            }
        }
    }
}

export default Element;