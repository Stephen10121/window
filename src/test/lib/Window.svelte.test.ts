import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it } from "vitest";
import Window from "../../lib/Window.svelte";
import { MouseContext, WindowContext } from "../../lib/utils.js";

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

function createContext() {
	const desktop = document.createElement("div");
	Object.defineProperty(desktop, "getBoundingClientRect", {
		value: () => createRect(0, 0, 900, 700)
	});

	return {
		mouseContext: new MouseContext(),
		windowContext: new WindowContext(),
		desktop
	};
}

describe("Window.svelte", () => {
	it("renders configured drag regions", async () => {
		const context = createContext();
		const { container } = render(Window, {
			props: {
				id: "win",
				context,
				windowDragRegions: [{ width: "100%", height: "40px", top: "0px", left: "0px" }]
			}
		});

		await tick();
		expect(container.querySelector("#windowDraggerwin0")).toBeInTheDocument();
	});

	it("hides resize handles when resizable is false", async () => {
		const context = createContext();
		const { container } = render(Window, {
			props: {
				id: "readonly",
				context,
				windowDragRegions: [{ width: "100%", height: "40px", top: "0px", left: "0px" }],
				resizable: false
			}
		});

		await tick();
		expect(container.querySelector("#windowresizereadonlytop")).not.toBeInTheDocument();
		expect(container.querySelector("#windowresizereadonlybottomRight")).not.toBeInTheDocument();
	});

	it("renders both edge and corner handles when resizable", async () => {
		const context = createContext();
		const { container } = render(Window, {
			props: {
				id: "full",
				context,
				windowDragRegions: [{ width: "100%", height: "40px", top: "0px", left: "0px" }],
				resizable: true
			}
		});

		await tick();
		expect(container.querySelector("#windowresizefulltop")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefullright")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefullbottom")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefullleft")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefulltopLeft")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefulltopRight")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefullbottomLeft")).toBeInTheDocument();
		expect(container.querySelector("#windowresizefullbottomRight")).toBeInTheDocument();
	});
});
