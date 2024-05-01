import styled from "styled-components"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import pic from "../assets/pic.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";


import { useState } from "react";


const Container = styled.div`
width:100%;
height:100vh;
display:flex;
position:relative;
overflow: hidden;

`;

const Arrow = styled.div`
width:50px;
height:50px;
background-color:#fff7f7;
border-radius: 50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:0;
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};
margin:auto;
cursor:pointer;
opacity:0.5;
z-index:2;


`;

const Wrapper = styled.div`
height:100%;
display:flex;
transition: all 0.5s ease;
transform:translateX(${props => props.slideIndex * -100}vw);

`;

const Slide = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
background-color:#${props => props.bg}

`

const ImgContainer = styled.div`
height:100%;
flex:1;

`
const Image = styled.img`
height:90vh;

`
const InfoContainer = styled.div`
flex:1;
padding:50px;
`

const Title = styled.h1`
font-size:100px
`;
const Desc = styled.p`
margin:50px 0px;
font-size:34px;
font-weight:500;
letter-spacing: 3px

`;
const Button = styled.button`
padding:20px;
font-size:20px;
background-color:transparent;
cursor:pointer;
`;
function Slider() {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }
        else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }

    }
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                <Slide bg={"f5fafd"}>
                    <ImgContainer>
                        <Image src={pic} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>SUMMER SALE</Title>
                        <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>
                <Slide bg={"fcf1ed"}>
                    <ImgContainer>
                        <Image src={pic2} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>AUTUMN COLLECTION</Title>
                        <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>
                <Slide bg={"fbf0f4"}>
                    <ImgContainer>
                        <Image src={pic3} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>LOUNGEWEAR LOVE</Title>
                        <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                        <Button>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightIcon />
            </Arrow>
        </Container>
    )
}

export default Slider