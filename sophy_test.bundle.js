// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class CanvyStatics {
    static ColorToRGB(color) {
        const { red , green , blue  } = color;
        return `rgb(${red},${green},${blue})`;
    }
    static ComponentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    static RGBToHex(red, green, blue) {
        return "#" + CanvyStatics.ComponentToHex(red) + CanvyStatics.ComponentToHex(green) + CanvyStatics.ComponentToHex(blue);
    }
    static HexToRGB(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }
}
class CanvyDrawing {
    fill(red, green, blue) {
        this.ctx.fillStyle = CanvyStatics.ColorToRGB({
            red,
            green,
            blue
        });
    }
    strokeWeight(weight) {
        this.ctx.lineWidth = weight;
    }
    strokeStyle(red, green, blue) {
        this.ctx.strokeStyle = CanvyStatics.ColorToRGB({
            red,
            green,
            blue
        });
    }
    rect(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
    }
}
class CanvyImage {
    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
    image(img, x, y, wid, hei) {
        wid ??= img.width;
        hei ??= img.height;
        this.ctx.drawImage(img, x, y, wid, hei);
    }
    imageSection(img, xOnCanvas, yOnCanvas, widOnCanvas, heiOnCanvas, xFromImage, yFromImage, widFromImage, heiFromImage) {
        this.ctx.drawImage(img, xOnCanvas, yOnCanvas, widOnCanvas, heiOnCanvas, xFromImage, yFromImage, widFromImage, heiFromImage);
    }
}
class CanvyTransform {
    scale(x, y) {
        this.ctx.scale(x, y);
    }
    translate(x, y) {
        this.ctx.translate(x, y);
    }
    transform(horizontalScale, horizontalSkew, verticalSkew, verticalScale, horizontalMove, verticalMove) {
        this.ctx.transform(horizontalScale, horizontalSkew, verticalSkew, verticalScale, horizontalMove, verticalMove);
    }
    rotate(radians) {
        this.ctx.rotate(radians);
    }
    push() {
        this.ctx.save();
    }
    pop() {
        this.ctx.restore();
    }
}
class Canvy {
    frameRate;
    draw;
    cvs;
    ctx;
    fill = CanvyDrawing.prototype.fill;
    strokeWeight = CanvyDrawing.prototype.strokeWeight;
    strokeStyle = CanvyDrawing.prototype.strokeStyle;
    rect = CanvyDrawing.prototype.rect;
    loadImage = CanvyImage.prototype.loadImage;
    image = CanvyImage.prototype.image;
    imageSection = CanvyImage.prototype.imageSection;
    scale = CanvyTransform.prototype.scale;
    transform = CanvyTransform.prototype.transform;
    translate = CanvyTransform.prototype.translate;
    rotate = CanvyTransform.prototype.rotate;
    push = CanvyTransform.prototype.push;
    pop = CanvyTransform.prototype.pop;
    mouseX;
    mouseY;
    mouseIsPressed;
    mouseButton;
    constructor(canvas, imageSmoothingEnabled = false){
        this.cvs = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = imageSmoothingEnabled;
        this.frameRate = 40;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseIsPressed = false;
        this.mouseButton = -1;
    }
    get width() {
        return this.cvs.width;
    }
    set width(w) {
        this.cvs.width = w;
    }
    get height() {
        return this.cvs.height;
    }
    set height(h) {
        this.cvs.height = h;
    }
    initiate() {
        if (!this.draw) return;
        setInterval(()=>{
            if (this.draw) this.draw();
            this.mouseIsPressed = false;
            this.mouseButton = -1;
        }, 1000 / this.frameRate);
        this.cvs.addEventListener("mousemove", (event)=>{
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
        });
        this.cvs.addEventListener("mousedown", (event)=>{
            this.mouseIsPressed = true;
            this.mouseButton = event.button;
        });
    }
}
class VectorFunctions {
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Vector {
    x;
    y;
    set = VectorFunctions.prototype.set;
    add = VectorMath.prototype.add;
    sub = VectorMath.prototype.sub;
    mult = VectorMath.prototype.mult;
    multVector = VectorMath.prototype.multVector;
    div = VectorMath.prototype.div;
    distSq = VectorMath.prototype.distSq;
    mag = VectorMath.prototype.mag;
    magSq = VectorMath.prototype.magSq;
    dot = VectorMath.prototype.dot;
    norm = VectorMath.prototype.norm;
    normalize = VectorMath.prototype.normalize;
    setMag = VectorMath.prototype.setMag;
    limit = VectorMath.prototype.limit;
    heading = VectorMath.prototype.heading;
    rotate = VectorMath.prototype.rotate;
    reflect = VectorMath.prototype.reflect;
    angleBetween = VectorMath.prototype.angleBetween;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
}
class VectorMath {
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    multVector(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    magSq() {
        return this.x * this.x + this.y * this.y;
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    distSq(vector) {
        const { x , y  } = vector;
        return (this.x - x) ** 2 + (this.y - y) ** 2;
    }
    norm() {
        const mag = this.mag();
        return new Vector(this.x / mag, this.y / mag);
    }
    normalize() {
        const mag = this.mag();
        this.div(mag);
        return this;
    }
    setMag(mag) {
        this.normalize();
        this.mult(mag);
        return this;
    }
    limit(limit) {
        if (this.magSq() < limit ** 2) return;
        this.setMag(limit);
        return this;
    }
    heading() {
        return Math.atan(this.x / this.y);
    }
    rotate(angle) {
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return this;
    }
    reflect(normal) {
        const dot = this.dot(normal);
        this.sub(this.mult(2).mult(dot).multVector(normal));
        return this;
    }
    angleBetween(vector) {
        return Math.acos(this.dot(vector) / (this.mag() * vector.mag()));
    }
}
class Entity {
    id;
    children;
    layers;
    listeners;
    manager;
    behaviors;
    behaviorsActive;
    layer;
    static Events;
    static Behaviors;
    static Settings;
    static create;
    size;
    rotation;
    scale;
    position;
    tags;
    constructor(id, layer, manager){
        this.id = id;
        this.children = new Map();
        this.layers = [];
        this.listeners = new Map();
        this.manager = manager;
        this.behaviorsActive = new Set();
        this.behaviors = new Map();
        this.layer = layer;
        this.size = {
            width: 0,
            height: 0
        };
        this.rotation = 0;
        this.scale = {
            x: 1,
            y: 1
        };
        this.position = new Vector(0, 0);
        this.tags = new Set();
    }
    moveToLayer(layer) {
        this.layer = layer;
    }
    moveChildToLayer(child, layer) {
        if (typeof child === "string") {
            const childInstance = this.getChild(child);
            if (!childInstance) throw new Error(`Entity [${this.id}] has no child [${child}]`);
            child = childInstance;
        }
        this.layers[child.layer].delete(child.id);
        child.moveToLayer(layer);
        this.layers[layer].set(child.id, child);
    }
    addListener(eventName, eventFunction) {
        this.listeners.set(eventName, eventFunction);
        this.manager?.entityListensTo(eventName, this);
    }
    emitEvent(eventName, options) {
        this.manager?.emitEvent(eventName, options);
    }
    activateBehavior(behaviorName) {
        if (!this.behaviors.has(behaviorName)) throw `Entity [${this.id}] has no behavior [${behaviorName}]`;
        this.behaviorsActive.add(behaviorName);
    }
    addBehavior(newBehaviorName, behavior, doActivate = false) {
        this.behaviors.set(newBehaviorName, behavior);
        if (doActivate) this.behaviorsActive.add(newBehaviorName);
    }
    addChildToLayer(entity) {
        if (!this.layers[entity.layer]) this.layers[entity.layer] = new Map();
        this.layers[entity.layer].set(entity.id, entity);
    }
    addChild(entity) {
        this.children.set(entity.id, entity);
        this.addChildToLayer(entity);
    }
    removeChild(entity) {
        this.children.delete(entity.id);
        this.layers[entity.layer].delete(entity.id);
    }
    getChild(id) {
        return this.children.get(id);
    }
    runChildren(canvy) {
        for (const layer of this.layers)layer?.forEach((child)=>child.run(canvy));
    }
    runBehaviors() {
        for (const behavior of this.behaviors.values())behavior();
    }
    applyTransformations(canvy) {
        canvy.translate(this.position.x, this.position.y);
        canvy.rotate(this.rotation);
        canvy.scale(this.scale.x, this.scale.y);
    }
    run(canvy) {
        if (!this.manager) throw new Error(`Entity [${this.id}] need a manager!`);
        canvy.push();
        this.applyTransformations(canvy);
        this.runBehaviors();
        this.runChildren(canvy);
        canvy.pop();
    }
}
class SophyBaseStates {
    static RunEntities = {
        name: "run-entities-base-state",
        addTo: (manager)=>{
            manager.addState(SophyBaseStates.RunEntities.name, ()=>{
                manager.runChildren(manager.canvy);
            });
        }
    };
}
class SophyManager extends Entity {
    static ID = "MANAGER_ID";
    canvy;
    AssetMap;
    keySet;
    states;
    currentState;
    events;
    entityEventListeners;
    entityMap;
    _UnitSize;
    _UnitSqrt;
    constructor(canvy, assetMap, unitSize){
        super(SophyManager.ID, 0);
        this.entityMap = new Map();
        this.canvy = canvy;
        this.AssetMap = assetMap;
        this.events = new Map();
        this.entityEventListeners = new Map();
        this.keySet = new Set();
        addEventListener("keydown", (event)=>{
            this.keySet.add(event.key);
        });
        addEventListener("keyup", (event)=>{
            this.keySet.delete(event.key);
        });
        this.states = new Map();
        SophyBaseStates.RunEntities.addTo(this);
        this.currentState = SophyBaseStates.RunEntities.name;
        this.position.x = canvy.width / 2;
        this.position.y = canvy.height / 2;
        this._UnitSize = unitSize;
        this._UnitSqrt = Math.sqrt(unitSize);
    }
    get UnitSize() {
        return this._UnitSize;
    }
    set UnitSize(newSize) {
        this._UnitSize = newSize;
        this._UnitSqrt = Math.sqrt(newSize);
    }
    get UnitSqrt() {
        return this._UnitSqrt;
    }
    get state() {
        return this.currentState;
    }
    isKeyPressed(key) {
        return this.keySet.has(key);
    }
    entityListensTo(eventName, listener) {
        if (!this.entityEventListeners.has(eventName)) this.entityEventListeners.set(eventName, []);
        this.entityEventListeners.get(eventName).push(listener);
    }
    emitEvent(eventName, options) {
        this.events.set(eventName, {
            options,
            hasCycled: false
        });
    }
    setState(newState) {
        if (!this.states.has(newState)) throw new Error(`State [${newState}] doesn't exist in manager`);
        this.currentState = newState;
    }
    addState(newState, stateFunction) {
        this.states.set(newState, stateFunction);
    }
    runEvents() {
        this.events.forEach((event, eventName)=>{
            event.hasCycled = true;
            this.entityEventListeners.get(eventName)?.forEach((entity)=>{
                const listenerFunction = entity.listeners.get(eventName);
                if (listenerFunction) listenerFunction(event.options);
            });
        });
    }
    clearEvents() {
        for (const eventName of this.events.keys())if (this.events.get(eventName).hasCycled) this.events.delete(eventName);
    }
    run() {
        this.canvy.push();
        this.runEvents();
        this.applyTransformations(this.canvy);
        this.runBehaviors();
        this.states.get(this.currentState)();
        this.clearEvents();
        this.canvy.pop();
    }
}
const throwCustomError = (error, message)=>{
    error.message = message;
    throw error;
};
class SophyBaseControls {
    static Errors = {
        RequiresOptions: new Error("Controller behavior function requires options.")
    };
    static KeyboardControls = {
        name: "sophy-keyboard-controls",
        addTo: (entity, options)=>{}
    };
    static DirectionalMovement = {
        name: "sophy-directional-movement",
        addTo: (entity, options)=>{
            if (options === undefined) {
                throwCustomError(SophyBaseControls.Errors.RequiresOptions, `Directional movement behavior.`);
            }
            entity.addBehavior(SophyBaseControls.DirectionalMovement.name, ()=>{
                for (let key of [
                    "up",
                    "down",
                    "left",
                    "right"
                ]){
                    if (entity.manager?.isKeyPressed(options[key].key)) {
                        const positionCoord = key === "up" || key === "down" ? "y" : "x";
                        key = key;
                        entity.position[positionCoord] += options[key].speed;
                    }
                }
            }, true);
        }
    };
}
class PongPlayer extends Entity {
    static Behaviors = {
        Draw: "draw-pong-player"
    };
    static speed = {
        up: -10,
        down: 10
    };
    static p1Controls = {
        up: "w",
        down: "s"
    };
    static p2Controls = {
        up: "o",
        down: "k"
    };
    constructor(id, manager){
        super(id, 1, manager);
    }
    static create(manager, options) {
        const player = new PongPlayer((options + 1).toString(), manager);
        player.position.x = options * manager.canvy.width / 2 - manager.UnitSize / 5 * options;
        player.size.height = manager.UnitSize;
        player.size.width = manager.UnitSize / 5;
        const controller = options === -1 ? "p1Controls" : "p2Controls";
        SophyBaseControls.DirectionalMovement.addTo(player, {
            up: {
                key: PongPlayer[controller].up,
                speed: PongPlayer.speed.up
            },
            down: {
                key: PongPlayer[controller].down,
                speed: PongPlayer.speed.down
            },
            left: {
                key: "",
                speed: 0
            },
            right: {
                key: "",
                speed: 0
            }
        });
        PongPlayer.DrawBehavior(player);
        manager.addChild(player);
        return player;
    }
    static DrawBehavior(player) {
        const { canvy  } = player.manager;
        player.addBehavior(PongPlayer.Behaviors.Draw, ()=>{
            canvy.fill(255, 255, 255);
            canvy.rect(-player.size.width / 2, -player.size.height / 2, player.size.width, player.size.height);
        }, true);
    }
}
function Pong(cvy) {
    cvy.width = window.innerWidth;
    cvy.height = window.innerHeight;
    const manager = new SophyManager(cvy, null, window.innerHeight / 5);
    manager.position.x = cvy.width / 2;
    manager.position.y = cvy.height / 2;
    PongPlayer.create(manager, -1);
    PongPlayer.create(manager, 1);
    cvy.draw = ()=>{
        cvy.fill(0, 0, 0);
        cvy.rect(0, 0, cvy.width, cvy.height);
        manager.run();
    };
    cvy.initiate();
}
function TESTER(canvasElement) {
    const canvy = new Canvy(canvasElement);
    Pong(canvy);
}
export { TESTER as TESTER };
