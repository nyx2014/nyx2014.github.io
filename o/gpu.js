
var Entity;
(function(Entity_1) {
    (function(Type) {
        Type[Type["EMPTY"] = 0] = "EMPTY";
        Type[Type["SPHERE"] = 1] = "SPHERE";
        Type[Type["CUBOID"] = 2] = "CUBOID";
        Type[Type["CYLINDER"] = 3] = "CYLINDER";
        Type[Type["CONE"] = 4] = "CONE";
        Type[Type["TRIANGLE"] = 5] = "TRIANGLE";
        Type[Type["PLANE"] = 6] = "PLANE";
        Type[Type["LIGHTSPHERE"] = 7] = "LIGHTSPHERE";
    })(Entity_1.Type || (Entity_1.Type = {}));
    var Type = Entity_1.Type;
    var Entity = (function() {
        function Entity(opts) {
            this.entityType = opts.entityType;
            this.opacity = opts.opacity;
            this.ambientColor = opts.ambientColor;
            this.specularReflection = opts.specularReflection;
            this.lambertianReflection = opts.lambertianReflection;
            this.x = opts.x || 0;
            this.y = opts.y || 0;
            this.z = opts.z || 0;
            this.red = opts.red || 0;
            this.blue = opts.blue || 0;
            this.green = opts.green || 0;
            this.width = opts.width || 0;
            this.height = opts.height || 0;
            this.depth = opts.depth || 0;
            this.radius = opts.radius || 0;
            this.directionX = opts.directionX || 0;
            this.directionY = opts.directionY || 0;
            this.directionZ = opts.directionZ || 0;
            this.constant = opts.constant || 0;
        }
        Entity.prototype.toVector = function() {
            var array = [
                this.entityType,
                this.x,
                this.y,
                this.z,
                this.width,
                this.height,
                this.depth,
                this.radius,
                this.red,
                this.green,
                this.blue,
                this.lambertianReflection,
                this.opacity,
                this.specularReflection,
                this.ambientColor,
                this.directionX,
                this.directionY,
                this.directionZ,
                this.constant
            ];
            return array;
        };
        Entity.prototype.fromNumberArray = function(array) {};
        return Entity;
    }());
    Entity_1.Entity = Entity;
})(Entity || (Entity = {}));
var upVector = [0, 1, 0];
var intoVector = [0, 0, 1];
var rightVector = [1, 0, 0];
var zeroVector = [0, 0, 0];

function vecDotProduct(a, b) {
    return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
}

function dotProduct(x1, x2, x3, y1, y2, y3) {
    return x1 * y1 + x2 * y2 + x3 * y3;
}

