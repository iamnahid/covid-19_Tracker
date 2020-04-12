import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardColumns} from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap'
import './assets/css/Style.css'
import fb from './assets/img/fb.png'
import bh from './assets/img/bh.png'
import pn from './assets/img/pn.png'
import ld from './assets/img/ld.png'
import gh from './assets/img/gh.png'
import web from './assets/img/web.png'

function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [bd, setBD] = useState([]);
  const [searchCty, setSearchCty] = useState("");


  useEffect(() =>
    {
      axios.all([
        axios.get("https://corona.lmao.ninja/all"), 
        axios.get("https://corona.lmao.ninja/countries"),
        axios.get("https://corona.lmao.ninja/countries/Bangladesh")
      ])     
      .then(responseArr =>
        {
          setLatest(responseArr[0].data);
          setResults(responseArr[1].data);
          setBD(responseArr[2].data);
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
        
        <div id="country-cards">
          
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
                        <Card.Text id="card-text"> Test(Per Million): {data.testsPerOneMillion} </Card.Text>
                      </Row>
                    </Container>   
                  </Card.Body>
                </Card>
                <br/>
            
            
        </div>

      );

    });

    

  return (
    <div  id="bodySec">
     
        <div className="navContainer">
            <ul>
                <a id="navList" href='http://bit.ly/iamnahidFB'><img src={fb} alt=""/> </a>
                <a id="navList" href='http://bit.ly/iamnahidLinkedIN'><img src={ld} alt=""/> </a>
                <a id="navList" href='http://bit.ly/iamnahid_Web'><img src={web} alt=""/> </a>
                <a id="navList" href='http://bit.ly/iamnahidBehance'><img src={bh} alt=""/> </a>
                <a id="navList" href='http://bit.ly/iamnahidPin'><img src={pn} alt=""/> </a>
                <a id="navList" href='http://bit.ly/iamnahid_github'><img src={gh} alt=""/> </a>
            </ul>
        </div> 
        <div id="copyright">          
          <p id="copyright-p">	&copy; 2020   <a id="copyright-a" href="https://iamnahid.github.io"> iamnahid </a> All Rights Reserved</p>
        </div><br/><br/>
      <Container fluid style={{textAlign:'center'}}>
        <Row>          
          <Col><h1 style={{letterSpacing:'5px',color:'white'}}>IAMNAHID</h1></Col>
        </Row>
        <Row>
          <Col><h1 style={{letterSpacing:'5px',color:'white'}}>Covid-19 Tracker v2.0</h1></Col>
        </Row><br/><br/>
        <Row>
          <Col>
              <Card id="bd">
                  <Card.Title id="card-name-bd" style={{textAlign:'center'}}>BANGLADESH</Card.Title><hr/>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text1"> CASE: {bd.cases} </Card.Text> <br/>
                          
                          <Card.Text id="card-text1"> ACTIVE: {bd.active} </Card.Text> 
                          <Card.Text id="card-text1-d"> DEATHS: {bd.deaths} </Card.Text> 
                          <Card.Text id="card-text1-c"> CRITICAL: {bd.critical} </Card.Text> 
                          <Card.Text id="card-text1-s"> RECOVERED: {bd.recovered} </Card.Text> 
                          <Card.Text id="card-text1"> TEST: {bd.tests} </Card.Text> <hr/>
                          <Card.Text id="card-text1"> CASE (TODAY): {bd.todayCases} </Card.Text> 
                          <Card.Text id="card-text1-d"> DEATHS (TODAY): {bd.todayDeaths} </Card.Text> <br/>
                          
                          <Card.Text id="card-text1"> CASES(PER MILLION): {bd.casesPerOneMillion} </Card.Text> 
                          <Card.Text id="card-text1-d"> DEATHS(PER MILLION): {bd.deathsPerOneMillion} </Card.Text> 
                          <Card.Text id="card-text1"> TESTS(PER MILLION): {bd.testsPerOneMillion} </Card.Text> 
                          <p><small > last updated: {lastUpdated}</small> </p>
                        </Row>
                    </Container>
              </Card>
          </Col>
        </Row> <br/>
        <Row>
          
          <Col>
              <Card bg={'primary'}>
                  <Card.Title id="card-name" style={{textAlign:'center'}}>CASES</Card.Title>
                  <Card.Body>
                    <Container fluid>
                        <Row id="card-Row1" >
                          <Card.Text id="card-text2"> CASE: {latest.cases} </Card.Text> <hr/>
                          <p><small >last updated: {lastUpdated}</small> </p>
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
                          <Card.Text id="card-text2"> CASE: {latest.deaths} </Card.Text> <hr/>
                          <p><small>last updated: {lastUpdated}</small> </p>
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
                          <Card.Text id="card-text2"> CASE: {latest.recovered} </Card.Text> <hr/>
                          <p><small > last updated:{lastUpdated}</small> </p>
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
                <h1 style={{textAlign:'center',color:'white', letterSpacing:'5px'}}>Search Country Data</h1>
                <input id="searchBar" type="text" placeholder="Search Country" onChange={e=> setSearchCty(e.target.value)}/> <br/>
                <label>**N.B:  First letter must be Capital.Ex: " Bangladesh "</label>
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
