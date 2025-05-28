import { UIBlock, WindowScreen, UIRoundedRectangle, CenterConstraint, UIText } from "../../../Elementa";
import Handler from "./Handler";
import Chat from "../Utils/Chat";
import BaseElement from "./Element";
import PogObject from "../../../PogData";

const File = Java.type("java.io.File");
const chat = Chat.chat;

const elementTypes = {
    Element: BaseElement
};

class Manager {
    constructor() {
        this.Screen = new JavaAdapter(WindowScreen, {
            init() {
                return this.getWindow();
            }
        });

        this.window = this.Screen.init();
        this.base = null;
        this.elements = {};
        this.command = register("command", () => {
            this.open()
            chat("&aOverlay opened!");
        });

        const F = new File("./config/Syntra")
        if (!F.exists()) F.mkdirs();

        this.pogData = new PogObject(
            "../../../config/Syntra", 
            { elements: {} }, 
            "elements.json"
        );

        this.moving = false;
        this.isDragging = false;
        this.selectedChild = null;
        this.dragData = { x: 0, y: 0 };

        this.debugHighlight = new UIRoundedRectangle(3)
        .setColor(Handler.Color([255, 85, 85, 100]))

        this.debugText = new UIText()
        .setColor(Handler.Color([255, 255, 255, 200]))

        this.elementTypes = elementTypes;

        this._registers();
        this._createUI();
    }

    open() {
        this.moving = true;
        GuiHandler.openGui(this.Screen);
    }

    close() {
        this.moving = false;
        this.debugHighlight.hide();
        this.debugText.hide();
        this.selectedChild = null;
        this.pogData.save();
    }

    setCommand(command, ...aliases) {
        this.command.setName(command);
        if (aliases) this.command.setAliases(aliases);
        return this;
    }

    addElement(name, type, { element, texts }) {
        let newElement = new this.elementTypes[type](this, element, name, texts);
        this.elements[name] = newElement;
        this.base.addChild(newElement.element);
        
        this.pogData.elements[name] = {
            x: element.getLeft(),
            y: element.getTop(),
            texts: (function() {
                const obj = {};
                Object.entries(texts).forEach(([key, text]) => {
                    obj[key] = text.getText();
                });
                return obj;
            })()
        };
        this.pogData.save();
        return this;
    }

    updateElementText(elementName, textKey, newText) {
        const element = this.elements[elementName];
        if (!element) return;

        if (element.texts && element.texts[textKey]) {
            element.texts[textKey].setText(newText);
            this.pogData.elements[elementName].texts[textKey] = newText;
            this.pogData.save();
        }
    }

    saveElement(element, name) {
        this.pogData.elements[name] = {
            x: element.getLeft(),
            y: element.getTop(),
            texts: Object.keys(this.elements[name].texts).reduce((obj, key) => {
                obj[key] = this.elements[name].texts[key].getText();
                return obj;
            }, {})
        };
        this.pogData.save();
    }

    _registers() {
        register("renderOverlay", () => {
            this.window.draw();
        });
        
        register("guiClosed", (gui) => {
            if (gui.toString() === this.Screen.toString()) {
                this.close();
            }
        });
    }

    _createUI() {
        this.base = new UIBlock()
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setX(new CenterConstraint())
        .setY(new CenterConstraint())
        .setColor(Handler.Color([0, 0, 0, 0]))
        .setChildOf(this.window)
        .onMouseClick((comp, event) => {
            this.selectedChild = null;

            this.base.children.forEach((child) => {
                const bounds = {
                    left: child.getLeft(),
                    top: child.getTop(),
                    right: child.getRight(),
                    bottom: child.getTop() + child.getHeight()
                };

                if (event.absoluteX > bounds.left && 
                    event.absoluteX < bounds.right &&
                    event.absoluteY > bounds.top && 
                    event.absoluteY < bounds.bottom) {
                    
                    this.selectedChild = child;
                    this.dragData = {
                        offsetX: event.absoluteX - child.getLeft(),
                        offsetY: event.absoluteY - child.getTop()
                    };
                }
            });

            if (this.selectedChild) {
                this.debugHighlight
                    .setX((this.selectedChild.getLeft() - 5).pixels())
                    .setY((this.selectedChild.getTop() - 5).pixels())
                    .setWidth((this.selectedChild.getWidth() + 10).pixels())
                    .setHeight((this.selectedChild.getHeight() + 10).pixels())
                    .unhide(true);

                this.debugText
                    .setX((this.selectedChild.getLeft().pixels()))
                    .setY((this.selectedChild.getTop() - 15).pixels())
                    .setText(`X: ${this.selectedChild.getLeft().toFixed(0)} | Y: ${this.selectedChild.getTop().toFixed(0)}`)
                    .unhide(true);
            } else {
                this.debugHighlight.hide();
                this.debugText.hide();
            }
        })
        .onMouseRelease(() => {
            this.isDragging = false;
            this.debugHighlight.hide();
            this.debugText.hide();
        })
        .onMouseDrag((comp, mx, my) => {
            if (!this.moving) return;
            if (this.selectedChild) {
                const mouseX = mx + comp.getLeft();
                const mouseY = my + comp.getTop();

                const newX = mouseX - this.dragData.offsetX;
                const newY = mouseY - this.dragData.offsetY;
                
                this.selectedChild.setX(newX.pixels());
                this.selectedChild.setY(newY.pixels());

                this.debugHighlight
                .setX((this.selectedChild.getLeft() - 5).pixels())
                .setY((this.selectedChild.getTop() - 5).pixels())
                .setWidth((this.selectedChild.getWidth() + 10).pixels())
                .setHeight((this.selectedChild.getHeight() + 10).pixels());
                this.debugText
                .setText(`X: ${this.selectedChild.getLeft().toFixed(0)} | Y: ${this.selectedChild.getTop().toFixed(0)}`)
                .setX((this.selectedChild.getLeft().pixels()))
                .setY((this.selectedChild.getTop() - 15).pixels())

                const elementName = Object.keys(this.elements).find(name => 
                    this.elements[name].element === this.selectedChild
                );
                if (elementName) this.saveElement(this.selectedChild, elementName);
                
            }
        });
        this.debugHighlight.setChildOf(this.base).hide();
        this.debugText.setChildOf(this.base).hide();
    }
}

export default Manager;