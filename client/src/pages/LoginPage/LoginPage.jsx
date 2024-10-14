import "./LoginPage.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";

function LoginPage() {

  const [usr, setUsr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsr = (e) => setUsr(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
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
        <Typography textAlign={"center"} variant={"h3"}> Login </Typography>
      </Container>

      <FormControl onSubmit={handleLoginSubmit}>

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
              label="Email"
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
              fullWidth
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
            <Button variant="contained">Iniciar sesion </Button>
          </Container>

          <Container sx={{
            margin: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Typography textAlign={"center"} variant={"body1"}> Aun no tienes una cuenta? </Typography>
          </Container>
          <Container>
            <Link to={"/signup"}> Registrate</Link>
          </Container>


        </Container>

      </FormControl>
      {errorMessage && <p className="error-message">{errorMessage}</p>}


    </Container>

  );
}

export default LoginPage;
