import classNames from 'classnames';
import Image from 'next/image';

import { tektur } from '@/components/global/fonts';

import LabPhoto from '../../public/lab-photo.png';
import LabPhotoShapeImage from '../../public/lab-photo-shapeimage.png';

export default function Home() {
	return (
		<main className="flex flex-col w-full items-center justify-center gap-4 max-sm:pt-18 max-sm:pb-4">
			<div className="w-full flex items-center gap-4 max-sm:flex-col">
				<div className="w-full flex flex-col items-center rounded-md shadow-sm bg-white py-12 gap-4 max-sm:gap-2">
					<h1 className={classNames('text-5xl font-bold max-sm:text-3xl', tektur.className)}>Huang Laboratory</h1>
					<h2 className="max-sm:text-xs">the University of Hong Kong</h2>
				</div>
				<Image className="w-[230px] rounded-md shadow-sm max-sm:w-full" src={LabPhoto} alt="lab-photo" />
			</div>
			<div className="w-full flex items-center gap-4 max-sm:flex-col-reverse">
				<Image className="w-[435px] rounded-md shadow-sm max-sm:w-full" src={LabPhotoShapeImage} alt="lab-photo" />
				<div className="h-56 w-full flex flex-col justify-center items-center rounded-md shadow-sm bg-white px-12 gap-4 max-sm:h-full max-sm:py-8 max-sm:px-8">
					<p className="indent-8">
						The Huang Laboratory locates on the beautiful campus of the University of Hong Kong, overlooking the East
						Lamma Channel and the Lamma Island. There are two research areas in the Huang Lab. (1) We study the
						functions of kinesins, which are transport proteins running on microtubule tracks as “trains” or “cars” in
						side cells. The focus is on their roles during development and diseases in different cell types. (2) We
						design and fabricate artificial biological parts, devices and circuits to control biological pattern
						formation, stem cell self-renewal/differentiation, and to attack tumors.
					</p>
				</div>
			</div>
		</main>
	);
}
