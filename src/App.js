import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardColumns, Form} from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap'
import './assets/css/Style.css'

function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCty, setSearchCty] = useState("");


  useEffect(() =>
    {
      axios.all([
        axios.get("https://corona.lmao.ninja/all"), 
        axios.get("https://corona.lmao.ninja/countries")
      ])     
      .then(responseArr =>
        {
          setLatest(responseArr[0].data);
          setResults(responseArr[1].data);
        })
        .catch(err =>
          {
            console.log(err);
          });
    }, []);

    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();

    const filterCountry = results.filter(item => 
      {
        return searchCty !== "" ? item.country.includes(searchCty) : item;
      })
    
    const countries = filterCountry.map((data,i) => {
      return(
        
        <div>
          
                <Card key={i}  id="cards-det">
                  <Card.Img id="imgData" variant="top" src={data.countryInfo.flag} />
                  <Card.Body>                    
                    <Card.Title id="card-name">{data.country}</Card.Title> <hr/>
                    <Container fluid>
                      <Row id="card-Row" >
                        <Card.Text id="card-text"> CASE: {data.cases} </Card.Text>
                        <Card.Text id="card-text"> Case (Today): {data.todayCases} </Card.Text>
                        <Card.Text id="card-text-danger"> Deaths: {data.deaths} </Card.Text>
                     
                        <Card.Text id="card-text-danger"> Deaths (Today): {data.todayDeaths} </Card.Text>
                        <Card.Text id="card-text-success"> Recovered: {data.recovered} </Card.Text>
                        <Card.Text id="card-text-warning"> Active: {data.active} </Card.Text>
                     
                        <Card.Text id="card-text-warning"> Critical: {data.critical} </Card.Text>
                        <Card.Text id="card-text"> Cases(Per Million): {data.casesPerOneMillion} </Card.Text>
                        <Card.Text id="card-text"> Deaths(Per Million): {data.deathsPerOneMillion} </Card.Text>
                        <Card.Text id="card-text"> Tests: {data.tests} </Card.Text>
                        <Card.Text id="card-text"> Test(Per Million)): {data.testsPerOneMillion} </Card.Text>
                      </Row>
                    </Container>   
                  </Card.Body>
                </Card>
                <br/>
            
            
        </div>

      );

    });

    

  return (
    <div className="container-fluid" id="bodySec">
      <Container fluid style={{textAlign:'center'}}>
        <Row>
          <Col><h1 style={{letterSpacing:'5px',color:'white'}}>Covid-19 Tracker</h1></Col>
        </Row><br/><br/>
        <Row>
          <Col>
              <Card bg={'primary'}>
                  <Card.Title id="card-name" style={{textAlign:'center'}}>Bangladesh</Card.Title>
                  <Card.Body>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text1"> CASE: {latest.cases} </Card.Text> <hr/>
                          <p><small >{lastUpdated}</small> </p>
                        </Row>
                    </Container>
                  </Card.Body>
              </Card>
          </Col>
          <Col>
              <Card bg={'secondary'}>
                  <Card.Title id="card-name" style={{textAlign:'center'}}>CASES</Card.Title>
                  <Card.Body>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text1"> CASE: {latest.cases} </Card.Text> <hr/>
                          <p><small >{lastUpdated}</small> </p>
                        </Row>
                    </Container>
                  </Card.Body>
              </Card>
          </Col>
          <Col>
              <Card bg={'danger'}>
                  <Card.Title id="card-name" style={{textAlign:'center'}}>DEATHS</Card.Title>
                  <Card.Body>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text1"> CASE: {latest.deaths} </Card.Text> <hr/>
                          <p><small >{lastUpdated}</small> </p>
                        </Row>
                    </Container>
                  </Card.Body>
              </Card>
          </Col>
          <Col>
              <Card bg={'success'}>
                  <Card.Title id="card-name" style={{textAlign:'center'}}>RECOVERED</Card.Title>
                  <Card.Body>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text1"> CASE: {latest.recovered} </Card.Text> <hr/>
                          <p><small >{lastUpdated}</small> </p>
                        </Row>
                    </Container>
                  </Card.Body>
              </Card>
          </Col>
         
        </Row>
        <br/>
        <br/>
        <Row style={{textAlign:'center',width:'100%'}}>
          <Col>
              <div id="search" >
                <input id="searchBar" type="text" placeholder="Search Country" onChange={e=> setSearchCty(e.target.value)}/> <br/>
                <label>**N.B:  First letter must be Capital</label>
              </div>
          </Col>
        </Row>
        <br/>
        <br/>
        
        <CardColumns> {countries} </CardColumns> 
      </Container>
    </div>
  );
}

export default App;
