import React from "react"


const Filter = ({
  searchInput,
  setSearchInput,
  setFiltered,
 
  countries,
}) => {
 
  // Prevent page reload when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Search countries
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredCountries)
    } else {
      setFiltered(countries)
    }
  }



  return (
  <>
    <form className="form" id="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
        className="search-input"
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          
          placeholder="&#xF002;     Search for a Country ... "
          onChange={(e) => searchCountries(e.target.value)}
        />
        </div>
       
      </form>
    </>
  )
}

export default Filter
