import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "../country.css"
import { apiURL  } from "./Api"

 const Country = () => {
  const [country, setCountry] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const { name } = useParams()
  
  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countries.length > 0) {
      filterCountryByName(name);
    }
  }, [countries, name]);

  const filterCountryByName = (countryName) => {
    const filteredCountry = countries.filter(
      (element) => element.name === countryName
    );
    setCountry(filteredCountry);
  };
  return (
    <>
    { loading && 
                    <div className='loading'>loading....</div>
} 
      <section className="country">
        <Link to="/" className="btn" id="btn">
        <svg viewBox="0 0 448 512"><path fill="currentColor"
         d="M152.485 396.284l19.626-19.626c4.753-4.753 4.675-12.484-.173-17.14L91.22
          282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H91.22l80.717-77.518c4.849-4.656 
          4.927-12.387.173-17.14l-19.626-19.626c-4.686-4.686-12.284-4.686-16.971 0L3.716 247.515c-4.686 4.686-4.686 
          12.284 0 16.971l131.799 131.799c4.686 4.685 12.284 4.685 16.97-.001z"></path></svg> <div className="bi">Back</div>
          {/* <i className="fas fa-arrow-left"></i> Back  */}
        </Link>
        {!loading && country.map((c) => {
          console.log(country,2)
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

export default Country;
