export const tags = {
    'Basic HTML': {
        '!DOCTYPE': `Defines the document type`,
        'html': `Defines an HTML document`,
        'head': `Contains metadata/information for the document`,
        'title': `Defines a title for the document`,
        'body': `Defines the document's body`,
        'h1': `Defines HTML headings`,
        'h2': `Defines HTML headings`,
        'h3': `Defines HTML headings`,
        'h4': `Defines HTML headings`,
        'h5': `Defines HTML headings`,
        'h6': `Defines HTML headings`,
        'p': `Defines a paragraph`,
        'br': `Inserts a single line break`,
        'hr': `Defines a thematic change in the content`
    },
    'Formatting': {
        // 'acronym', //Not supported in HTML5. Use <abbr> instead. Defines an acronym
        'abbr': `Defines an abbreviation or an acronym`,
        'address': `Defines contact information for the author / owner of a document / article`,
        'b': `Defines bold text`,
        'bdi': `Isolates a part of text that might be formatted in a different direction from other text outside it`,
        'bdo': `Overrides the current text direction`,
        // 'big', //Not supported in HTML5. Use CSS instead. Defines big text
        'blockquote': `Defines a section that is quoted from another source`,
        // 'center', //Not supported in HTML5. Use CSS instead. Defines centered text
        'cite': `Defines the title of a work`,
        'code': `Defines a piece of computer code`,
        'del': `Defines text that has been deleted from a document`,
        'dfn': `Specifies a term that is going to be defined within the content`,
        'em': `Defines emphasized text `,
        // 'font', //Not supported in HTML5. Use CSS instead. Defines font, color, and size for text
        'i': `Defines a part of text in an alternate voice or mood`,
        'ins': `Defines a text that has been inserted into a document`,
        'kbd': `Defines keyboard input`,
        'mark': `Defines marked / highlighted text`,
        'meter': `Defines a scalar measurement within a known range(a gauge)`,
        'pre': `Defines preformatted text`,
        'progress': `Represents the progress of a task`,
        'q': `Defines a short quotation`,
        'rp': `Defines what to show in browsers that do not support ruby annotations`,
        'rt': `Defines an explanation / pronunciation of characters(for East Asian typography)`,
        'ruby': `Defines a ruby annotation(for East Asian typography)`,
        's': `Defines text that is no longer correct`,
        'samp': `Defines sample output from a computer program`,
        'small': `Defines smaller text`,
        // 'strike', //Not supported in HTML5. Use <del> or <s> instead. Defines strikethrough text
        'strong': `Defines important text`,
        'sub': `Defines subscripted text`,
        'sup': `Defines superscripted text`,
        'template': `Defines a container for content that should be hidden when the page loads`,
        'time': `Defines a specific time(or datetime)`,
        // 'tt', //Not supported in HTML5. Use CSS instead. Defines teletype text
        'u': `Defines some text that is unarticulated and styled differently from normal text`,
        'var': `Defines a variable`,
        'wbr': `Defines a possible line -break`
    },
    'Forms and Input': {
        'form': `Defines an HTML form for user input`,
        'input': `Defines an input control`,
        'textarea': `Defines a multiline input control(text area)`,
        'button': `Defines a clickable button`,
        'select': `Defines a drop - down list`,
        'optgroup': `Defines a group of related options in a drop - down list`,
        'option': `Defines an option in a drop - down list`,
        'label': `Defines a label for an < input > element`,
        'fieldset': `Groups related elements in a form`,
        'legend': `Defines a caption for a < fieldset > element`,
        'datalist': `Specifies a list of pre - defined options for input controls`,
        'output': `Defines the result of a calculation`
    },
    'Frames': {
        // 'frame', //Not supported in HTML5. Defines a window (a frame) in a frameset
        // 'frameset', //Not supported in HTML5. Defines a set of frames
        // 'noframes', //Not supported in HTML5. Defines an alternate content for users that do not support frames
        'iframe': `Defines an inline frame`,
        //// Images
        'img': `Defines an image`,
        'map': `Defines a client - side image map`,
        'area': `Defines an area inside an image map`,
        'canvas': `Used to draw graphics, on the fly, via scripting(usually JavaScript)`,
        'figcaption': `Defines a caption for a < figure > element`,
        'figure': `Specifies self - contained content`,
        'picture': `Defines a container for multiple image resources`,
        'svg': `Defines a container for SVG graphics`
    },

    'Audio / Video': {
        'audio': `Defines sound content`,
        'source': `Defines multiple media resources for media elements(<video>, <audio> and <picture>)`,
        'track': `Defines text tracks for media elements (<video> and <audio>)`,
        'video': `Defines a video or movie`
    },

    'Links': {
        'a': `Defines a hyperlink`,
        'link': `Defines the relationship between a document and an external resource (most used to link to style sheets)`,
        'nav': `Defines navigation links`
    },

    'Lists': {
        'ul': `Defines an unordered list`,
        'ol': `Defines an ordered list`,
        'li': `Defines a list item`,
        // 'dir', //Not supported in HTML5. Use <ul> instead. Defines a directory list
        'dl': `Defines a description list`,
        'dt': `Defines a term/name in a description list`,
        'dd': `Defines a description of a term/name in a description list`
    },

    'Tables': {
        'table': `Defines a table`,
        'caption': `Defines a table caption`,
        'th': `Defines a header cell in a table`,
        'tr': `Defines a row in a table`,
        'td': `Defines a cell in a table`,
        'thead': `Groups the header content in a table`,
        'tbody': `Groups the body content in a table`,
        'tfoot': `Groups the footer content in a table`,
        'col': `Specifies column properties for each column within a <colgroup> element`,
        'colgroup': `Specifies a group of one or more columns in a table for formatting`
    },

    'Styles and Semantics': {
        'style': `Defines style information for a document`,
        'div': `Defines a section in a document`,
        'span': `Defines a section in a document`,
        'header': `Defines a header for a document or section`,
        'footer': `Defines a footer for a document or section`,
        'main': `Specifies the main content of a document`,
        'section': `Defines a section in a document`,
        'article': `Defines an article`,
        'aside': `Defines content aside from the page content`,
        'details': `Defines additional details that the user can view or hide`,
        'dialog': `Defines a dialog box or window`,
        'summary': `Defines a visible heading for a <details> element`,
        'data': `Adds a machine-readable translation of a given content`
    },

    'Meta Info': {
        'head': `Defines information about the document`,
        'meta': `Defines metadata about an HTML document`,
        'base': `Specifies the base URL/target for all relative URLs in a document`,
        // 'basefont', //Not supported in HTML5. Use CSS instead. Specifies a default color, size, and font for all text in a document
    },
    'Programming': {
        'script': `Defines a client-side script`,
        'noscript': `Defines an alternate content for users that do not support client-side scripts`,
        // 'applet', //Not supported in HTML5. Use <embed> or <object> instead. Defines an embedded applet
        'embed': `Defines a container for an external (non-HTML) application`,
        'object': `Defines an embedded object`,
        'param': `Defines a parameter for an object`
    },
}

