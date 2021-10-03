import {
    fabric
} from "fabric";

let actionVector = [{
        type: "navigation",
        handler: (canvas) => {
            let WheelPressed = false;

            function scrollWheelMove(e) {
                if (WheelPressed) {
                    const delta = new fabric.Point(e.movementX, e.movementY);
                    canvas.relativePan(delta);
                }
            }

            function scrollWheelPress(e) {
                if (e.which === 2) {
                    // e.which reprezinta care tasta din mouse a fost apasata si 2=apasatul pe rotita
                    WheelPressed = true;
                }
            }

            function scrollWheelUnpress(e) {
                if (e.which === 2) {
                    WheelPressed = false;
                }
            }

            function zoom(e) {
                let delta = e.deltaY;
                let zoom = canvas.getZoom();
                let zDelta = 0;

                if (delta < 0) {
                    zDelta = 0.4;
                } else if (delta > 0) {
                    zDelta = -0.4;
                }
                if (zoom + zDelta > 0 && zoom + zDelta < 2) {
                    canvas.zoomToPoint({
                            x: e.offsetX,
                            y: e.offsetY,
                        },
                        zoom + zDelta
                    );
                    e.stopPropagation();
                }
            }
            let func = (canvas) => {
                window.addEventListener("wheel", zoom);
                window.addEventListener("mousedown", scrollWheelPress);
                window.addEventListener("mouseup", scrollWheelUnpress);
                window.addEventListener("mousemove", scrollWheelMove);
            };
            let exitFunc = (canvas) => {
                window.removeEventListener("wheel", zoom);
                window.removeEventListener("mousedown", scrollWheelPress);
                window.removeEventListener("mouseup", scrollWheelUnpress);
                window.removeEventListener("mousemove", scrollWheelMove);
                canvas.discardActiveObject();
            };
            let setProps = ()=>{}
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "pen",
        handler: (canvas) => {
            let func = (canvas) => {
                canvas.isDrawingMode = true;
            };
            let exitFunc = (canvas) => {
                canvas.isDrawingMode = false;
            };
            let setProps = (canvas, propertiesObject) => {
                if(propertiesObject.color)
                canvas.freeDrawingBrush.color = propertiesObject.color;
                if(propertiesObject.width)
                canvas.freeDrawingBrush.width = propertiesObject.width;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "square",
        handler: (canvas) => {
            let properties = {};
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button === 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button === 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };
                    let rect = new fabric.Rect({
                        left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                        top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                        fill: properties.fillColor,
                        stroke: properties.strokeColor,
                        strokeWidth: properties.strokeWidth,
                        width: Math.abs(mouseFinal.x - mouse.x),
                        height: Math.abs(mouseFinal.y - mouse.y),
                        selectable: false,
                    });
                    if (rect.get("width") > 5 && rect.get("height") > 5) canvas.add(rect);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.fillColor)
                    properties.fillColor = propertiesObject.fillColor;
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
                if (propertiesObject.strokeWidth>=0)
                    properties.strokeWidth = propertiesObject.strokeWidth;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "line",
        handler: (canvas) => {
            let properties={}
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button === 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button === 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };
                    let line = new fabric.Line(
                        [0, 0, mouseFinal.x - mouse.x, mouseFinal.y - mouse.y], {
                            left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                            top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                            stroke: properties.strokeColor,
                            strokeWidth: properties.strokeWidth,
                            selectable: false,
                        }
                    );
                    canvas.add(line);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
                if (propertiesObject.strokeWidth>=0)
                    properties.strokeWidth = propertiesObject.strokeWidth;
            };

            return [func, exitFunc, setProps];
        },
    },
    {
        type: "arrow",
        handler: (canvas) => {
            let properties = {}
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button == 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button == 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };
                    if (
                        Math.abs(mouse.x - mouseFinal.x) > 20 &&
                        Math.abs(mouse.y - mouseFinal.y) > 20
                    )
                    drawArrow(mouse.x, mouse.y, mouseFinal.x, mouseFinal.y);
                }
            }

            function drawArrow(fromx, fromy, tox, toy) {
                var angle = Math.atan2(toy - fromy, tox - fromx);
                var headlen = 15; // arrow head size
                // bring the line end back some to account for arrow head.
                tox = tox - headlen * Math.cos(angle);
                toy = toy - headlen * Math.sin(angle);

                // calculate the points.
                var points = [{
                        x: fromx, // start point
                        y: fromy,
                    },
                    {
                        x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                        y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
                    },
                    {
                        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
                    },
                    {
                        x: tox - headlen * Math.cos(angle - Math.PI / 2),
                        y: toy - headlen * Math.sin(angle - Math.PI / 2),
                    },
                    {
                        x: tox + headlen * Math.cos(angle), // tip
                        y: toy + headlen * Math.sin(angle),
                    },
                    {
                        x: tox - headlen * Math.cos(angle + Math.PI / 2),
                        y: toy - headlen * Math.sin(angle + Math.PI / 2),
                    },
                    {
                        x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                        y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
                    },
                    {
                        x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                        y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
                    },
                    {
                        x: fromx,
                        y: fromy,
                    },
                ];

                var pline = new fabric.Polyline(points, {
                    fill: properties.fillColor,
                    stroke: properties.strokeColor,
                    opacity: 1,
                    strokeWidth: 3,
                    originX: "left",
                    originY: "top",
                    selectable: false,
                });

                canvas.add(pline);

                canvas.renderAll();
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.fillColor)
                    properties.fillColor = propertiesObject.fillColor;
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
            };

            return [func, exitFunc, setProps];
        },
    },
    {
        type: "circle",
        handler: (canvas) => {
            let properties = {};
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button === 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button === 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };

                    let object = new fabric.Circle({
                        radius: Math.min(
                            Math.abs(mouseFinal.x - mouse.x),
                            Math.abs(mouseFinal.y - mouse.y)
                        ) / 2,
                        fill: properties.fillColor,
                        strokeWidth: properties.strokeWidth,
                        stroke: properties.strokeColor,
                        left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                        top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                        selectable: false,
                    });
                    if (object.get("width") > 5 && object.get("height") > 5)
                        canvas.add(object);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.fillColor)
                    properties.fillColor = propertiesObject.fillColor;
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
                if (propertiesObject.strokeWidth>=0)
                    properties.strokeWidth = propertiesObject.strokeWidth;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "triangle",
        handler: (canvas) => {
            let properties = {}
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button === 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button === 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };

                    let object = new fabric.Triangle({
                        width: Math.abs(mouseFinal.x - mouse.x),
                        height: Math.abs(mouseFinal.y - mouse.y),
                        fill: properties.fillColor,
                        stroke: properties.strokeColor,
                        strokeWidth: properties.strokeWidth,
                        left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                        top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                        selectable: false,
                    });
                    if (object.get("width") > 5 && object.get("height") > 5)
                        canvas.add(object);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.fillColor)
                    properties.fillColor = propertiesObject.fillColor;
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
                if (propertiesObject.strokeWidth>=0)
                    properties.strokeWidth = propertiesObject.strokeWidth;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "ellipse",
        handler: (canvas) => {
            let properties = {}
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button == 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button == 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };
                    let object = new fabric.Ellipse({
                        rx: Math.abs(mouse.x - mouseFinal.x) / 2,
                        ry: Math.abs(mouse.y - mouseFinal.y) / 2,
                        fill: properties.fillColor,
                        stroke: properties.strokeColor,
                        strokeWidth: properties.strokeWidth,
                        selectable: false,
                        left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                        top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                    });

                    if (object.get("width") > 5 && object.get("height") > 5)
                        canvas.add(object);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.fillColor)
                    properties.fillColor = propertiesObject.fillColor;
                if (propertiesObject.strokeColor)
                    properties.strokeColor = propertiesObject.strokeColor;
                if (propertiesObject.strokeWidth>=0)
                    properties.strokeWidth = propertiesObject.strokeWidth;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "textbox",
        handler: (canvas) => {
            let properties = {}
            let mouse = {
                x: -1,
                y: -1,
            };

            function f1(e) {
                if (e.button == 1) {
                    mouse.x = canvas.getPointer().x;
                    mouse.y = canvas.getPointer().y;
                }
            }

            function f2(e) {
                if (e.button == 1) {
                    let mouseFinal = {
                        x: canvas.getPointer().x,
                        y: canvas.getPointer().y,
                    };
                    let object = new fabric.Textbox("Write something here ...", {
                        width: Math.abs(mouse.x - mouseFinal.x),
                        height: Math.abs(mouse.y - mouseFinal.y),
                        left: mouse.x > mouseFinal.x ? mouseFinal.x : mouse.x,
                        top: mouse.y > mouseFinal.y ? mouseFinal.y : mouse.y,
                        fontSize: properties.fontSize,
                        fill: properties.textColor,
                        fontWeight: properties.bold?'bold':'',
                        underline: properties.underline,
                        fontStyle: properties.italic?'italic':'normal',
                        textAlign: "center",
                        lockScalingY: true,
                        selectable: false,
                    });

                    if (
                        Math.abs(mouse.x - mouseFinal.x) > 5 &&
                        Math.abs(mouse.y - mouseFinal.y) > 5
                    )
                        canvas.add(object);
                }
            }
            let func = (canvas) => {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
                canvas.on("mouse:down", f1);
                canvas.on("mouse:up", f2);
            };
            let exitFunc = (canvas) => {
                canvas.off("mouse:down", f1);
                canvas.off("mouse:up", f2);
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };
            let setProps = (canvas, propertiesObject) => {
                if (propertiesObject.textColor)
                    properties.textColor = propertiesObject.textColor;
                if (propertiesObject.fontSize>0)
                    properties.fontSize = propertiesObject.fontSize;
                if (propertiesObject.bold!=undefined)
                    properties.bold = propertiesObject.bold;
                if (propertiesObject.underline!=undefined)
                    properties.underline = propertiesObject.underline;
                if (propertiesObject.italic!=undefined)
                    properties.italic = propertiesObject.italic;
            };
            return [func, exitFunc, setProps];
        },
    },
    {
        type: "eraser",
        handler: (canvas) => {
            let pressed = false;

            function setPressedTrue(e) {
                if (e.button == 1) pressed = true;
            }

            function setPressedFalse(e) {
                if (e.button == 1) pressed = false;
            }

            function drawPointer(e) {
                let toRemove = canvas.getObjects().find((obj) => obj.id === "pointer");
                if (toRemove) canvas.remove(toRemove);
                if (pressed) {
                    let object = new fabric.Circle({
                        radius: Math.min(Math.abs(10), Math.abs(10)),
                        fill: "grey",
                        left: canvas.getPointer().x,
                        top: canvas.getPointer().y,
                        originX: "center",
                        originY: "center",
                        id: "pointer",
                        selectable: false,
                        evented: false,
                    });
                    canvas.add(object);
                }
            }

            function f1(e) {
                if (pressed) {
                    canvas.setActiveObject(e.target);
                    
                    canvas.remove(canvas.getActiveObject());
                }
            }
            let func = (canvas) => {
                canvas.selection = false;
                canvas.on("mouse:down", setPressedTrue);
                canvas.on("mouse:up", setPressedFalse);
                canvas.on("mouse:move", drawPointer);
                canvas.forEachObject(function (object) {
                    object.set({
                        perPixelTargetFind: true,
                    });
                    object.on("mousemove", f1);
                    object.set({
                        selectable: false
                    });
                });
            };
            let exitFunc = (canvas) => {
                canvas.selection = true;
                canvas.off("mouse:down", setPressedTrue);
                canvas.off("mouse:up", setPressedFalse);
                canvas.off("mouse:move", drawPointer);
                canvas.forEachObject(function (object) {
                    object.set({
                        perPixelTargetFind: false,
                    });
                    object.off("mousemove", f1);
                    object.set({
                        selectable: true
                    });
                });
            };
            let setProps = ()=>{}
            return [func, exitFunc, setProps];
        },
    },
];

let initAction = (canvas, appliedActionVector) => {
    let action = {
        type: "pen",
        index: -1,
        setAction: (name) => {
            action.type = name;
            for (let i = 0; i < appliedActionVector.length; i++) {
                if (appliedActionVector[i].type === action.type) {
                    if (action.index >= 0) {
                        appliedActionVector[action.index].exitFunc(canvas);
                    }
                    action.index = i;
                    appliedActionVector[i].func(canvas);
                    break;
                }
            }
        },
        setProperties: (propertiesObject) => {
            for (let i = 0; i < appliedActionVector.length; i++) {
                if (appliedActionVector[i].type === action.type) {
                    appliedActionVector[i].setProps(canvas, propertiesObject);
                    break;
                }
            }
        },
    };
    return action;
};

export {
    actionVector,
    initAction
};