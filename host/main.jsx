////////////////////////////////////////////
// Check opened documents
////////////////////////////////////////////
function doYouHaveDoc() {
    if (app.documents.length < 1) {
        return false;
    } else {
        return true;
    }
}

////////////////////////////////////////////
// Check selected marquee
////////////////////////////////////////////
function doYouHaveSelectedMarquee() {
    try {
        app.activeDocument.selection.bounds;
        return true;
    } catch (e) {
        return false;
    }
}

////////////////////////////////////////////
// Check background layer
////////////////////////////////////////////
function isBackgroundLayer() {
    return activeDocument.activeLayer.isBackgroundLayer;
}

////////////////////////////////////////////
// Check empty
////////////////////////////////////////////
function isEmpty() {
    var sb = app.activeDocument.activeLayer.bounds,
        sWidth = (Number(sb[2]) - Number(sb[0]));
    if (sWidth < 1) {
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////
// Random number generator
////////////////////////////////////////////
function getRandomNumber(layersCount, min, max) {
    var res = [];
    for (var i = 0; i < layersCount; i++) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        res.push(Math.round(rand));
    }
    return res;
}

////////////////////////////////////////////
// Open file
////////////////////////////////////////////
function openF(imgPath) {
    open(File(imgPath));
}

////////////////////////////////////////////
// Translate image to layer position
////////////////////////////////////////////
function moveImageToLayer(sX, sY, imgX, imgY) {
    var deltaX = -1 * (imgX - sX) - 1,
        deltaY = -1 * (imgY - sY) - 1;
    app.activeDocument.activeLayer.translate(deltaX, deltaY);
}

////////////////////////////////////////////
// Apply clipping mask
////////////////////////////////////////////
function createClippingMask() {
    try {
        var idGrpL = charIDToTypeID("GrpL");
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref1.putEnumerated(idLyr, idOrdn, idTrgt);
        desc3.putReference(idnull, ref1);
        executeAction(idGrpL, desc3, DialogModes.NO);
    } catch(e) {
        alert(e.line + '\n' + e);
    }
}

////////////////////////////////////////////
// Paste smart object
////////////////////////////////////////////
function pasteSmartObject(imgPath) {
    try {
        var idPlc = charIDToTypeID("Plc ");
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        desc3.putPath(idnull, new File(imgPath));
        var idFTcs = charIDToTypeID("FTcs");
        var idQCSt = charIDToTypeID("QCSt");
        var idQcszero = charIDToTypeID("Qcs0");
        desc3.putEnumerated(idFTcs, idQCSt, idQcszero);
        var idOfst = charIDToTypeID("Ofst");
        var desc4 = new ActionDescriptor();
        var idHrzn = charIDToTypeID("Hrzn");
        var idPxl = charIDToTypeID("#Pxl");
        desc4.putUnitDouble(idHrzn, idPxl, 0);
        var idVrtc = charIDToTypeID("Vrtc");
        var idPxl = charIDToTypeID("#Pxl");
        desc4.putUnitDouble(idVrtc, idPxl, 0);
        desc3.putObject(idOfst, idOfst, desc4);
        executeAction(idPlc, desc3, DialogModes.NO);
    } catch(e) {
        alert(e.line + '\n' + e);
    }
}

////////////////////////////////////////////
// Resize image to layer size
////////////////////////////////////////////
function resizeLayer(sWidth, sHeight) {
    try {
        var startRulerUnits = app.preferences.rulerUnits;
        app.preferences.rulerUnits = Units.PIXELS;
        var LB = app.activeDocument.activeLayer.bounds;
        var ww = LB[2].value - LB[0].value;
        var hh = LB[3].value - LB[1].value;
        var lWidth = 100 / ww;
        var lHeight = 100 / hh;
        var NewWidth = lWidth * sWidth;
        var NewHeight = lHeight * sHeight;

        // Plz, kill me for
        if (sWidth == sHeight) {
            if (hh > ww) {
                NewHeight = NewWidth;
            } else {
                NewWidth = NewHeight;
            }
        } else {
            if (sWidth > sHeight) {
                NewHeight = NewWidth;
            } else {
                NewWidth = NewHeight;
            }
        }
        app.activeDocument.activeLayer.resize(Number(NewWidth), Number(NewHeight), AnchorPosition.MIDDLECENTER);
        app.preferences.rulerUnits = startRulerUnits;
    } catch(e) {
        alert(e.line + '\n' + e);
    }
}



////////////////////////////////////////////
// Get selected layers
////////////////////////////////////////////
function getSelectedLayers() {
    try {
        function getSelectedLayersIdx() {
            var selectedLayers = new Array;
            var ref = new ActionReference();
            ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
            var desc = executeActionGet(ref);
            if (desc.hasKey(stringIDToTypeID('targetLayers'))) {
                desc = desc.getList(stringIDToTypeID('targetLayers'));
                var c = desc.count
                var selectedLayers = new Array();
                for (var i = 0; i < c; i++) {
                    try {
                        activeDocument.backgroundLayer;
                        selectedLayers.push(desc.getReference(i).getIndex());
                    } catch (e) {
                        selectedLayers.push(desc.getReference(i).getIndex() + 1);
                    }
                }
            } else {
                var ref = new ActionReference();
                ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("ItmI"));
                ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
                try {
                    activeDocument.backgroundLayer;
                    selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID("ItmI")) - 1);
                } catch (e) {
                    selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID("ItmI")));
                }
            }
            return selectedLayers;
        }

        function makeActiveByIndex(idx, visible) {
            for (var i = 0; i < idx.length; i++) {
                var desc = new ActionDescriptor();
                var ref = new ActionReference();
                ref.putIndex(charIDToTypeID("Lyr "), idx[i])
                desc.putReference(charIDToTypeID("null"), ref);
                if (i > 0) {
                    var idselectionModifier = stringIDToTypeID("selectionModifier");
                    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
                    var idaddToSelection = stringIDToTypeID("addToSelection");
                    desc.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
                }
                desc.putBoolean(charIDToTypeID("MkVs"), visible);
                executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
            }
        }

        // Make an array of selected layers
        var sl = getSelectedLayersIdx();
        var sLayers = new Array();
        for (var i = 0, l = sl.length; i < l; i++) {
            makeActiveByIndex([sl[i]], false);
            sLayers.push(activeDocument.activeLayer);
        }

        return sLayers;
    } catch(e) {
        alert(e.line + '\n' + e);
    }
};

