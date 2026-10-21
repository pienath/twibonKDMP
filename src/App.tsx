import { useState, useRef } from "react";
import "./App.css";
import TwibbonCanvas from "./components/twibbon-canvas";
import LandingPageSidebar from "./components/landing-page";
import AdjustPageSidebar from "./components/adjust-page";
import DownloadPageSidebar from "./components/download-page";

function App() {
	const [sidebarState, setSidebarState] = useState<"landing" | "adjust" | "ready">("landing");
	const [userPhoto, setUserPhoto] = useState<HTMLImageElement | null>(null);
	const [photoTransform, setPhotoTransform] = useState({ x: 0, y: 0, scale: 100, rotate: 0 });
	const canvasRef = useRef<HTMLCanvasElement>(null);

	function handlePhotoSelected(img: HTMLImageElement) {
		setUserPhoto(img);
		setSidebarState("adjust");
	}

	return (
		<main className="w-screen h-screen  flex justify-center items-center">
			<div className="h-fit mx-auto flex md:flex-row flex-col p-8 justify-center gap-10 items-center">
				<section className="md:w-96 w-72">
					<TwibbonCanvas userPhoto={userPhoto} frameSrc={"/twibbon.png"} transform={photoTransform} setTransform={setPhotoTransform} isEditMode={sidebarState == "adjust"} canvasRef={canvasRef} />
				</section>
				<section className="max-w-lg">
					{sidebarState == "landing" && <LandingPageSidebar onPhotoSelected={handlePhotoSelected} />}
					{sidebarState == "adjust" && <AdjustPageSidebar onPhotoSelected={handlePhotoSelected} transform={photoTransform} setTransform={setPhotoTransform} onGenerate={setSidebarState} />}
					{sidebarState == "ready" && <DownloadPageSidebar canvas={canvasRef} />}
				</section>
			</div>
		</main>
	);
}

export default App;
