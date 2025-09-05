import type { Snippet } from "svelte";

type VertConfig = { top: string, bottom?: undefined } | { bottom: string, top?: undefined };
type HorizontalConfig = { left: string, right?: undefined } | { right: string, left?: undefined }
type SizeConfig = {
    width: string
    height: string
}
type OptColorConfig = {
    color?: string
}

export type WindowDragConfig = VertConfig & HorizontalConfig & SizeConfig & OptColorConfig

/**
 * This class makes it possible to only use 1 mousemove listener and 1 mouseup listener for ALL of the windows.
 * This works by registering any mouse targets and whenever a mouse movement occurs, all registered closures are called with the current mouse target id sent to the closures.
 */
export class MouseContext {
    #activeMouseTarget = "";
    mouseMoveResponders: {[key: string]: (event: MouseEvent) => unknown} = {}
    activeMouseSubscribers: {[key: string]: (activeId: string) => unknown} = {}

    constructor() {
        this.#activeMouseTarget = "";
        this.mouseMoveResponders = {}
        this.activeMouseSubscribers = {}
    }

    subscribeActiveMouseSubscribers(callBack: (activeId: string) => unknown) {
        const randomId = crypto.randomUUID();
        this.activeMouseSubscribers[randomId] = callBack;

        return () => {
            delete this.activeMouseSubscribers[randomId];
        }
    }

    addMouseMoveResponder(id: string, callbackFunc: (event: MouseEvent) => unknown) {
        this.mouseMoveResponders[id] = callbackFunc;

        return () => {
            delete this.mouseMoveResponders[id];
        }
    }

    mouseMoving(event: MouseEvent) {
        if (this.#activeMouseTarget && this.#activeMouseTarget.length > 0) this.mouseMoveResponders[this.#activeMouseTarget](event);
    }

    mouseIsUp(_event: MouseEvent) {
        this.#activeMouseTarget = "";
        // if (this.#activeMouseTarget && this.#activeMouseTarget.length > 0) this.mouseUpResponders[this.#activeMouseTarget](event);
        for (const [_id, callback] of Object.entries(this.activeMouseSubscribers)) {
            callback("adawdawdklawdlawdmawldmawlkdmldm8321093289038i");
        }
    }

    setActiveMouseTarget(id: string) {
        this.#activeMouseTarget = id;
        for (const [_id, callback] of Object.entries(this.activeMouseSubscribers)) {
            callback(id);
        }
    }
}

/**
 * This class manages all the windows that are in the WindowManager component. It keeps track of the active windows, order of activeWindow history, and send data to anyone who subscribe to the active window subscribers.
 * This subscription makes it possible to see the current active window.
 */
export class WindowContext {
    activeWindow = "";
    orderOfActiveWindows: string[] = [];
    registeredWindows: {[key: string]: (windId: string, winStackOrder: string[]) => unknown} = {}
    // If anything thats not a window wants to know what the current active window is, they can subscript to activeWindowsSubscribers
    activeWindowSubscribers: {[key: string]: (windId: string, winStackOrder: string[]) => unknown} = {}

    constructor() {
        this.activeWindow = "";
        this.registeredWindows = {};
        this.activeWindowSubscribers = {};
    }

    setActiveWindow(winId: string) {
        if (this.orderOfActiveWindows.includes(winId)) {
            let newActiveWinOrder: string[] = [];
            for (let i=0;i<this.orderOfActiveWindows.length;i++) {
                if (this.orderOfActiveWindows[i] !== winId) {
                    newActiveWinOrder.push(this.orderOfActiveWindows[i]);
                }
            }
            newActiveWinOrder.push(winId);
            this.orderOfActiveWindows = newActiveWinOrder;
        } else {
            this.orderOfActiveWindows.push(winId);
        }

        this.activeWindow = winId;

        for (const [_id, activeWindowCallback] of Object.entries(this.registeredWindows)) {
            activeWindowCallback(winId, this.orderOfActiveWindows);
        }

        for (const [_id, callback] of Object.entries(this.activeWindowSubscribers)) {
            callback(winId, this.orderOfActiveWindows);
        }
    }

    deleteWindow(id: string) {
        delete this.registeredWindows[id];

        if (this.orderOfActiveWindows.includes(id)) {
            let newActiveWinOrder: string[] = [];
            for (let i=0;i<this.orderOfActiveWindows.length;i++) {
                if (this.orderOfActiveWindows[i] !== id) {
                    newActiveWinOrder.push(this.orderOfActiveWindows[i]);
                }
            }
            this.orderOfActiveWindows = newActiveWinOrder;
        }

        if (this.orderOfActiveWindows.length > 0) {
            this.activeWindow = this.orderOfActiveWindows[this.orderOfActiveWindows.length - 1]
            for (const [_id, activeWindowCallback] of Object.entries(this.registeredWindows)) {
                activeWindowCallback(this.activeWindow, this.orderOfActiveWindows);
            }
    
            for (const [_id, callback] of Object.entries(this.activeWindowSubscribers)) {
                callback(this.activeWindow, this.orderOfActiveWindows);
            }
        }
    }

