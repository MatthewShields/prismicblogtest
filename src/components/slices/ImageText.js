import React, { Fragment } from 'react'
import { RichText } from 'prismic-reactjs'
import Img from "gatsby-image"

// Function to determine the image type
const ImageText = function(slice) {
	return (
		<div className="image-and-text">
			{slice.primary.imageSharp ? (
				<Img fluid={slice.primary.imageSharp.childImageSharp.fluid} />
			) : (
				<img src={ slice.primary.image.url } alt={ slice.primary.image.alt } />
			)}
			{ slice.primary.text && RichText.asText(slice.primary.text) !== "" ? (
				<div className="image-and-text__text">
					{ RichText.asText(slice.primary.text) }
				</div>
			) : null }
		</div>
	)
}

export default ({ slice }) => {
  return (
		<Fragment>
			{ ImageText(slice) }
		</Fragment>
	);
}
