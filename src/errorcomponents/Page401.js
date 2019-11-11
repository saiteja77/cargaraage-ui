import React from 'react'
import { Container, Grid } from '@material-ui/core';

export default function Page404(){

    return(
        <div style={{backgroundColor: '#2f353a', height: '100vh', color:'#acb1b5'}}>
            <Container maxWidth='xs' style={{padding: 20, paddingTop: 100, }}>
                <Grid item md={12}>
                    <h4>UNAUTHORIZED.</h4>
                    <p>You are not authorized to view the content of this page.</p>
                </Grid>
                <Grid item md={12}>
                    <h1 className="display-4 ml-4">401</h1>
                </Grid>
            </Container>
        </div>
    )
} 