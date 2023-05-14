import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "../country.css"
import { api } from "./Api"

const Country = () => {
  const [country, setCountry] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const { name } = useParams()

  useEffect(() => {
    const fetchCountryData = async () => {
      const countryy = await api.getCountry(name)
      //const country = await response.json()
      setCountry(countryy)
      
      
      const countriess = await api.getCountries()
      setCountries(countriess)
      
      setLoading(false)
    }

    fetchCountryData()
  }, [name])

  

  return (
    <>
    { loading &&
                    <div className='loading'>loading....</div>
 
} 
      <section className="country">
        <Link to="/" className="btn" id="btn">
          <i className="fas fa-arrow-left"></i> Back 
        </Link>
        {!loading && country.map((c) => {

          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c

          return (
            <article key={numericCode}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flag} alt={name} />
                </div>

                <div className="country-details">
                  <div>
                    <h2>{name}</h2>
                    <h5>
                      Native Name: <span>{nativeName}</span>
                    </h5>
                    <h5>
                      Population: <span>{population.toLocaleString()}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{capital}</span>
                    </h5>
                  </div>

                  <div className="other-details">
                    <h5>
                      Top Level Domain: <span>{topLevelDomain}</span>
                    </h5>
                    <h5>
                      Currencies: <span>{currencies[0].name}</span>
                    </h5>
                    <h5>
                      Languages: <span>{languages[0].name}</span>
                    </h5> 
                  </div>
                  
                </div>
              </div>
              <div className="border-around">
                <h3>Border Countries: </h3>
                <div className="borders">
                  {borders.map((border, index) => {
                    const fullName=countries.find(ele=>ele.alpha3Code === border).name
                    return (
                      <ul key={index}>{fullName}</ul>
                      
                    )
                  })}
                </div>
              </div>
             
            </article>
          )
        })}
      </section>
    </>
  )
}

export default Country
