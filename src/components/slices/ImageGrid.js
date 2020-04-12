import React, { Fragment } from 'react'
import { RichText } from 'prismic-reactjs'
import Img from "gatsby-image"

// Function to determine the image type
const ImageGrid = function(slice) {
	return (
		<div className="image-grid">
			{slice.fields.map(image => (
				<div className="image-block">
					{image.grid_imageSharp ? (
						<Img fluid={image.grid_imageSharp.childImageSharp.fluid} alt={ image.grid_image.alt } />
					) : (
						<img src={ image.grid_image.url } alt={ image.grid_image.alt } />
					)}
					{ image.grid_image_title && RichText.asText(image.grid_image_title) !== "" ? (
						<div className="image-block__caption">
							{ RichText.asText(image.grid_image_title) }
						</div>
					) : null }
				</div>
			))}
		</div>
	)
}

export default ({ slice }) => {
  return (
		<Fragment>
			{ ImageGrid(slice) }
		</Fragment>
	);
}
