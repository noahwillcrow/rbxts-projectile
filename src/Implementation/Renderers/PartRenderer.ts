import { IRenderer } from "../../Interfaces/IRenderer";
import { Workspace } from "@rbxts/services";

/**
 * Renders a mesh object as a projectile renderer
 */
export class PartRenderer implements IRenderer {
	public physicsIgnore: ReadonlyArray<Instance>;

	private templatePart: BasePart;
	private offsetCFrame: CFrame;

	/**
	 * Creates a new MeshRenderer with a clone of the given `MeshPart`
	 * @param templatePart The base mesh part to clone
	 * @param offsetCFrame The offset CFrame to apply every frame - applied as following: `new CFrame(position, position.add(directionUnit)).mul(offsetCFrame)`
	 */
	public constructor(templatePart: BasePart, offsetCFrame?: CFrame) {
		this.templatePart = templatePart.Clone();
		this.templatePart.Anchored = true;
		this.templatePart.CanCollide = false;
		this.templatePart.Massless = true;
		this.templatePart.Parent = Workspace;

		this.offsetCFrame = offsetCFrame || new CFrame();

		this.physicsIgnore = [this.templatePart];
	}

	public destroy() {
		this.templatePart.Destroy();
	}

	public render(position: Vector3, directionUnit: Vector3) {
		const baseCFrame = new CFrame(position, position.add(directionUnit));
		this.templatePart.CFrame = baseCFrame.mul(this.offsetCFrame);
	}
}