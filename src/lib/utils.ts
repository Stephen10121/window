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
    windowDragConfigs?: WindowDragConfig[],
    context: {
        desktop?: HTMLElement
        mouseContext: MouseContext,
        windowContext: WindowContext,
    },
    resizable?: boolean,
    height?: string,
    minHeight?: number,
    width?: string,
    minWidth?: number,
    left?: string,
    top?: string,
    id: string,
    blurWindowBackground?: boolean,
    inactiveColor?: string,
    children?: Snippet,
}

export const defaultWindowValues = {
    windowDragConfigs: [],
    resizable: true,
    height: "300px",
    minHeight: 300,
    width: "300px",
    minWidth: 300,
    left: "100px",
    top: "100px",
    icon: "defaulticon.svg",
    name: "Application",
    blurWindowBackground: true,
    close: () => {},
}