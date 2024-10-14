import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Alert, AlertTitle, Button, Container, FormControl, TextField, Typography } from "@mui/material";

function SignupPage() {

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [usr, setUsr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handleUsr = (e) => setUsr(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, fullName, usr, email, password };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

      }}>
      <Container sx={{
        margin: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography textAlign={"center"} variant={"h3"}> Registro </Typography>
      </Container>

      <FormControl>


        <Container
          sx={{

            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="filled"
              onChange={handleName}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              fullWidth
              label="Apellido"
              variant="filled"
              onChange={handleFullName}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              fullWidth
              label="Usuario"
              variant="filled"
              onChange={handleUsr}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              fullWidth
              label="Correo"
              variant="filled"
              onChange={handleEmail}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              id="filled-error-helper-text"
              label="Contrasena"
              variant="filled"
              onChange={handlePassword}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Button variant="contained">Registrarse </Button>
          </Container>
        </Container>
      </FormControl>
      <Container sx={{
        margin: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>

        <Typography textAlign={"center"} variant={"body1"}> Ya tienes una cuenta? </Typography>
      </Container>
      <Container>
        <Link to={"/login"}> Iniciar sesion</Link>
      </Container>


      {errorMessage && (
        <Container item xs={12} sx={{ mt: 3 }}>
          <Alert variant="filled" severity="error">
            <AlertTitle>
              {errorMessage}
            </AlertTitle>

          </Alert>
        </Container>
      )}


    </Container>
  );
}

export default SignupPage;