export const events = {
    'Element': {
        'cancel': `Fires on a <dialog> when the user instructs the browser that they wish to dismiss the current open dialog. For example, the browser might fire this event when the user presses the Esc key or clicks a "Close dialog" button which is part of the browser's UI. Also available via the oncancel property.`,
        'error': `Fired when a resource failed to load, or can't be used. For example, if a script has an execution error or an image can't be found or is invalid. Also available via the onerror property.`,
        'scroll': `Fired when the document view or an element has been scrolled. Also available via the onscroll property.`,
        'select': `Fired when some text has been selected. Also available via the onselect property.`,
        'show': `Fired when a contextmenu event was fired on/bubbled to an element that has a contextmenu attribute.  Also available via the onshow property.`,
        'wheel': `Fired when the user rotates a wheel button on a pointing device (typically a mouse). Also available via the onwheel property.`,
        'securitypolicyviolation': `Fired when a Content Security Policy is violated. Also available via the global onsecuritypolicyviolation property, which available on elements and the Document and Window objects.`
    },
    'Clipboard events': {
        'copy': `Fired when the user initiates a copy action through the browser's user interface. Also available via the oncopy property.`,
        'cut': `Fired when the user initiates a cut action through the browser's user interface. Also available via the oncut property.`,
        'paste': `Fired when the user initiates a paste action through the browser's user interface. Also available via the onpaste property.`,
    },
    'Composition events': {
        'compositionend': `Fired when a text composition system such as an input method editor completes or cancels the current composition session.`,
        'compositionstart': `Fired when a text composition system such as an input method editor starts a new composition session.`,
        'compositionupdate': `Fired when a new character is received in the context of a text composition session controlled by a text composition system such as an input method editor.`,
    },
    'Focus events': {
        'blur': `Fired when an element has lost focus. Also available via the onblur property.`,
        'focus': `Fired when an element has gained focus. Also available via the onfocus property`,
        'focusin': `Fired when an element is about to gain focus.`,
        'focusout': `Fired when an element is about to lose focus.`,
    },
    'Fullscreen events': {
        'fullscreenchange': `Sent to an Element when it transitions into or out of full-screen mode. Also available via the onfullscreenchange property.`,
        'fullscreenerror': `Sent to an Element if an error occurs while attempting to switch it into or out of full-screen mode. Also available via the onfullscreenerror property.`,
    },
    'Keyboard events': {
        'keydown': `Fired when a key is pressed. Also available via the onkeydown property.`,
        'keypress': `Fired when a key that produces a character value is pressed down.  Also available via the onkeypress property.`,
        'keyup': `Fired when a key is released. Also available via the onkeyup property.`,
    },
    'Mouse events': {
        'auxclick': `Fired when a non-primary pointing device button (e.g., any mouse button other than the left button) has been pressed and released on an element. Also available via the onauxclick property.`,
        'click': `Fired when a pointing device button (e.g., a mouse's primary button) is pressed and released on a single element. Also available via the onclick property.`,
        'contextmenu': `Fired when the user attempts to open a context menu. Also available via the oncontextmenu property.`,
        'dblclick': `Fired when a pointing device button (e.g., a mouse's primary button) is clicked twice on a single element. Also available via the ondblclick property.`,
        'DOMActivate ': `Occurs when an element is activated, for instance, through a mouse click or a keypress.`,
        'mousedown': `Fired when a pointing device button is pressed on an element. Also available via the onmousedown property.`,
        'mouseenter': `Fired when a pointing device (usually a mouse) is moved over the element that has the listener attached. Also available via the onmouseenter property.`,
        'mouseleave': `Fired when the pointer of a pointing device (usually a mouse) is moved out of an element that has the listener attached to it. Also available via the onmouseleave property.`,
        'mousemove': `Fired when a pointing device (usually a mouse) is moved while over an element. Also available via the onmousemove property.`,
        'mouseout': `Fired when a pointing device (usually a mouse) is moved off the element to which the listener is attached or off one of its children. Also available via the onmouseout property.`,
        'mouseover': `Fired when a pointing device is moved onto the element to which the listener is attached or onto one of its children. Also available via the onmouseover property.`,
        'mouseup': `Fired when a pointing device button is released on an element. Also available via the onmouseup property.`,
        'webkitmouseforcechanged': `Fired each time the amount of pressure changes on the trackpadtouchscreen.`,
        'webkitmouseforcedown': `Fired after the mousedown event as soon as sufficient pressure has been applied to qualify as a "force click".`,
        'webkitmouseforcewillbegin': `Fired before the mousedown event.`,
        'webkitmouseforceup': `Fired after the webkitmouseforcedown event as soon as the pressure has been reduced sufficiently to end the "force click".`,
    },
    'Touch events': {
        'touchcancel': `Fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created). Also available via the ontouchcancel property.`,
        'touchend': `Fired when one or more touch points are removed from the touch surface. Also available via the ontouchend property`,
        'touchmove': `Fired when one or more touch points are moved along the touch surface. Also available via the ontouchmove property`,
        'touchstart': `Fired when one or more touch points are placed on the touch surface. Also available via the ontouchstart property`,
    }
}

export default tags