    registerWindow(id:string, activeWindowCallback: (winId: string, winStackOrder: string[]) => unknown) {
        this.registeredWindows[id] = activeWindowCallback;
        this.setActiveWindow(id);

        return () => {
            this.deleteWindow(id);
        }
    }

    subscribeActiveWindow(callBack: (windId: string, winStackOrder: string[]) => unknown) {
        const randomId = crypto.randomUUID();
        this.activeWindowSubscribers[randomId] = callBack;
        callBack(this.activeWindow, this.orderOfActiveWindows);

        return () => {
            delete this.activeWindowSubscribers[randomId];
        }
    }

    get currentActiveWindow() {
        return this.activeWindow;
    }
}

export type ActualWindowProps = {
    /**
     * These are the places in a window that are drag targets. The user can drag a window with these targets.
     * If you dont set this, the window will not be draggable.
     * @example
     * ```ts
     * windowDragRegions: [
     *      {
     *          left: "10px",
     *          top: "0px",
     *          width: "calc(100% - 10px)",
     *          height: "100%",
     *          color: "red"
     *      },
     *      {
     *          right: "0",
     *          bottom: "0px",
     *          width: "100%",
     *          height: "10px"
     *      }
     * ]
     * ```
     * */
    windowDragRegions?: WindowDragConfig[],
    /**
     * The `<WindowManager />` component provides the context variable. To get the context you need to use a snippet.
     * @example
     * ```svelte
     *  <WindowManager>
     *       {#snippet children(context)}
     *           <Window id="win03" {context} />
     *       {/snippet}
     *   </WindowManager>
     * ```
     */
    context: {
        desktop?: HTMLElement
        mouseContext: MouseContext,
        windowContext: WindowContext,
    },
    /**
     * This makes it possible to resize the window. By default it's set to true. In order to disable the resize, set it to false.
     */
    resizable?: boolean,
    /**
     * You MUST use px to set the height. Any relative value like % or rem will not work. Only px. The default size is set to 300px.
     * 
     * You can also bind to the value to recieve the current state of it.
     * 
     * @default 300px
     * 
     * @example
     * ```ts
     * height: "10px" // Valid
     * 
     * height: "100%" // Not Valid
     * 
     * height: "calc(10px + 20px)" // Not Valid
     * ```
     */
    height?: string,
    /**
     * This minimum height that the window can be. By default the value is set to 300.
     * 
     * @default 300
     */
    minHeight?: number,
    /**
     * You MUST use px to set the width. Any relative value like % or rem will not work. Only px. The default size is set to 300px.
     * 
     * You can also bind to the value to recieve the current state of it.
     * 
     * @default 300px
     * 
     * @example
     * ```ts
     * width: "10px" // Valid
     * 
     * width: "100%" // Not Valid
     * 
     * width: "calc(10px + 20px)" // Not Valid
     * ```
     */
    width?: string,
    /**
     * This minimum width that the window can be. By default the value is set to 300.
     * 
     * @default 300
     */
    minWidth?: number,
    /**
     * This sets the x position of the window in relation to the window manager box, NOT the html window box.
     * You MUST use px to set the left value. Any relative value like % or rem will not work. Only px. The default size is set to 100px.
     * 
     * You can also bind to the value to recieve the current state of it.
     * 
     * @default 100px
     * 
     * @example
     * ```ts
     * left: "10px" // Valid
     * 
     * left: "100%" // Not Valid
     * 
     * left: "calc(10px + 20px)" // Not Valid
     * ```
     */
    left?: string,
    /**
     * This sets the y position of the window in relation to the window manager box, NOT the html window box.
     * You MUST use px to set the top value. Any relative value like % or rem will not work. Only px. The default size is set to 100px.
     * 
     * You can also bind to the value to recieve the current state of it.
     * 
     * @default 100px
     * 
     * @example
     * ```ts
     * top: "10px" // Valid
     * 
     * top: "100%" // Not Valid
     * 
     * top: "calc(10px + 20px)" // Not Valid
     * ```
     */
    top?: string,
    /**
     * Each window gets a unique id. If you register a new window with an id that already exists, the other window will not work anymore.
     */
    id: string,
    /**
     * This sets a frosty effect for the window background.
     * @default true
     * 
     * You can disable it for some performance gains.
     */
    blurWindowBackground?: boolean,
    /**
     * Whenever a window is not active, you can set a color to overlay on that window or no color at all. Transparent colors are valid.
     * 
     * @example
     * ```ts
     * inactiveColor: "red"
     * 
     * inactiveColor: "none",
     * 
     * inactiveColor: "#dfdfdfaa"
     * ```
     * 
     * @default #1a1a1aa1
     */
    inactiveColor?: string,
    children?: Snippet,
}