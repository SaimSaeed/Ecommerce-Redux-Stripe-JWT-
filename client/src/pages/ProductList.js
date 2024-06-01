import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer"
import { mobile } from "../Responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"


const Container = styled.div`
`

const Title = styled.h1`
margin:20px;
`
const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
`
const Filter = styled.div`
margin:20px;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterText = styled.span`
font-size:20px;
font-weight: 600;
margin-right:20px;
${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
padding:10px;
margin-right:20px;
${mobile({ margin: "10px 0px" })}
`

const Option = styled.option`
`

function ProductList() {
    // location is fetched
    const location = useLocation();
    // category is exracted from pathname given by location object using split method by splitting the string
    const cat = location.pathname.split("/")[2]
    // Filter object is created
    const [filters, setFilters] = useState({})
    // Sort
    const [sort,setSort] = useState("newest")
    // handle filters function gets the value of filters when they are selected
    const handleFilters = (e) => {
        // value fetched
        const value = e.target.value;
        setFilters({
            // saving a copy of previous filter
            ...filters,
            // getting the name of the filter and the value that has been selected with it
            [e.target.name] : value,
        })

    }
    console.log(filters)
   
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>
                        Filter Products:
                    </FilterText>
                    {/* Unique name is given to select for function to easily seperated the filters */}
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>
                            white
                        </Option>
                        <Option>
                            black
                        </Option>
                        <Option>
                            red
                        </Option>
                        <Option>
                            blue
                        </Option>
                        <Option>
                            yellow
                        </Option>
                        <Option>
                            green
                        </Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>
                            XS
                        </Option>
                        <Option>
                            S
                        </Option>
                        <Option>
                            M
                        </Option>
                        <Option>
                            L
                        </Option>
                        <Option>
                            XL
                        </Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>
                        Sort Products:
                    </FilterText>
                    <Select onChange={e=>setSort(e.target.value)}>
                        <Option value={"newest"}>
                            Newest
                        </Option>
                        <Option value={"asc"}>
                            Price (asc)
                        </Option>
                        <Option value={"desc"}>
                            Price (desc)
                        </Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default ProductList