import { AccountBalanceOutlined, ContactlessOutlined, PaymentOutlined, PaymentsOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: rgb(15, 15, 15);
    color: rgb(206, 206, 205);
    padding: 2em;
    height: fit-content;
`
const FooterContent = styled.div`
    display: flex;
`
const List = styled.ul`
    list-style: none;
`
const ListItem = styled.li`
    font-family: 'Teko', sans-serif;
    font-size: 1.5em;
    letter-spacing: .1em;
    margin: .5em 0;
`
const Left = styled.div`
    flex: 1;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const PrivacyContainer = styled.div`
    text-align: center;
    color: rgb(165, 165, 164);
    font-size: .8em;
    margin-top: 1em;
`
const PaymentsContainer = styled.div`
    display: flex;
    margin: .5em 0em;
    & > *{
        margin-right: .5em;
    }
`
const Description = styled.div`
    font-size: .8em;
    color: rgb(165, 165, 164);
    margin-top: 1em;
`

const Footer = () => {
  return (
    <Container>
        <FooterContent>
            <Left>
                <List>
                    <ListItem>Conditions of use</ListItem>
                    <ListItem>Shipping & returns</ListItem>
                    <ListItem>Privacy Notice</ListItem>
                </List>
            </Left>
            <Center>
                <List>
                    <ListItem>Contact us</ListItem>
                    <ListItem>FAQ</ListItem>
                    <ListItem>Imprint</ListItem>
                </List>
            </Center>
            <Right>
                <PaymentsContainer>
                    <PaymentOutlined/>
                    <PaymentsOutlined/>
                    <ContactlessOutlined/>
                    <AccountBalanceOutlined/>
                </PaymentsContainer>
                <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Description>
            </Right>
        </FooterContent>
        <PrivacyContainer>
            COPYRIGHT © 2023 ALL RIGHTS RESERVED.
        </PrivacyContainer>
    </Container>
  )
}

export default Footer