function vecCrossProduct(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function crossProductX(x1, x2, x3, y1, y2, y3) {
    return x2 * y3 - x3 * y2;
}

function crossProductY(x1, x2, x3, y1, y2, y3) {
    return x3 * y1 - x1 * y3;
}

function crossProductZ(x1, x2, x3, y1, y2, y3) {
    return x1 * y2 - x2 * y1;
}

function vecScale(a, sc) {
    return [a[0] * sc, a[1] * sc, a[2] * sc];
}

function scaleX(x1, x2, x3, scale) {
    return scale * x1;
}

function scaleY(x1, x2, x3, scale) {
    return scale * x2;
}

function scaleZ(x1, x2, x3, scale) {
    return scale * x3;
}

function vecMagnitude(a) {
    return Math.sqrt(vecDotProduct(a, a));
}

function magnitude(x1, x2, x3) {
    return Math.sqrt(x1 * x1 + x2 * x2 + x3 * x3);
}

function vecNormalize(a) {
    var mag = vecMagnitude(a);
    return vecScale(a, 1 / mag);
}

function normalizeX(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleX(x1, x2, x3, 1 / mag);
}

function normalizeY(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleY(x1, x2, x3, 1 / mag);
}

function normalizeZ(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleZ(x1, x2, x3, 1 / mag);
}

function vecAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function addX(x1, x2, x3, y1, y2, y3) {
    return x1 + y1;
}

function addY(x1, x2, x3, y1, y2, y3) {
    return x2 + y2;
}

function addZ(x1, x2, x3, y1, y2, y3) {
    return x3 + y3;
}

function vecAdd3(a, b, c) {
    return [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
}

function add3X(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
    return x1 + y1 + z1;
}

function add3Y(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
    return x2 + y2 + z2;
}

function add3Z(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
    return x3 + y3 + z3;
}

function vecSubtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function subtractX(x1, x2, x3, y1, y2, y3) {
    return x1 - y1;
}

function subtractY(x1, x2, x3, y1, y2, y3) {
    return x2 - y2;
}

function subtractZ(x1, x2, x3, y1, y2, y3) {
    return x3 - y3;
}

function sphereIntersection(spherePtX, spherePtY, spherePtZ, sphereRadius, rayPtX, rayPtY, rayPtZ, rayVecX, rayVecY, rayVecZ) {
    var eyeToCenterX = spherePtX - rayPtX;
    var eyeToCenterY = spherePtY - rayPtY;
    var eyeToCenterZ = spherePtZ - rayPtZ;
    var sideLength = dotProduct(eyeToCenterX, eyeToCenterY, eyeToCenterZ, rayVecX, rayVecY, rayVecZ);
    var cameraToCenterLength = dotProduct(eyeToCenterX, eyeToCenterY, eyeToCenterZ, eyeToCenterX, eyeToCenterY, eyeToCenterZ);
    var discriminant = (sphereRadius * sphereRadius) - cameraToCenterLength + (sideLength * sideLength);
    if (discriminant < 0) {
        return -1;
    } else {
        return sideLength - Math.sqrt(discriminant);
    }
}

function sphereNormalX(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX,
        y = surfacePtY - spherePtY,
        z = surfacePtZ - spherePtZ;
    return x * (1 / magnitude(x, y, z));
}

function sphereNormalY(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX,
        y = surfacePtY - spherePtY,
        z = surfacePtZ - spherePtZ;
    return y * (1 / magnitude(x, y, z));
}

function sphereNormalZ(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX,
        y = surfacePtY - spherePtY,
        z = surfacePtZ - spherePtZ;
    return z * (1 / magnitude(x, y, z));
}

function reflectVecX(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecXScaled = normalVecX * scaleFactor * 2;
    return normalVecXScaled - incidentVecX;
}

function reflectVecY(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecYScaled = normalVecY * scaleFactor * 2;
    return normalVecYScaled - incidentVecY;
}

function reflectVecZ(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecZScaled = normalVecZ * scaleFactor * 2;
    return normalVecZScaled - incidentVecZ;
}

function planeIntersection(normalVecX, normalVecY, normalVecZ, distance, rayPtX, rayPtY, rayPtZ, rayVecX, rayVecY, rayVecZ) {
    var denom = dotProduct(rayVecX, rayVecY, rayVecZ, normalVecX, normalVecY, normalVecZ);
    if (denom !== 0) {
        var t = -(distance + (rayPtX * normalVecX + rayPtY * normalVecY + rayPtZ * normalVecZ)) / denom;
        if (t < 0) {
            return -1;
        } else {
            return t;
        }
    } else {
        return -1;
    }
}
(function unitTests() {
    function expect(desc, expr, val) {
        if (expr !== val) {
            throw ("FAIL: " + desc + " / Actual: " + expr + " / Expected: " + val);
        }
    }
    expect("addX", addX(1, 2, 3, 4, 5, 6), 5);
    expect("addY", addY(1, 2, 3, 4, 5, 6), 7);
    expect("addZ", addZ(1, 2, 3, 4, 5, 6), 9);
    expect("add3X", add3X(1, 2, 3, 4, 5, 6, 7, 8, 9), 12);
    expect("add3Y", add3Y(1, 2, 3, 4, 5, 6, 7, 8, 9), 15);
    expect("add3Z", add3Z(1, 2, 3, 4, 5, 6, 7, 8, 9), 18);
    expect("subtractX", subtractX(1, 2, 3, 4, 5, 6), -3);
    expect("subtractY", subtractY(1, 2, 3, 4, 5, 6), -3);
    expect("subtractZ", subtractZ(1, 2, 3, 4, 5, 6), -3);
    expect("magnitude", magnitude(2, 3, 4), Math.sqrt(4 + 9 + 16));
    expect("normalizeX", normalizeX(7, 24, 0), 7 / 25);
    expect("normalizeY", normalizeY(7, 24, 0), 24 / 25);
    expect("normalizeZ", normalizeZ(0, 24, 7), 7 / 25);
    expect("scaleX", scaleX(1, 2, 3, 3), 3);
    expect("scaleY", scaleY(1, 2, 3, 3), 6);
    expect("scaleZ", scaleZ(1, 2, 3, 3), 9);
    expect("crossProductX", crossProductX(2, 3, 4, 5, 6, 7), -3);
    expect("crossProductY", crossProductY(2, 3, 4, 5, 6, 7), 6);
    expect("crossProductZ", crossProductZ(2, 3, 4, 5, 6, 7), -3);
    expect("dotProduct", dotProduct(2, 3, 4, 5, 6, 7), 56);
})();
var vectorFunctions = [
    addX, addY, addZ,
    add3X, add3Y, add3Z,
    subtractX, subtractY, subtractZ,
    magnitude,
    normalizeX, normalizeY, normalizeZ,
    crossProductX, crossProductY, crossProductZ,
    scaleX, scaleY, scaleZ,
    dotProduct,
    sphereIntersection,
    sphereNormalX, sphereNormalY, sphereNormalZ,
    reflectVecX, reflectVecY, reflectVecZ,
    planeIntersection
];

function square(x) {
    return x * x;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(square(x2 - x1) + square(y2 - y1));
}
var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};
var utilityFunctions = [square, dist];
var Scene;
(function(Scene) {
    var camera = [
        0, 0, 25,
        0, 0, 24,
        45
    ];
    var light_opts = [{
        entityType: Entity.Type.LIGHTSPHERE,
        red: 1,
        green: 1,
        blue: 1,
        x: 0,
        y: 7,
        z: 0,
        radius: 0.1,
        specularReflection: 0.0,
        lambertianReflection: 1,
        ambientColor: 1,
        opacity: 1.0,
        directionX: 0,
        directionY: 0,
        directionZ: 0
    }];
    var lights = light_opts.map(function(light) {
        return [light.x, light.y + 0.5, light.z, light.red, light.green, light.blue];
    });
    var sphere_opts = [{
        entityType: Entity.Type.SPHERE,
        red: 1.0,
        green: 0.7,
        blue: 0.7,
        x: -4,
        y: 3.5,
        z: -2,
        radius: 0.5,
        specularReflection: 0.1,
        lambertianReflection: 1,
        ambientColor: 0.1,
        opacity: 1.0,
        directionX: 0.05,
        directionY: 0.05,
        directionZ: -0.05
    },
        {
            entityType: Entity.Type.SPHERE,
            red: 1.0,
            green: 0.7,
            blue: 0.2,
            x: -4,
            y: 3.5,
            z: -2,
            radius: 0.7,
            specularReflection: 0.2,
            lambertianReflection: 0.7,
            ambientColor: 0.1,
            opacity: 1.0,
            directionX: 0.07,
            directionY: 0.02,
            directionZ: 0.11
        },
        {
            entityType: Entity.Type.SPHERE,
            red: 0.6,
            green: 0.7,
            blue: 0.3,
            x: -4,
            y: 3.5,
            z: -2,
            radius: 0.4,
            specularReflection: 0.2,
            lambertianReflection: 0.6,
            ambientColor: 0.1,
            opacity: 1.0,
            directionX: 0.02,
            directionY: -0.02,
            directionZ: -0.05
        },
        {
            entityType: Entity.Type.SPHERE,
            red: 0.4,
            green: 0.2,
            blue: 0.4,
            x: -4,
            y: 3.5,
            z: -2,
            radius: 0.9,
            specularReflection: 0.2,
            lambertianReflection: 0.8,
            ambientColor: 0.1,
            opacity: 1.0,
            directionX: 0.04,
            directionY: -0.06,
            directionZ: 0.11
        }
    ];
    var generateRandomSpheres = function(count) {
        var ary = [];
        var minDirection = -0.15,
            maxDirection = 0.15;
        for (var i = 0; i < count; i++) {
            ary.push({
                entityType: Entity.Type.SPHERE,
                red: rand(0.05, 0.95),
                green: rand(0.05, 0.95),
                blue: rand(0.05, 0.95),
                x: rand(-7, 7),
                y: rand(0, 7),
                z: rand(-7, 2),
                //radius: rand(0.3, 2.5),
                radius: rand(0.3, 0.5),
                specularReflection: rand(0.1, 0.2),
                lambertianReflection: rand(0.8, 1),
                ambientColor: rand(0.1, 0.4),
                opacity: 1,
                //opacity: rand(0, 1),
                directionX: rand(minDirection, maxDirection),
                directionY: rand(minDirection, maxDirection),
                directionZ: rand(minDirection, maxDirection)
            });
        }
        return ary;
    };
    var plane_opts = [{
        entityType: Entity.Type.PLANE,
        red: 1.0,
        green: 1.0,
        blue: 1.0,
        x: 0,
        y: 3,
        z: 0,
        specularReflection: 0,
        lambertianReflection: 1,
        ambientColor: 0.2,
        opacity: 1.0,
        directionX: 0,
        directionY: 0,
        directionZ: 0,
        constant: 28
    }];
    var opts = generateRandomSpheres(parseInt(document.getElementById('sphere-count').value))
        .concat(light_opts);
    var entities = opts.map(function(opt) {
        return new Entity.Entity(opt);
    }).map(function(ent) {
        return ent.toVector();
    });
    var eyeVector = vecNormalize(vecSubtract([camera[3], camera[4], camera[5]], [camera[0], camera[1], camera[2]]));
    var vpRight = vecNormalize(vecCrossProduct(eyeVector, upVector));
    var vpUp = vecNormalize(vecCrossProduct(vpRight, eyeVector));
    var canvasHeight = 640;
    var canvasWidth = 640;
    var fieldOfViewRadians = Math.PI * (camera[6] / 2) / 180;
    var heightWidthRatio = canvasHeight / canvasWidth;
    var halfWidth = Math.tan(fieldOfViewRadians);
    var halfHeight = heightWidthRatio * halfWidth;
    var cameraWidth = halfWidth * 2;
    var cameraHeight = halfHeight * 2;
    var pixelWidth = cameraWidth / (canvasWidth - 1);
    var pixelHeight = cameraHeight / (canvasHeight - 1);
    Scene.generateScene = function() {
        return {
            camera: camera,
            lights: lights,
            entities: entities,
            eyeVector: eyeVector,
            vpRight: vpRight,
            vpUp: vpUp,
            canvasHeight: canvasHeight,
            canvasWidth: canvasWidth,
            fovRadians: fieldOfViewRadians,
            heightWidthRatio: heightWidthRatio,
            halfWidth: halfWidth,
            halfHeight: halfHeight,
            cameraWidth: cameraWidth,
            cameraHeight: cameraHeight,
            pixelWidth: pixelWidth,
            pixelHeight: pixelHeight
        };
    };
    Scene.updateSphereCount = function(count) {
        opts = generateRandomSpheres(count).concat(light_opts);
        entities = opts.map(function(opt) {
            return new Entity.Entity(opt);
        }).map(function(ent) {
            return ent.toVector();
        });
        return entities;
    };
})(Scene || (Scene = {}));

var Mode;
(function(Mode) {
    Mode[Mode["GPU"] = 0] = "GPU";
})(Mode || (Mode = {}));

var kernelDimension = 4
var mode = Mode.GPU;
var canvasNeedsUpdate = true;
var isRunning = false;
var stringOfMode = function(mode) {
    return "gpu";
};

var updateFPS = function(fps) {
    var f = document.querySelector("#fps");
    f.innerHTML = fps.toString();
};


function generateCanvasGrid(dim) {
    var canvasContainer = document.getElementById("canvas-container");
    var divs = [];
    for (var i = 0; i < dim; i++) {
        var divElem = document.createElement('div');
        for (var j = 0; j < dim; j++) {
            var spanElem = document.createElement('span');
            spanElem.id = "canvas" + (j + (i * dim));
            spanElem.className = "canvas";
            divElem.appendChild(spanElem);
        }
        divs.push(divElem);
    }
    for (var i = divs.length - 1; i >= 0; i--) {
        canvasContainer.appendChild(divs[i]);
    }
}

function removeCanvasGrid() {
    var canvasContainer = document.getElementById("canvas-container");
    while (canvasContainer.lastChild) {
        for (var i = 0; i < canvasContainer.lastChild.childNodes.length; i++) {
            canvasContainer.lastChild.childNodes[i] = null;
        }
        canvasContainer.removeChild(canvasContainer.lastChild);
    }
}

var updateSphereCount = function(count) {
    var newEntities = Scene.updateSphereCount(count);
    scene.entities = newEntities;
    _a = generateKernels(kernelDimension, scene), gpuKernels = _a[0];
    renderLoop = renderer(gpuKernels,  scene);
    canvasNeedsUpdate = true;
    setTimeout(function() {
        isRunning = true;
        if (isRunning) {
            renderLoop();
        };
    }, 1000);
    var _a;
};

var renderer = function(gpuKernels, scene) {
    var camera = scene.camera,
        lights = scene.lights,
        entities = scene.entities,
        eyeVector = scene.eyeVector,
        vpRight = scene.vpRight,
        vpUp = scene.vpUp,
        canvasHeight = scene.canvasHeight,
        canvasWidth = scene.canvasWidth,
        fovRadians = scene.fovRadians,
        heightWidthRatio = scene.heightWidthRatio,
        halfWidth = scene.halfWidth,
        halfHeight = scene.halfHeight,
        cameraWidth = scene.cameraWidth,
        cameraHeight = scene.cameraHeight,
        pixelWidth = scene.pixelWidth,
        pixelHeight = scene.pixelHeight;

    var fps = {
        startTime: 0,
        frameNumber: 0,
        totalFrameCount: 0,
        getFPS: function() {
            this.totalFrameCount++;
            this.frameNumber++;
            var d = new Date().getTime();
            var currentTime = (d - this.startTime) / 1000;
            var result = Math.floor(this.frameNumber / currentTime);
            if (currentTime > 1) {
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }
            return result;
        }
    };
    var nextTick = function() {
        if (!isRunning) {
            return;
        }

        updateFPS(fps.getFPS().toString());


        var startTime, endTime;

        for (var i = 0; i < gpuKernels.length; i++) {
            var gpuKernel = gpuKernels[i];
            gpuKernel(camera, lights, entities, eyeVector, vpRight, vpUp, canvasHeight, canvasWidth, fovRadians, heightWidthRatio, halfWidth, halfHeight, cameraWidth, cameraHeight, pixelWidth, pixelHeight, i % kernelDimension, Math.floor(i / kernelDimension));
            if (canvasNeedsUpdate) {
                var cv = document.getElementById("canvas" + i).childNodes[0];
                var bdy = cv.parentNode;
                var newCanvas = gpuKernel.canvas;
                bdy.replaceChild(newCanvas, cv);
            }
        }
        if (canvasNeedsUpdate) {
            canvasNeedsUpdate = false;
        }

        for (var idx = 0; idx < entities.length; idx++) {
            entities[idx] = moveEntity(canvasWidth, canvasWidth, canvasWidth, entities[idx]);
        }
        entities = checkSphereSphereCollision(entities);

        requestAnimationFrame(nextTick);

    };
    var checkSphereSphereCollision = function(allEntities) {
        for (var first = 0; first < allEntities.length - 1; first++) {
            if (allEntities[first][0] !== Entity.Type.SPHERE) {
                continue;
            }
            var sphere = allEntities[first];
            for (var second = first + 1; second < allEntities.length; second++) {
                if (allEntities[second][0] !== Entity.Type.SPHERE) {
                    continue;
                }
                var other = allEntities[second];
                var distance = vecMagnitude(vecSubtract([sphere[1], sphere[2], sphere[3]], [other[1], other[2], other[3]]));
                var radiusSum = sphere[7] + other[7];
                if (distance < radiusSum + (0.05 * radiusSum)) {
                    var basisVector = vecNormalize(vecSubtract([sphere[1], sphere[2], sphere[3]], [other[1], other[2], other[3]]));
                    var v1 = [sphere[15], sphere[16], sphere[17]];
                    var x1 = vecDotProduct(basisVector, v1);
                    var v1x = vecScale(basisVector, x1);
                    var v1y = vecSubtract(v1, v1x);
                    var m1 = 1;
                    basisVector = vecScale(basisVector, -1);
                    var v2 = [other[15], other[16], other[17]];
                    var x2 = vecDotProduct(basisVector, v2);
                    var v2x = vecScale(basisVector, x2);
                    var v2y = vecSubtract(v2, v2x);
                    var m2 = 1;
                    var newSphereVelocity = vecAdd3(vecScale(v1x, (m1 - m2) / (m1 + m2)), vecScale(v2x, (2 * m2) / (m1 + m2)), v1y);
                    allEntities[first][15] = newSphereVelocity[0];
                    allEntities[first][16] = newSphereVelocity[1];
                    allEntities[first][17] = newSphereVelocity[2];
                    var otherSphereVelocity = vecAdd3(vecScale(v1x, (2 * m2) / (m1 + m2)), vecScale(v2x, (m2 - m1) / (m1 + m2)), v2y);
                    allEntities[second][15] = otherSphereVelocity[0];
                    allEntities[second][16] = otherSphereVelocity[1];
                    allEntities[second][17] = otherSphereVelocity[2];
                    for (var colIdx = 8; colIdx < 11; colIdx++) {
                        allEntities[first][colIdx] = rand(0, 1);
                        allEntities[second][colIdx] = rand(0, 1);
                    }
                }
            }
        }
        return allEntities;
    };
    var moveEntity = function(width, height, depth, entity) {
        var reflect = function(entity, normal) {
            var incidentVec = [entity[15], entity[16], entity[17]];
            var dp = vecDotProduct(incidentVec, normal);
            var tmp = vecSubtract(incidentVec, vecScale(normal, 2 * dp));
            return tmp;
        };
        entity[1] += entity[15];
        entity[2] += entity[16];
        entity[3] += entity[17];
        if (entity[1] < -7) {
            _a = reflect(entity, [1, 0, 0]), entity[15] = _a[0], entity[16] = _a[1], entity[17] = _a[2];
        }
        if (entity[1] > 7) {
            _b = reflect(entity, [-1, 0, 0]), entity[15] = _b[0], entity[16] = _b[1], entity[17] = _b[2];
        }
        if (entity[2] < -7) {
            _c = reflect(entity, [0, 1, 0]), entity[15] = _c[0], entity[16] = _c[1], entity[17] = _c[2];
        }
        if (entity[2] > 7) {
            _d = reflect(entity, [0, -1, 0]), entity[15] = _d[0], entity[16] = _d[1], entity[17] = _d[2];
        }
        if (entity[3] < -15) {
            _e = reflect(entity, [0, 0, 1]), entity[15] = _e[0], entity[16] = _e[1], entity[17] = _e[2];
        }
        if (entity[3] > 7) {
            _f = reflect(entity, [0, 0, -1]), entity[15] = _f[0], entity[16] = _f[1], entity[17] = _f[2];
        }
        return entity;
        var _a, _b, _c, _d, _e, _f;
    };
    return nextTick;
};
var createKernel = function(modeNumber, scene) {
    var mode = stringOfMode(modeNumber);
    var opt = {
        mode: mode,
        output: [Math.floor(scene.canvasWidth / kernelDimension), Math.floor(scene.canvasHeight / kernelDimension)],
        graphical: true,
        safeTextureReadHack: false,
        constants: {
            ENTITY_COUNT: scene.entities.length,
            LIGHT_COUNT: scene.lights.length,
            SPHERE: Entity.Type.SPHERE,
            PLANE: Entity.Type.PLANE,
            LIGHTSPHERE: Entity.Type.LIGHTSPHERE
        }
    };
    var gpu = new GPU({ mode });
    addFunctions(gpu, vectorFunctions);
    addFunctions(gpu, utilityFunctions);
    return gpu.createKernel(function(camera, lights, entities, eyeVector, vpRight, vpUp, canvasHeight, canvasWidth, fovRadians, heightWidthRatio, halfWidth, halfHeight, cameraWidth, cameraHeight, pixelWidth, pixelHeight, xOffset, yOffset) {
        var x = this.thread.x + (this.output.x * xOffset);
        var y = this.thread.y + (this.output.y * yOffset);
        var xCompX = vpRight[0] * (x * pixelWidth - halfWidth);
        var xCompY = vpRight[1] * (x * pixelWidth - halfWidth);
        var xCompZ = vpRight[2] * (x * pixelWidth - halfWidth);
        var yCompX = vpUp[0] * (y * pixelHeight - halfHeight);
        var yCompY = vpUp[1] * (y * pixelHeight - halfHeight);
        var yCompZ = vpUp[2] * (y * pixelHeight - halfHeight);
        var rayPtX = camera[0];
        var rayPtY = camera[1];
        var rayPtZ = camera[2];
        var rayVecX = eyeVector[0] + xCompX + yCompX;
        var rayVecY = eyeVector[1] + xCompY + yCompY;
        var rayVecZ = eyeVector[2] + xCompZ + yCompZ;
        var normRayVecX = normalizeX(rayVecX, rayVecY, rayVecZ);
        var normRayVecY = normalizeY(rayVecX, rayVecY, rayVecZ);
        var normRayVecZ = normalizeZ(rayVecX, rayVecY, rayVecZ);
        var red = 0.30;
        var green = 0.35;
        var blue = 0.31;
        var nearestEntityIndex = -1;
        var maxEntityDistance = Math.pow(2, 32);
        var nearestEntityDistance = Math.pow(2, 32);
        for (var i = 0; i < this.constants.ENTITY_COUNT; i++) {
            var distance = -1;
            var entityType = entities[i][0];
            if (entityType == this.constants.SPHERE ||
                entityType == this.constants.LIGHTSPHERE) {
                distance = sphereIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][7], rayPtX, rayPtY, rayPtZ, normRayVecX, normRayVecY, normRayVecZ);
            } else if (entityType == this.constants.PLANE) {
                distance = planeIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][18], rayPtX, rayPtY, rayPtZ, normRayVecX, normRayVecY, normRayVecZ);
            }
            if (distance >= 0 && distance < nearestEntityDistance) {
                nearestEntityIndex = i;
                nearestEntityDistance = distance;
                red = entities[i][8];
                green = entities[i][9];
                blue = entities[i][10];
            }
        }
        //this.color(red, green, blue);
        this.color(255, 255, 255);

        if (nearestEntityIndex >= 0) {
            var entityPtX = entities[nearestEntityIndex][1];
            var entityPtY = entities[nearestEntityIndex][2];
            var entityPtZ = entities[nearestEntityIndex][3];
            var entityRed = entities[nearestEntityIndex][8];
            var entityGreen = entities[nearestEntityIndex][9];
            var entityBlue = entities[nearestEntityIndex][10];
            var intersectPtX = rayPtX + normRayVecX * nearestEntityDistance;
            var intersectPtY = rayPtY + normRayVecY * nearestEntityDistance;
            var intersectPtZ = rayPtZ + normRayVecZ * nearestEntityDistance;
            var sphereNormPtX = sphereNormalX(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var sphereNormPtY = sphereNormalY(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var sphereNormPtZ = sphereNormalZ(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var lambertRed = 0,
                lambertGreen = 0,
                lambertBlue = 0;
            for (var i = 0; i < this.constants.LIGHT_COUNT; i++) {
                var lightPtX = lights[i][0];
                var lightPtY = lights[i][1];
                var lightPtZ = lights[i][2];
                var vecToLightX = sphereNormalX(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var vecToLightY = sphereNormalY(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var vecToLightZ = sphereNormalZ(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var shadowCast = -1;
                var lambertAmount = 0;
                var entityLambert = entities[nearestEntityIndex][11];
                for (var j = 0; j < this.constants.ENTITY_COUNT; j++) {
                    if (entities[j][0] == this.constants.SPHERE) {
                        var distance = sphereIntersection(entities[j][1], entities[j][2], entities[j][3], entities[j][7], intersectPtX, intersectPtY, intersectPtZ, vecToLightX, vecToLightY, vecToLightZ);
                        if (distance > -0.005) {
                            shadowCast = 1;
                        }
                    }
                }
                if (shadowCast < 0) {
                    var contribution = dotProduct(vecToLightX, vecToLightY, vecToLightZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                    if (contribution > 0) {
                        lambertAmount += contribution;
                    }
                }
                lambertAmount = Math.min(1, lambertAmount);
                lambertRed += entityRed * lambertAmount * entityLambert;
                lambertGreen += entityGreen * lambertAmount * entityLambert;
                lambertBlue += entityBlue * lambertAmount * entityLambert;
            }
            var specularRed = 0,
                specularBlue = 0,
                specularGreen = 0;
            var incidentRayVecX = rayVecX;
            var incidentRayVecY = rayVecY;
            var incidentRayVecZ = rayVecZ;
            var reflectedPtX = intersectPtX;
            var reflectedPtY = intersectPtY;
            var reflectedPtZ = intersectPtZ;
            var depthLimit = 3;
            var depth = 0;
            var entitySpecular = entities[nearestEntityIndex][13];
            while (depth < depthLimit) {
                var reflectedVecX = -reflectVecX(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var reflectedVecY = -reflectVecY(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var reflectedVecZ = -reflectVecZ(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var nearestEntityIndexSpecular = -1;
                var maxEntityDistanceSpecular = Math.pow(2, 32);
                var nearestEntityDistanceSpecular = Math.pow(2, 32);
                for (var i = 0; i < this.constants.ENTITY_COUNT; i++) {
                    if (entities[i][0] == this.constants.SPHERE) {
                        var distance = sphereIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][7], reflectedPtX, reflectedPtY, reflectedPtZ, reflectedVecX, reflectedVecY, reflectedVecZ);
                        if (distance >= 0 && distance < nearestEntityDistance) {
                            nearestEntityIndexSpecular = i;
                            nearestEntityDistanceSpecular = distance;
                        }
                    }
                }
                if (nearestEntityIndexSpecular >= 0) {
                    entityPtX = entities[nearestEntityIndexSpecular][1];
                    entityPtY = entities[nearestEntityIndexSpecular][2];
                    entityPtZ = entities[nearestEntityIndexSpecular][3];
                    specularRed += entities[nearestEntityIndexSpecular][8] * entitySpecular;
                    specularGreen += entities[nearestEntityIndexSpecular][9] * entitySpecular;
                    specularBlue += entities[nearestEntityIndexSpecular][10] * entitySpecular;
                    reflectedPtX = reflectedPtX + normalizeX(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    reflectedPtY = reflectedPtY + normalizeY(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    reflectedPtZ = reflectedPtZ + normalizeZ(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    sphereNormPtX = sphereNormalX(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    sphereNormPtY = sphereNormalZ(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    sphereNormPtY = sphereNormalZ(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    incidentRayVecX = reflectedVecX;
                    incidentRayVecY = reflectedVecY;
                    incidentRayVecZ = reflectedVecZ;
                    depth += 1;
                } else {
                    depth = depthLimit;
                }
            }
            var ambient = entities[nearestEntityIndex][14];
            this.color(lambertRed + (lambertRed * specularRed) + entityRed * ambient, lambertGreen + (lambertGreen * specularGreen) + entityGreen * ambient, lambertBlue + (lambertBlue * specularBlue) + entityBlue * ambient);
        }
    }, opt);
};
var generateKernels = function(dim, scene) {
    removeCanvasGrid();
    generateCanvasGrid(dim);
    var kernelCount = dim * dim;
    var gpuKernels = [];

    for (var i = 0; i < kernelCount; i++) {
        var kernel = createKernel(Mode.GPU, scene);
        gpuKernels.push(kernel);
        document.getElementById('canvas' + i).appendChild(kernel.canvas);
    }
    return [gpuKernels];
};
var addFunctions = function(gpu, functions) {
    return functions.forEach(function(f) {
        return gpu.addFunction(f);
    });
};

var scene = Scene.generateScene();
var _a = generateKernels(kernelDimension, scene),
    gpuKernels = _a[0],
    cpuKernels = _a[1];
var renderLoop = renderer(gpuKernels, scene);

var primopopup = 0;

var myTimerObj = (function(document){

    var myTimer;

    function start() {
        myTimer = setInterval(myClock, 1000);
        var c = 0;

        function myClock() {
            c++;
            document.getElementById("runtimer").innerHTML = c + " s";
        }
    }

    function end() {
        clearInterval(myTimer);
    }

    return {start:start, end:end};
})(document);




function StartStop(el) {

    if(el.value == "Stop")
    {

        isRunning = !isRunning;
        el.value == "Start"
    }
    else if(el.value == "Start")
    {
        isRunning = !isRunning;
    }


    if(isRunning)
    {
        if(primopopup ==0) {
            primopopup =1;
        }
        el.value = "Stop";
        myTimerObj.start();
        renderLoop();

    }
    else
    {
        el.value = "Start";
        myTimerObj.end();
    }
}