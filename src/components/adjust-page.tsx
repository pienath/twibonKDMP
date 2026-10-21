import { Camera, CircleArrowRight } from "lucide-react";

type TransformType = {
	x: number;
	y: number;
	scale: number;
	rotate: number;
};

type AdjustPageProps = {
	transform: TransformType;
	setTransform: React.Dispatch<React.SetStateAction<TransformType>>;
	onPhotoSelected: (img: HTMLImageElement) => void;
	onGenerate: React.Dispatch<React.SetStateAction<"landing" | "adjust" | "ready">>;
};

export default function AdjustPageSidebar({ transform, setTransform, onPhotoSelected, onGenerate }: AdjustPageProps) {
	function handleChangePhoto(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const img = new Image();
		img.onload = () => onPhotoSelected(img);
		img.src = URL.createObjectURL(file);
	}

	return (
		<section className="h-[24em] p-5 w-full flex flex-col gap-3 justify-between ">
			<article>
				<h1 className="lg:text-4xl text-2xl font-semibold mb-5">Adjust your photo</h1>
			</article>
			<ul>
				<li className="outline outline-gray-600/50 my-3 rounded-md text-center shadow-xl p-5 w-full">
					<label htmlFor="scale" className="font-semibold">
						Scale ({transform.scale} %)
					</label>
					<br />
					<input type="range" className="w-full accent-purple-800" value={transform.scale} onChange={(e) => setTransform((t) => ({ ...t, scale: +e.target.value }))} min={0} max={200} id="scale" name="scale" />
				</li>
				<li className="outline outline-gray-600/50 my-3 rounded-md text-center shadow-xl p-5 w-full">
					<label htmlFor="rotate" className="font-semibold">
						Rotate ({transform.rotate} deg)
					</label>
					<br />
					<input type="range" className="w-full accent-purple-800" value={transform.rotate} min={-180} max={180} onChange={(e) => setTransform((t) => ({ ...t, rotate: +e.target.value }))} id="rotate" name="rotate" />
				</li>
			</ul>
			<div className="w-full   *:grow flex gap-2 font-semibold">
				<div className="*:cursor-pointer border-purple-700 border p-3 relative text-purple-900 rounded-xl w-fit">
					<input onChange={handleChangePhoto} type="file" className="absolute inset-0 z-10 opacity-0" />
					<h3 className="flex justify-center items-center gap-3">
						<Camera />
						Change photo
					</h3>
				</div>
				<div className="*:cursor-pointer bg-purple-700 p-3 relative text-white rounded-xl w-fit">
					<button onClick={() => onGenerate("ready")} className="absolute inset-0 z-10 opacity-0" />
					<h3 className="flex justify-center items-center gap-3">
						<CircleArrowRight />
						Next
					</h3>
				</div>
			</div>
		</section>
	);
}
