function onLoaded() {
    var csInterface = new CSInterface();
	

    updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
    // Update the color of the panel when the theme color of the product changed.
    csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
	
    // Listen vulcan message
    var eventType = new SuiteMessageEvent(SuiteMessageEvent.TYPE + ".HelloCSComm").type;
    VulcanInterface.addEventListener(eventType, 
        function(event) {
            alert("Received:" + event.getPayload());
        }); 
}

/**
 * Update the theme with the AppSkinInfo retrieved from the host product.
 */
function updateThemeWithAppSkinInfo(appSkinInfo) {
	
    //Update the background color of the panel
    var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
    document.body.bgColor = toHex(panelBackgroundColor);
        
    var styleId = "ppstyle";
    
    var csInterface = new CSInterface();
	var appName = csInterface.hostEnvironment.appName;
    
    if(appName == "PHXS"){
	    addRule(styleId, "button, select, input[type=button], input[type=number], input[type=submit]", "border-radius:3px;");
	}
	if(appName == "PHXS" || appName == "PPRO" || appName == "PRLD") {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// NOTE: Below theme related code are only suitable for Photoshop.                            //
		// If you want to achieve same effect on other products please make your own changes here.    //
		////////////////////////////////////////////////////////////////////////////////////////////////
		
	    
	    var gradientBg = "background-image: -webkit-linear-gradient(top, " + toHex(panelBackgroundColor, 40) + " , " + toHex(panelBackgroundColor, 10) + ");";
	    var gradientDisabledBg = "background-image: -webkit-linear-gradient(top, " + toHex(panelBackgroundColor, 15) + " , " + toHex(panelBackgroundColor, 5) + ");";
	    var boxShadow = "-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);";
	    var boxActiveShadow = "-webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);";
	    
	    var isPanelThemeLight = panelBackgroundColor.red > 127;
	    var fontColor, disabledFontColor;
	    var borderColor;
	    var inputBackgroundColor;
	    var gradientHighlightBg;
	    if(isPanelThemeLight) {
	    	fontColor = "#000000;";
	    	disabledFontColor = "color:" + toHex(panelBackgroundColor, -70) + ";";
	    	borderColor = "border-color: " + toHex(panelBackgroundColor, -90) + ";";
	    	inputBackgroundColor = toHex(panelBackgroundColor, 54) + ";";
	    	gradientHighlightBg = "background-image: -webkit-linear-gradient(top, " + toHex(panelBackgroundColor, -40) + " , " + toHex(panelBackgroundColor,-50) + ");";
            addRule(styleId, "select", "background: url(../img/arr-b.png) center right no-repeat;");
            addRule(styleId, "input[type=checkbox]:checked + label:before", "background-image: url(../img/check-b.png);");
            addRule(styleId, "input[type=radio]:checked + label:before", "background-image: url(../img/radio-b.png);");
            addRule(styleId, "body", "color: #505050;");
            addRule(styleId, "#random span", "background-image: url(../img/refresh-b.png);");
	    } else {
	    	fontColor = "#ffffff;";
	    	disabledFontColor = "color:" + toHex(panelBackgroundColor, 100) + ";";
	    	borderColor = "border-color: " + toHex(panelBackgroundColor, -45) + ";";
	    	inputBackgroundColor = toHex(panelBackgroundColor, -20) + ";";
	    	gradientHighlightBg = "background-image: -webkit-linear-gradient(top, " + toHex(panelBackgroundColor, -20) + " , " + toHex(panelBackgroundColor, -30) + ");";
            addRule(styleId, "select", "background: url(../img/arr-w.png) center right no-repeat;");
            addRule(styleId, "input[type=checkbox]:checked + label:before", "background-image: url(../img/check-w.png);");
            addRule(styleId, "input[type=radio]:checked + label:before", "background-image: url(../img/radio-w.png);");
            addRule(styleId, "body", "color: #cbcbcb;");
            addRule(styleId, "#random span", "background-image: url(../img/refresh-w.png);");
	    }
	    
	
	    //Update the default text style with pp values
	    
	    addRule(styleId, "body, .menu, .logo, button, select, input[type=text], input[type=button], input[type=submit], input[type=number]", "background-color:" + toHex(panelBackgroundColor) + ";");
        addRule(styleId, "button, select, input[type=text], input[type=button], input[type=submit], input[type=number], label", "color:" + fontColor + ";");
        
	    addRule(styleId, "button, select, input[type=text], input[type=button], input[type=submit], input[type=number]", borderColor);    
	    addRule(styleId, "button, input[type=button], input[type=submit]", gradientBg);    
	    addRule(styleId, "button, input[type=button], input[type=submit]", boxShadow);
        
	    addRule(styleId, "button:enabled:active, input[type=button]:enabled:active, input[type=submit]:enabled:active", gradientHighlightBg);
	    addRule(styleId, "button:enabled:active, input[type=button]:enabled:active, input[type=submit]:enabled:active", boxActiveShadow);
        
	    addRule(styleId, "[disabled]", gradientDisabledBg);
	    addRule(styleId, "[disabled]", disabledFontColor);
        
	    addRule(styleId, "input[type=text], input[type=number], select, label:before", "background-color: " + inputBackgroundColor + ";");
	    addRule(styleId, "input[type=text]:focus, input[type=number]:focus", "background-color: #ffffff; outline:0; color: #000000;");
        addRule(styleId, "select:focus", "outline:0; color: #000000;  background: #ffffff url(../img/arr-b.png) center right no-repeat;");
	    
	} else {
		// For AI, ID and FL use old implementation	
		addRule(styleId, "body", "color:" + reverseColor(panelBackgroundColor) + "; background-color:" + toHex(panelBackgroundColor, 20));
	    addRule(styleId, "button", "border-color: " + toHex(panelBgColor, -50));
	}
}

function addRule(stylesheetId, selector, rule) {
    var stylesheet = document.getElementById(stylesheetId);
    
    if (stylesheet) {
        stylesheet = stylesheet.sheet;
           if( stylesheet.addRule ){
               stylesheet.addRule(selector, rule);
           } else if( stylesheet.insertRule ){
               stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
           }
    }
}


function reverseColor(color, delta) {
    return toHex({red:Math.abs(255-color.red), green:Math.abs(255-color.green), blue:Math.abs(255-color.blue)}, delta);
}

/**
 * Convert the Color object to string in hexadecimal format;
 */
function toHex(color, delta) {
    function computeValue(value, delta) {
        var computedValue = !isNaN(delta) ? value + delta : value;
        if (computedValue < 0) {
            computedValue = 0;
        } else if (computedValue > 255) {
            computedValue = 255;
        }

        computedValue = computedValue.toString(16);
        return computedValue.length == 1 ? "0" + computedValue : computedValue;
    }

    var hex = "";
    if (color) {
        with (color) {
             hex = computeValue(red, delta) + computeValue(green, delta) + computeValue(blue, delta);
        };
    }
    return "#" + hex;
}

function onAppThemeColorChanged(event) {
    // Should get a latest HostEnvironment object from application.
    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
    // Gets the style information such as color info from the skinInfo, 
    // and redraw all UI controls of your extension according to the style info.
    updateThemeWithAppSkinInfo(skinInfo);
} 