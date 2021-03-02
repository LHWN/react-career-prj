import React from 'react';
import styled from 'styled-components';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const SignInHeader = styled.div`
    width: 100%;
    height: 80px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SignInHeadContainer = styled.div`
    overflow: auto; 
`;


export default function SignInHead() {
    return (
        <SignInHeader>
            <SignInHeadContainer>
                <AccountBoxIcon style={{ fontSize: 50, color: '#343a40' }} />
            </SignInHeadContainer>
        </SignInHeader>
    );
}