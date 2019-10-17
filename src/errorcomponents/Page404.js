import React from 'react'
import { Container, Grid } from '@material-ui/core';

export default function Page404(){

    return(
        <div style={{backgroundColor: '#2f353a', height: '100vh', color:'#acb1b5'}}>
            <Container maxWidth='xs'>
                <Grid item md={12}>
                    <h4 >Oops! You're lost.</h4>
                    <p>The page you are looking for was not found.</p>
                </Grid>
                <Grid item md={12}>
                    <h1 className="display-4 ml-4">404</h1>
                </Grid>
            </Container>
        </div>
    )
} 