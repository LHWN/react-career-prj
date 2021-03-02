import React from 'react';
import styled from 'styled-components';

const InsertFormPositioner = styled.div`
    /* width: 100%; */
    /* display: flex;
    justify-content: center;
    align-items: center; */

    display: flex;
    justify-content: center;
    align-items: center;

    :root {
        --color-shadow-inset: inset 0 1px 0 rgba(225,228,232,0.2);
    }
`;

const InsertFormContainer = styled.div`
    width: 300px;

    .largeText {
        text-align: center;
        font-size: 24px;
        font-weight: 300;
    }

    .mediumText {
        text-align: center;
        font-size: 16px;
        font-weight: 300;
    }

    .smallText {
        text-align: center;
        font-size: 14px;
        font-weight: 300;
    }
`;

const InsertForm = styled.div`
    /* width: 300px; */

    border: 1px solid #eaecef;
    border-radius: 5px;

    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background: #F6F8FA;    
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto; 
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .accountLabel {
        font-weight: 600;
        display: block;
        margin-bottom: 7px;
        text-align: left;
        font-size: 14px;
        color: #24292e;
    }

    .input-block {
        margin-top: 5px;
        margin-bottom: 15px;
        width: 100%;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 20px;
        color: #24292e;
        vertical-align: middle;
        background-color: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        outline: none;
        box-shadow: --color-shadow-inset;
        box-sizing: border-box;
    }

    .btn {
        width: 90%;
    }
`;

const RequestAccountLink = styled.div`
    padding: 15px 20px;

    text-align: center;
    border: 1px solid #d1d5da;
    border-radius: 5px;
    box-sizing: border-box;
    margin-top: 16px;   

    p {
        margin-top: 0;
    }

    .requestAccText {
        color: #0366d6;
        cursor: pointer;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }


`;


export default function SignInForm() {
    return (
        <InsertFormPositioner>
            <InsertFormContainer>
                <h1 className="largeText">Sign in to My Career!</h1>
                <InsertForm>
                    <label for="login_field" className="accountLabel">Username or email address</label>
                    <input type="text" name="login" id="login_field" className="input-block" autocapitalize="off" autocorrect="off" autocomplete="username" autofocus="autofocus"></input>
                    <label for="password" className="accountLabel">Password</label>
                    <input type="password" name="password" id="password" className="input-block" autocomplete="current-password"></input>
                    <a>SUBMIT</a> 
                </InsertForm>
                <RequestAccountLink>
                    <p className="mediumText">Do you want to see my career?</p>
                    <a className="mediumText" className="requestAccText" href="mailto:wlsekffo1674@naver.com
                    ?subject=Request%20for%20an%20account.
                    &body=Dear%20Hyewon%0D%0A%0D%0A
                    I%20am%20writing%20to%20request%20an%20account%20that%20I%20can%20access.%0D%0A
                    I%20will%20be%20waiting%20for%20your%20reply.%20Thank%20you.%0D%0A%0D%0A
                    Best%20Regards.%0D%0A">Send me an email!</a>
                </RequestAccountLink>
            </InsertFormContainer>
        </InsertFormPositioner>
    );
}