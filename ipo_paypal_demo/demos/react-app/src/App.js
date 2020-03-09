import './App.css';
import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import chair from './chair.jpg';
import gif from './giphy.gif';
const paypalRef1 = ""
const paypalRef2 = ""
const paypalRef3 = ""

const PAINTING_IMG=process.env.PUBLIC_URL + '/assets/severed1.jpg'
const heroku_api = 'https://ipo-paintings.herokuapp.com/media'
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
var selected_sku = "test"



class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }
  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 10,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;
    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown">
        <span className="Countdown-col">
          <span className="Countdown-col-element">
              <strong>{this.addLeadingZeros(countDown.days)}</strong>
              <span> {countDown.days === 1 ? 'Day' : 'days'}</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong> {this.addLeadingZeros(countDown.hours)}</strong>
            <span> hours</span>
          </span>
        </span>


        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong> {this.addLeadingZeros(countDown.min)}</strong>
            <span> minutes</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong> {this.addLeadingZeros(countDown.sec)}</strong>
            <span> seconds</span>
          </span>
        </span>
      </div>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.string.isRequired
};
Countdown.defaultProps = {
  date: new Date()
};



















function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef1 = useRef();
  const paypalRef2 = useRef();
  const paypalRef3 = useRef();

  function handle(ray){
    console.log(ray)
  }

  useEffect((j) => {
    var ray = []
    for(var i=0; i < product.length; i++) {
      console.log(product[i].pp)
      ray.push(product)
      
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            handle(data)
            return actions.order.create({
              purchase_units: [
                {
                  description: product[0].description,
                  amount: {
                    currency_code: 'USD',
                    value: '0.01',
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaidFor(true);
            console.log("order approve" + order);
            console.log(data)
          }
        }).render(product[i].pp);
        console.log(i)
        console.log(ray)
      }
  }, '#paypall-button-container');

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
        <img alt={product.description} src={gif} />
      </div>
    );
  }

  return (
  product.map(item => (
    <div>
        <h1>{item.description} for ${item.price} </h1>
        <img alt={item.description} src={item.image} width="200" />
        {item.pp}
        <div ref={(node) => {item.pp = node;}}  onClick={()=>{ console.log('alert'); }}/>
    </div>
  ))
  );
}


function App() {
  const product = [
    {
      price: 0.01,
      name: 'stock 1',
      description: '1',
      image: chair,
      pp: paypalRef1,
      quantity: 1,
    },
    {
      price: 0.01,
      name: 'stock 2',
      description: '2',
      image: chair,
      pp: paypalRef2,
      quantity: 1,
    },
    {
      price: 0.01,
      name: 'stock 2',
      description: '3',
      image: chair,
      pp: paypalRef3,
      quantity: 1,
    }
  ];

  return (
    <>
      <div id="home_pg">
          <div id="twothird">
            <div className="main_menu">
              <ul>
                <li>Initial Public Offering
                <div className="right_menu">
                      <li><a href="#/">shop</a></li>
                      <li><a href="#/about">about</a></li>
                      <li><a href="#/history">history</a></li>
                    </div>
                    </li>
              </ul>
            </div>
            <Countdown date="2019-11-15T12:00:00.000Z"/>
            <div id="offering">
                <img src="../assets/ipo_round2.png"/>
                <div id="caption">
                  <div id="limited">
                    <div className="column-center"><img src="../assets/clock.png"/>Limited Time<br/> Remaining</div>
                    <div className="column-left"><img src="../assets/fire.png"/>Online Only</div>
                    <div className="column-right star"><img src="../assets/45star.png"/>23<br/> Ratings</div>
                  </div>
                  <p>
                    <span id="title">Trevor 224</span><br/>
                    oil, acrylic, spray paint on cotton rag paper<br/>
                    42x90 inches<br/>
                    2019<br/><br/>
                    Original Work on Paper<br/>
                  </p>
                </div>
              </div>
              <div className="clear"></div>
              <div id="shares_img">
                <img src="../assets/severed_plain2.png"/>
              </div>
          </div>
          <div id="onethird">
              <div id="product_section">
                <p>Shares</p>
                <ul>
                  <Product product={product} />
                </ul>
              </div>
            </div>
      </div>
    </>
  );
}



export default App;
