import { describe, expect, it, vi } from "vitest";
import { INACTIVE_MOUSE_ID, MouseContext, WindowContext } from "../../lib/utils.js";

describe("MouseContext", () => {
	it("notifies active subscribers and broadcasts inactive sentinel on mouse up", () => {
		const context = new MouseContext();
		const activeSpy = vi.fn();
		context.subscribeActiveMouseSubscribers(activeSpy);

		context.setActiveMouseTarget("windowDraggeralpha0");
		context.mouseIsUp();

		expect(activeSpy).toHaveBeenNthCalledWith(1, "windowDraggeralpha0");
		expect(activeSpy).toHaveBeenLastCalledWith(INACTIVE_MOUSE_ID);
	});

	it("dispatches mouse movement to the active responder", () => {
		const context = new MouseContext();
		const moveSpy = vi.fn();
		context.addMouseMoveResponder("windowDraggeralpha0", moveSpy);
		context.setActiveMouseTarget("windowDraggeralpha0");

		context.mouseMoving({ clientX: 240, clientY: 360 } as MouseEvent);

		expect(moveSpy).toHaveBeenCalledTimes(1);
		expect(moveSpy).toHaveBeenCalledWith(expect.objectContaining({ clientX: 240, clientY: 360 }));
	});

	it("dispatches touch movement and prevents scroll while dragging", () => {
		const context = new MouseContext();
		const moveSpy = vi.fn();
		const preventDefault = vi.fn();
		context.addMouseMoveResponder("windowresizealphaRight", moveSpy);
		context.setActiveMouseTarget("windowresizealphaRight");

		context.touchMoving({
			touches: [{ clientX: 123, clientY: 456 }],
			preventDefault
		} as unknown as TouchEvent);

		expect(preventDefault).toHaveBeenCalledTimes(1);
		expect(moveSpy).toHaveBeenCalledWith({ clientX: 123, clientY: 456 });
	});
});

describe("WindowContext", () => {
	it("registers windows and keeps active stack order", () => {
		const context = new WindowContext();
		const windowA = vi.fn();
		const windowB = vi.fn();

		const unregisterA = context.registerWindow("window-a", windowA);
		context.registerWindow("window-b", windowB);

		expect(context.currentActiveWindow).toBe("window-b");
		expect(context.orderOfActiveWindows).toEqual(["window-a", "window-b"]);

		context.setActiveWindow("window-a");

		expect(context.currentActiveWindow).toBe("window-a");
		expect(context.orderOfActiveWindows).toEqual(["window-b", "window-a"]);

		unregisterA();
		expect(context.currentActiveWindow).toBe("window-b");
		expect(context.orderOfActiveWindows).toEqual(["window-b"]);
	});

	it("removes iframe listeners from the correct map", () => {
		const context = new WindowContext();
		const activeSpy = vi.fn();
		context.subscribeActiveWindow(activeSpy);
		activeSpy.mockClear();

		const iframeSpy = vi.fn();
		const unsubscribeIframe = context.iframeWindowClickedSubscribe(iframeSpy);
		unsubscribeIframe();

		context.setActiveWindow("window-a", true);

		expect(iframeSpy).not.toHaveBeenCalled();
		expect(activeSpy).toHaveBeenCalledTimes(1);
	});
});
