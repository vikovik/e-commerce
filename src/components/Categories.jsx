import React from 'react'
import styled from 'styled-components'
import { categoriesData } from '../data'
import CategoryItem from './CategoryItem'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: rgb(0, 0, 0);
    color: rgb(204, 203, 203);
    height: fit-content;
    padding: 2em;
`

const Categories = () => {
  return (
    <Container>
      {categoriesData.map(item => (
        <CategoryItem item={item} key={item.id}></CategoryItem>
      ))}
    </Container>
  )
}

export default Categories