////////////////////////////////////////////
// Get count of images in the folder
////////////////////////////////////////////
function getPhotosCount(assetsPath, g) {
    try {
        var folder = new Folder(assetsPath + "/1000faces/" + g + "/");
        var files = folder.getFiles(/\.(jpg|tif|psd|bmp|gif|png|)$/i);
        return files.length;
    } catch(e){
        alert(e.line + '\n' + e);
    }
}


////////////////////////////////////////////
// Add single photo
////////////////////////////////////////////
function startSingle(imgPath) {
    try {
        function placePhoto() {
            if (doYouHaveSelectedMarquee() == true) {
                var sb = app.activeDocument.selection.bounds,
                    sWidth = (Number(sb[2]) - Number(sb[0])) + 2,
                    sHeight = (Number(sb[3]) - Number(sb[1])) + 2;
                pasteSmartObject(imgPath);
                resizeLayer(sWidth, sHeight);
            } else {
                pasteSmartObject(imgPath);
                resizeLayer(200, 200);
            }
        }
        if (doYouHaveDoc() == false) {
            openF(imgPath);
        } else {
            app.activeDocument.suspendHistory("Place userpic", "placePhoto()");
        }
    } catch(e) {
        alert(e.line + '\n' + e);
    }
}

////////////////////////////////////////////
// Add any photos
////////////////////////////////////////////
function startMulti(selectedGender, imgPath, assetsPath) {
    try {
        var randomImageId = [],
            groupedLayers = [],
            wc = (getPhotosCount(assetsPath, "women")) - 1,
            mc = (getPhotosCount(assetsPath, "men")) - 1;

        function placePhotos(groupedLayers, layersCount) {
            var randomMen = getRandomNumber(layersCount, 0, mc);
            var randomWomen = getRandomNumber(layersCount, 0, wc);

            for (var i = 0, l = layersCount; i < l; ++i) {

                app.activeDocument.activeLayer = groupedLayers[i];

                if (app.activeDocument.activeLayer.kind == "LayerKind.SOLIDFILL" || app.activeDocument.activeLayer.kind == "LayerKind.NORMAL") {

                    if (isEmpty() == true || isBackgroundLayer() == true) {
                        pasteSmartObject(imgPath);
                        resizeLayer(200, 200);
                    } else {
                        var sb = app.activeDocument.activeLayer.bounds,
                            sX = Number(sb[0]),
                            sY = Number(sb[1]),
                            sWidth = (Number(sb[2]) - Number(sb[0])) + 2,
                            sHeight = (Number(sb[3]) - Number(sb[1])) + 2;
                        pasteSmartObject(imgPath);
                        resizeLayer(sWidth, sHeight);
                        var imgX = app.activeDocument.activeLayer.bounds[0],
                            imgY = app.activeDocument.activeLayer.bounds[1];
                        moveImageToLayer(sX, sY, imgX, imgY);
                        createClippingMask();
                    }
                } else {
                    pasteSmartObject(imgPath);
                    resizeLayer(200, 200);
                }
                
                if (selectedGender == 'men') {
                    imgPath = assetsPath + "/1000faces/men/" + randomMen[i] + ".jpg";
                }
                if (selectedGender == 'women') {
                    imgPath = assetsPath + "/1000faces/women/" + randomWomen[i] + ".jpg";
                }
                if (selectedGender == 'both') {
                    var both = getRandomNumber(1, 0, 1);
                    if (both == 1) {
                        imgPath = assetsPath + "/1000faces/men/" + randomMen[i] + ".jpg";
                    } else {
                        imgPath = assetsPath + "/1000faces/women/" + randomWomen[i] + ".jpg";
                    }
                }
            }
        }

        if (doYouHaveDoc() == false) {
            openF(imgPath);
        } else {
            groupedLayers = getSelectedLayers();
            var layersCount = groupedLayers.length;
            app.activeDocument.suspendHistory("Place " + layersCount + " userpics", "placePhotos(groupedLayers, layersCount)");
        }
    } catch (e) {
        startSingle(imgPath);
        alert(e.line + '\n' + e);
    }
}