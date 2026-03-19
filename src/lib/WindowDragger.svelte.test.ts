import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import WindowDraggerHarness from "./test-harnesses/WindowDraggerHarness.svelte";
import { MouseContext } from "./utils.js";

function createRect(left: number, top: number, width: number, height: number): DOMRect {
	return {
		x: left,
		y: top,
		left,
		top,
		width,
		height,
		right: left + width,
		bottom: top + height,
		toJSON: () => ({})
	} as DOMRect;
}

describe("WindowDragger.svelte", () => {
	it("sets active dragger id on mousedown and updates bound coordinates on move", async () => {
		const mouseContext = new MouseContext();
		const activeSpy = vi.fn();
		mouseContext.subscribeActiveMouseSubscribers(activeSpy);

		const parentWindow = document.createElement("div");
		const desktop = document.createElement("div");

		Object.defineProperty(parentWindow, "getBoundingClientRect", {
			value: () => createRect(100, 100, 200, 150)
		});
		Object.defineProperty(desktop, "getBoundingClientRect", {
			value: () => createRect(0, 0, 800, 600)
		});

		const dragConfig = { width: "100%", height: "40px", top: "0px", left: "0px" } as const;

		const { container } = render(WindowDraggerHarness, {
			props: { mouseContext, parentWindow, desktop, dragConfig }
		});

		const dragger = container.querySelector("#dragger-test");
		expect(dragger).toBeInTheDocument();

		await fireEvent.mouseDown(dragger!, { clientX: 150, clientY: 140 });
		expect(activeSpy).toHaveBeenLastCalledWith("dragger-test");

		mouseContext.mouseMoving({ clientX: 300, clientY: 260 } as MouseEvent);
		await tick();

		expect(screen.getByTestId("coords")).toHaveTextContent("220px,250px");
	});
});
