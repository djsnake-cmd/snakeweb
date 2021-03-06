import React, { useState, useEffect } from "react"
import styled from "styled-components"
import sanityClient from "../../Client"
import imageUrlBuilder from "@sanity/image-url"


const Header = () => {
  const [header, setHeader] = useState("")

  useEffect(() => {
    const headerQuery = `*[_type == "header"]{
			heroImage, title, tagline
		}`
    sanityClient.fetch(headerQuery).then((header) => {
      header.forEach((header) => {
        setHeader(header)
      })
    })

    return
  }, [])

  return (
    <Container>
      <ColumnLeft>
          <HeroImage
            alt="hero image"
            className="heroimage"
            id="heroimage"
            src={urlFor(header.heroImage).url()}
            />
          <HeaderText>{header.title}</HeaderText>
          <HeaderTagline>{header.tagline}</HeaderTagline>
      </ColumnLeft>
	  <RightContainer>
	</RightContainer>
    </Container>
  )
}

export default Header

const Container = styled.div`
	padding-top: 10rem;
	height: auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`


const ColumnLeft = styled.div`
	display: flex;
	color: #fff;
	width: 40%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 5rem 2rem;

	@media screen and (min-width: 1000px) {
		padding-left: 110px;
	}
`


const RightContainer = styled.div`
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	padding: 5rem 2rem;
`

const HeaderText = styled.p`
color: white;
font-size: 2rem;
text-align: left;

`
const HeaderTagline = styled.h1`
  color: white;
	font-size: 4rem;
	text-align: left;
	margin: 2rem 0;
  line-height: 1.1;

	@media screen and (max-width: 1000px) {
		font-size: 22px;

	}
	@media screen and (max-width: 700px) {
	}
	@media screen and (max-width: 500px) {
		font-size: 18px;
		width: 301px;
	}
	@media screen and (max-width: 400px) {
		font-size: 14px;
		width: 150px;
	}
`

const HeroImage = styled.img`
	position: absolute;
	width: auto;
	height: 90%;
	right: 0;
	top: 0;
	z-index: -1;

	@media screen and (min-width: 1500px) {
		height: 100%;
	}
`

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}
