import styled from "styled-components"
import { mobile } from "../Responsive"

const Container = styled.div`
width:100vw;
height:100vh;
background: url("https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
`

const Wrapper = styled.div`
width:40%;
padding:20px;
background-color:white;
${mobile({width:"75%"})}
`

const Form = styled.form`
display:flex;
flex-wrap: wrap;
`

const Title = styled.h1`
font-size:24px;
font-weight:300;
`

const Input = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
`

const Agreement = styled.span`
font-size:12px;
margin: 20px 0px;
`



const Button = styled.button`
width: 40%;
border:none;
padding:15px 20px;
background-color: teal;
color: white;
cursor : pointer;
`




function Register() {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE YOUR ACCOUNT</Title>
                <Form>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Username" />
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Input placeholder="Confirm Password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>Create Your Account</Button>
                </Form>
            </Wrapper>
        </Container>

    )
}

export default Register