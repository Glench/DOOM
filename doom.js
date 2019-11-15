(function() {
  var DOOM, act, attrNames, propNames, read, styleNames, svgElms, svgNS, write, xlinkNS;
  svgNS = "http://www.w3.org/2000/svg";
  xlinkNS = "http://www.w3.org/1999/xlink";
  attrNames = {
    gradientUnits: "gradientUnits",
    preserveAspectRatio: "preserveAspectRatio",
    startOffset: "startOffset",
    viewBox: "viewBox"
  };
  propNames = {
    childNodes: true,
    firstChild: true,
    innerHTML: true,
    lastChild: true,
    nextSibling: true,
    parentElement: true,
    parentNode: true,
    previousSibling: true,
    textContent: true,
    value: true
  };
  styleNames = {
    animation: true,
    animationDelay: true,
    background: true,
    border: true,
    borderTop: true,
    borderLeft: true,
    borderRight: true,
    borderBottom: true,
    borderRadius: true,
    color: true,
    display: true,
    fontSize: "html",
    fontFamily: true,
    fontWeight: true,
    height: "html",
    left: true,
    letterSpacing: true,
    lineHeight: true,
    maxHeight: true,
    maxWidth: true,
    margin: true,
    marginTop: true,
    marginLeft: true,
    marginRight: true,
    marginBottom: true,
    minWidth: true,
    minHeight: true,
    opacity: "html",
    overflow: true,
    overflowX: true,
    overflowY: true,
    padding: true,
    paddingTop: true,
    paddingLeft: true,
    paddingRight: true,
    paddingBottom: true,
    pointerEvents: true,
    position: true,
    textDecoration: true,
    top: true,
    transform: "html",
    transition: true,
    visibility: true,
    width: "html",
    zIndex: true
  };
  svgElms = {
    circle: true,
    clipPath: true,
    defs: true,
    g: true,
    image: true,
    mask: true,
    path: true,
    rect: true,
    svg: true,
    text: true,
    use: true
  };
  read = function(elm, k) {
    var base, base1, base2;
    if (propNames[k] != null) {
      return (base = elm._HTML_prop)[k] != null ? base[k] : base[k] = elm[k];
    } else if (styleNames[k] != null) {
      return (base1 = elm._HTML_style)[k] != null ? base1[k] : base1[k] = elm.style[k];
    } else {
      k = attrNames[k] != null ? attrNames[k] : attrNames[k] = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      return (base2 = elm._HTML_attr)[k] != null ? base2[k] : base2[k] = elm.getAttribute(k);
    }
  };
  write = function(elm, k, v) {
    var cache, isCached, ns;
    if (propNames[k] != null) {
      cache = elm._HTML_prop;
      isCached = cache[k] === v;
      if (!isCached) {
        return elm[k] = cache[k] = v;
      }
    } else if ((styleNames[k] != null) && !(elm._DOOM_SVG && styleNames[k] === "html")) {
      cache = elm._HTML_style;
      isCached = cache[k] === v;
      if (!isCached) {
        return elm.style[k] = cache[k] = v;
      }
    } else {
      cache = elm._HTML_attr;
      if (cache[k] === v) {
        return;
      }
      cache[k] = v;
      ns = k === "xlink:href" ? xlinkNS : null;
      k = attrNames[k] != null ? attrNames[k] : attrNames[k] = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (ns != null) {
        if (v != null) {
          return elm.setAttributeNS(ns, k, v);
        } else {
          return elm.removeAttributeNS(ns, k);
        }
      } else {
        if (v != null) {
          return elm.setAttribute(k, v);
        } else {
          return elm.removeAttribute(k);
        }
      }
    }
  };
  act = function(elm, opts) {
    var k, v;
    if (elm._HTML_attr == null) {
      elm._HTML_attr = {};
    }
    if (elm._HTML_prop == null) {
      elm._HTML_prop = {};
    }
    if (elm._HTML_style == null) {
      elm._HTML_style = {};
    }
    if (typeof opts === "object") {
      for (k in opts) {
        v = opts[k];
        write(elm, k, v);
        null;
      }
      return elm;
    } else if (typeof opts === "string") {
      return read(elm, opts);
    }
  };
  DOOM = function(elms, opts) {
    var elm, results;
    if (typeof elms !== "array") {
      elms = [elms];
    }
    if (!(function() {
      var i, len, results1;
      results1 = [];
      for (i = 0, len = elms.length; i < len; i++) {
        elm = elms[i];
        results1.push(elm != null);
      }
      return results1;
    })()) {
      throw new Error("DOOM was called with a null element");
    }
    if (opts == null) {
      throw new Error("DOOM was called with null options");
    }
    results = (function() {
      var i, len, results1;
      results1 = [];
      for (i = 0, len = elms.length; i < len; i++) {
        elm = elms[i];
        results1.push(act(elm, opts));
      }
      return results1;
    })();
    if (results.length === 1) {
      return results[0];
    } else {
      return results;
    }
  };
  DOOM.create = function(type, parent, opts) {
    var elm;
    if (svgElms[type] != null) {
      elm = document.createElementNS(svgNS, type);
      if (type === "svg") {
        (opts != null ? opts : opts = {}).xmlns = svgNS;
      } else {
        elm._DOOM_SVG = true;
      }
    } else {
      elm = document.createElement(type);
    }
    if (opts != null) {
      DOOM(elm, opts);
    }
    if (parent != null) {
      DOOM.append(parent, elm);
    }
    return elm;
  };
  DOOM.append = function(parent, child) {
    parent.appendChild(child);
    return child;
  };
  DOOM.prepend = function(parent, child) {
    if (parent.hasChildNodes()) {
      parent.insertBefore(child, parent.firstChild);
    } else {
      parent.appendChild(child);
    }
    return child;
  };
  DOOM.remove = function(parent, child) {
    if (child.parentNode === parent) {
      parent.removeChild(child);
    }
    return child;
  };
  DOOM.empty = function(elm) {
    return elm.innerHTML = "";
  };
  if (typeof this !== "undefined" && this !== null) {
    this.DOOM = DOOM;
  }
  if (typeof window !== "undefined" && window !== null) {
    window.DOOM = DOOM;
  }
  if (typeof Make !== "undefined" && Make !== null) {
    return Make("DOOM", DOOM);
  }
})();

// ---
// generated by coffee-script 1.9.2