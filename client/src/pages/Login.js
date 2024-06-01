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
width:25%;
padding:20px;
background-color:white;
${mobile({width:"75%"})}


`

const Form = styled.form`
display:flex;
flex-direction:column;


`

const Title = styled.h1`
font-size:24px;
font-weight:300;

`

const Input = styled.input`
flex:1;
min-width:40%;
margin:10px 0px;
padding:10px;




`

const Link = styled.a`
margin: 5px 0px;
font-size:12px;
text-decoration: underline;
cursor: pointer;



`





const Button = styled.button`
width: 40%;
border:none;
padding:15px 20px;
background-color: teal;
color: white;
cursor : pointer;
margin-bottom:10px;



`


function Login() {
  return (
    <Container>
    <Wrapper>
        <Title>Sign In</Title>
        <Form>
           
            <Input placeholder="Username" />
            <Input placeholder="Password" />
          
           
            <Button>LOGIN</Button>
            <Link>Do Not You Remember Your Password?</Link> 
            <Link>Create a New Account</Link>

        </Form>
    </Wrapper>
</Container>
  )
}

export default Login