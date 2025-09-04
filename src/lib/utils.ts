import type { Snippet } from "svelte";

type VertConfig = { top: string, bottom?: undefined } | { bottom: string, top?: undefined };
type HorizontalConfig = { left: string, right?: undefined } | { right: string, left?: undefined }
type SizeConfig = {
    width: string
    height: string
}

export type WindowDragConfig = VertConfig & HorizontalConfig & SizeConfig

export class MouseContext {
    #activeMouseTarget = "";
    mouseMoveResponders: {[key: string]: (event: MouseEvent) => unknown} = {}

    constructor() {
        this.#activeMouseTarget = "";
        this.mouseMoveResponders = {}
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
    }

    setActiveMouseTarget(id: string) {
        this.#activeMouseTarget = id;
    }
}

export class WindowContext {
    activeWindow = "";
    prevActiveWindow = "";
    registeredWindows: {[key: string]: (windId: string) => unknown} = {}
    activeWindowSubscribers: {[key: string]: (windId: string) => unknown} = {}

    constructor() {
        this.activeWindow = "";
        this.registeredWindows = {};
        this.prevActiveWindow = "";
        this.activeWindowSubscribers = {};
    }

    setActiveWindow(winId: string) {
        this.prevActiveWindow = this.activeWindow;
        this.activeWindow = winId;

        for (const [_id, activeWindowCallback] of Object.entries(this.registeredWindows)) {
            activeWindowCallback(winId);
        }

        for (const [_id, callback] of Object.entries(this.activeWindowSubscribers)) {
            callback(winId);
        }
    }

    registerWindow(id:string, activeWindowCallback: (winId: string) => unknown) {
        this.registeredWindows[id] = activeWindowCallback;
        this.setActiveWindow(id);

        return () => {
            delete this.registeredWindows[id];
            if (this.activeWindow === id && this.prevActiveWindow.length !== 0) {
                this.setActiveWindow(this.prevActiveWindow);
            }
        }
    }

    subscribeActiveWindow(callBack: (windId: string) => unknown) {
        const randomId = crypto.randomUUID();
        this.activeWindowSubscribers[randomId] = callBack;
        callBack(this.activeWindow);

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
    mouseContext: MouseContext,
    windowContext: WindowContext,
    resizable?: boolean,
    height?: string,
    minHeight?: number,
    width?: string,
    minWidth?: number,
    left?: string,
    top?: string,
    icon?: string,
    name?: string,
    id: string,
    blurWindowBackground?: boolean;
    close: () => unknown,
    children?: Snippet,
    desktop?: HTMLElement
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