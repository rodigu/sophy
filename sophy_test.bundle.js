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
    static random(mag) {
        const v = new Vector(1, 0);
        v.rotate(Math.random() * 2 * 3.14);
        if (mag) v.setMag(mag);
        return v;
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
    collisionMapping;
    static Events;
    static Behaviors;
    static Settings;
    static create;
    size;
    rotation;
    scale;
    position;
    tags;
    _collider;
    constructor(id, layer, manager){
        this.id = id;
        this.children = new Map();
        this.layers = [];
        this.listeners = new Map();
        this.collisionMapping = new Map();
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
    setCollider(collider) {
        this._collider = collider;
    }
    addCollisionToMapping(entity, collidesWith, event) {
        if (!this.collisionMapping.has(entity.id)) this.collisionMapping.set(entity.id, []);
        const mapping = this.collisionMapping.get(entity.id);
        mapping.push({
            collidesWith,
            event
        });
    }
    get collider() {
        if (this._collider === undefined) throw new Error(`Entity [${this.id}] has no collider.`);
        return this._collider;
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
        for (const layer of this.layers){
            layer?.forEach((child)=>{
                child.run(canvy);
                const collisions = this.collisionMapping.get(child.id);
                collisions?.forEach((collision)=>{
                    const { collidesWith , event  } = collision;
                    if (child.collider.collidesWith(collidesWith.collider)) {
                        child.manager?.emitEvent(event.name, event.options);
                    }
                });
            });
        }
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
    topLeft;
    bottomRight;
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
        this.topLeft = {
            x: -this.position.x,
            y: -this.position.y
        };
        this.bottomRight = {
            x: this.position.x,
            y: this.position.y
        };
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
class SophyBaseBehaviors {
    static Errors = {
        BehaviorRequiresManager: new Error("Behavior requires entity with a manager.")
    };
    static KeepWithinCanvas = {
        name: "keep-entity-withing-canvas",
        addTo: (entity, doActivate = true, options = {
            x: 0,
            y: 0
        })=>{
            if (entity.manager === undefined) throwCustomError(SophyBaseBehaviors.Errors.BehaviorRequiresManager, `->KeepWithinCanvas`);
            const manager = entity.manager;
            const { canvy  } = manager;
            entity.addBehavior(SophyBaseBehaviors.KeepWithinCanvas.name, ()=>{
                if (entity.position.x < options.x + manager.topLeft.x) entity.position.x = options.x + manager.topLeft.x;
                if (entity.position.y < options.y + manager.topLeft.y) entity.position.y = options.y + manager.topLeft.y;
                if (entity.position.x > -options.x + manager.bottomRight.x) entity.position.x = -options.x + manager.bottomRight.x;
                if (entity.position.y > -options.y + manager.bottomRight.y) entity.position.y = -options.y + manager.bottomRight.y;
            }, doActivate);
        }
    };
}
class SophyBaseControls {
    static Errors = {
        RequiresOptions: new Error("Controller behavior function requires options.")
    };
    static KeyboardControls = {
        name: "sophy-keyboard-controls",
        addTo: (entity, doActivate = true, options)=>{}
    };
    static DirectionalMovement = {
        name: "sophy-directional-movement",
        addTo: (entity, doActivate = true, options)=>{
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
            }, doActivate);
        }
    };
}
class Collider {
    topLeft;
    bottomRight;
    parentPosition;
    constructor(topLeft, bottomRight, parentPosition){
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
        this.parentPosition = parentPosition;
    }
    static defaultCollider(parent) {
        return new Collider({
            x: -parent.size.width / 2,
            y: -parent.size.height / 2
        }, {
            x: parent.size.width / 2,
            y: parent.size.height / 2
        }, parent.position);
    }
    get x0() {
        return this.topLeft.x + this.parentPosition.x;
    }
    get y0() {
        return this.topLeft.y + this.parentPosition.y;
    }
    get realTopLeft() {
        return {
            x: this.x0,
            y: this.y0
        };
    }
    get x1() {
        return this.bottomRight.x + this.parentPosition.x;
    }
    get y1() {
        return this.bottomRight.y + this.parentPosition.y;
    }
    get realBottomRight() {
        return {
            x: this.x1,
            y: this.y1
        };
    }
    get realBottomLeft() {
        return {
            x: this.topLeft.x + this.parentPosition.x,
            y: this.bottomRight.y + this.parentPosition.y
        };
    }
    get realTopRight() {
        return {
            x: this.bottomRight.x + this.parentPosition.x,
            y: this.topLeft.y + this.parentPosition.y
        };
    }
    pointIsIn(point) {
        return point.x > this.x0 && point.x < this.x1 && point.y > this.y0 && point.y < this.y1;
    }
    collidesWith(other) {
        return this.pointIsIn(other.realTopLeft) || this.pointIsIn(other.realBottomRight) || this.pointIsIn(other.realBottomLeft) || this.pointIsIn(other.realTopRight) || other.pointIsIn(this.realTopLeft) || other.pointIsIn(this.realBottomRight) || other.pointIsIn(this.realBottomLeft) || other.pointIsIn(this.realTopRight);
    }
}
class PongPlayer extends Entity {
    static Behaviors = {
        Draw: "draw-pong-player"
    };
    static speed = {
        up: -20,
        down: 20
    };
    static p1Controls = {
        up: "w",
        down: "s"
    };
    static p2Controls = {
        up: "o",
        down: "k"
    };
    manager;
    static Instances = [];
    constructor(id, manager){
        super(id, 1, manager);
        this.manager = manager;
        PongPlayer.Instances.push(this);
        PongPlayer.speed = {
            up: -manager.UnitSize / 8,
            down: manager.UnitSize / 8
        };
    }
    static create(manager, options) {
        const player = new PongPlayer((options + 1).toString(), manager);
        player.position.x = options * manager.canvy.width / 2 - manager.UnitSize / 5 * options;
        player.size.height = manager.UnitSize;
        player.size.width = manager.UnitSize / 5;
        const controller = options === -1 ? "p1Controls" : "p2Controls";
        SophyBaseControls.DirectionalMovement.addTo(player, true, {
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
        SophyBaseBehaviors.KeepWithinCanvas.addTo(player, true, {
            x: player.size.width / 2,
            y: player.size.height / 2
        });
        PongPlayer.DrawBehavior(player);
        PongPlayer.AddCollider(player);
        manager.addChild(player);
        return player;
    }
    static AddCollider(player) {
        player.setCollider(new Collider({
            x: -player.size.width / 2,
            y: -player.size.height / 2
        }, {
            x: player.size.width / 2,
            y: player.size.height / 2
        }, player.position));
    }
    static DrawBehavior(player) {
        const { canvy  } = player.manager;
        player.addBehavior(PongPlayer.Behaviors.Draw, ()=>{
            canvy.fill(255, 255, 255);
            canvy.rect(-player.size.width / 2, -player.size.height / 2, player.size.width, player.size.height);
        }, true);
    }
}
class SophyHelpers {
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    static randint(min, max) {
        return Math.floor(SophyHelpers.random(min, max));
    }
    static randSign() {
        return Math.sign(Math.random() - 0.5);
    }
    static randElement(list) {
        return list[SophyHelpers.randint(0, list.length)];
    }
    static PI = 3.1415;
    static randAngle(min, max) {
        return SophyHelpers.random(min * SophyHelpers.PI, max * SophyHelpers.PI);
    }
}
class PongBall extends Entity {
    static Behaviors = {
        Move: "move-ball",
        Draw: "draw-ball",
        Bound: "bound-ball"
    };
    static Events = {
        CollisionWithPlayer: "ball-collides-with-player"
    };
    manager;
    speed;
    static Instances = [];
    constructor(manager){
        super("ball", 1);
        this.manager = manager;
        this.speed = Vector.random(9);
        this.size.width = manager.UnitSize / 5;
        this.size.height = manager.UnitSize / 5;
        PongBall.Instances.push(this);
    }
    static MoveBehavior(ball) {
        ball.addBehavior(PongBall.Behaviors.Move, ()=>{
            ball.position.add(ball.speed);
        }, true);
    }
    static DrawBehavior(ball) {
        ball.addBehavior(PongBall.Behaviors.Draw, ()=>{
            ball.manager.canvy.fill(255, 255, 255);
            ball.manager.canvy.rect(-ball.size.width / 2, -ball.size.width / 2, ball.size.width, ball.size.height);
        }, true);
    }
    static BoundaryBounce(ball) {
        ball.addBehavior(PongBall.Behaviors.Bound, ()=>{
            if (ball.position.y < ball.manager.topLeft.y + ball.size.height) ball.speed.y = -ball.speed.y;
            else if (ball.position.y > ball.manager.bottomRight.y - ball.size.height) ball.speed.y = -ball.speed.y;
        }, true);
    }
    static PlayerCollisionEmit(ball) {
        ball.setCollider(Collider.defaultCollider(ball));
        for (const instance of PongPlayer.Instances){
            ball.manager.addCollisionToMapping(ball, instance, {
                name: PongBall.Events.CollisionWithPlayer,
                options: {}
            });
        }
    }
    static PlayerCollisionListen(ball) {
        ball.addListener(PongBall.Events.CollisionWithPlayer, ()=>{
            ball.speed.x = -ball.speed.x;
            ball.speed.mult(SophyHelpers.random(0.9, 1.2));
            if (ball.manager.isKeyPressed(PongPlayer.p1Controls.up) || ball.manager.isKeyPressed(PongPlayer.p2Controls.up)) {
                if (ball.speed.y > 0) {
                    ball.speed.y *= -1;
                    ball.speed.mult(SophyHelpers.random(0.9, 1.2));
                    ball.speed.x += SophyHelpers.random(0, 0.5) * Math.sign(ball.speed.x);
                } else ball.speed.mult(SophyHelpers.random(0.8, 1.1));
                ball.speed.y += SophyHelpers.random(-0.5, -0.1);
            } else if (ball.manager.isKeyPressed(PongPlayer.p1Controls.down) || ball.manager.isKeyPressed(PongPlayer.p2Controls.down)) {
                if (ball.speed.y < 0) {
                    ball.speed.y *= -1;
                    ball.speed.mult(SophyHelpers.random(0.9, 1.2));
                    ball.speed.x += SophyHelpers.random(0, 0.5) * Math.sign(ball.speed.x);
                } else ball.speed.mult(SophyHelpers.random(0.8, 1.1));
                ball.speed.y += SophyHelpers.random(0.1, 0.5);
            }
            ball.position.add(ball.speed);
        });
    }
    static create(manager) {
        const ball = new PongBall(manager);
        PongBall.DrawBehavior(ball);
        PongBall.MoveBehavior(ball);
        PongBall.BoundaryBounce(ball);
        PongBall.PlayerCollisionEmit(ball);
        PongBall.PlayerCollisionListen(ball);
        manager.addChild(ball);
        return ball;
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
    PongBall.create(manager);
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
