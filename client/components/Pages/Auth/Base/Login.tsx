import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://copyben.ma/">
                CopyBen
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function Login() {
    const [sending, setSending] = React.useState<boolean>(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSending(true)

        const data = new FormData(event.currentTarget);
        const url = "http://127.0.0.1:8000/api/login";

        axios.post(url, data).then( res => {
            const loggedUser = res.data.loggedIn[0];
            console.log(loggedUser)
            setSending(false)
        })
        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                >
                    Se Connecter
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Se souvenir de moi"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disableElevation
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "primary.main",
                            color: "white",
                        }}
                    >
                        {sending ? "Envoi en cours..." : "S'identifier"}
                    </Button>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <NextLink href="/auth/register">
                                <Link variant="body2">
                                    {
                                        "Vous n'avez pas de compte ? Inscrivez-vous"
                                    }
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}