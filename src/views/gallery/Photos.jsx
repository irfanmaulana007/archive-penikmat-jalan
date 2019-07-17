import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'


class Photos extends Component {
	constructor(props) {
		super(props)
	 
		this.state = {
			photoIndex: 0,
			isOpen: false
		}
	}

	render () {
		const images = [
		  "https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg",
		  "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1528834415%2Fprivate-island-coco-lead-PRIVATEISLES0518.jpg%3Fitok%3DJRYUp03c&q=85",
		  "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1485369555/belize-island-EBAY117.jpg?itok=dCTwDFRW"
		];

    	const { photoIndex, isOpen } = this.state
		return (
			<div>
				<div className="row">
					<div className="col-2 mb-2 pl-1 pr-1" onClick={() => this.setState({ isOpen: true, photoIndex: 0 })}>
						<img src="https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg" alt="" className="img-thumbnail img-hover" width="100%" />
					</div>					
					<div className="col-2 mb-2 pl-1 pr-1" onClick={() => this.setState({ isOpen: true, photoIndex: 1 })}>
						<img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1528834415%2Fprivate-island-coco-lead-PRIVATEISLES0518.jpg%3Fitok%3DJRYUp03c&q=85" alt="" className="img-thumbnail img-hover" width="100%" />
					</div>
					<div className="col-2 mb-2 pl-1 pr-1" onClick={() => this.setState({ isOpen: true, photoIndex: 2 })}>
						<img src="https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1485369555/belize-island-EBAY117.jpg?itok=dCTwDFRW" alt="" className="img-thumbnail img-hover" width="100%" />
					</div>
					
				</div>

				{isOpen && (
					<Lightbox
		            	mainSrc={images[photoIndex]}
		            	nextSrc={images[(photoIndex + 1) % images.length]}
		            	prevSrc={images[(photoIndex + images.length - 1) % images.length]}
		            	nextSrcThumbnail={images[(photoIndex + 1) % images.length]}
		            	prevSrcThumbnail={images[(photoIndex + images.length - 1) % images.length]}
		            	onCloseRequest={() => this.setState({ isOpen: false })}
		            	imagePadding={50}
		            	onMovePrevRequest={() =>
		            		this.setState({
		            			photoIndex: (photoIndex + images.length - 1) % images.length,
		            		})
		            	}
		            	onMoveNextRequest={() =>
		            		this.setState({
		            			photoIndex: (photoIndex + 1) % images.length,
		            		})
	            		}
		        	/>
		        )}
			</div>
		)
	}
}

export default Photos;