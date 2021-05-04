// import React, { Component } from 'react';
// import Chart from 'react-apexcharts'
// class ChartsRadar extends React.Component {
//     constructor(props) {
//         super(props);

        // this.state = {

        //     series: [{
        //         name: 'Series 1',
        //         data: [80, 50, 30, 40, 100, 20],
        //     }],
        //     options: {
        //         chart: {
        //             height: 350,
        //             type: 'radar',
        //         },
        //         title: {
        //             text: 'Basic Radar Chart'
        //         },
        //         xaxis: {
        //             categories: ['January', 'February', 'March', 'April', 'May', 'June']
        //         }
        //     },


        // };
//     }



//     render() {
//         return (



//             <Chart options={this.state.options} series={this.state.series} type="radar" height={350} />



//         );
//     }
// }
// export default ChartsRadar


import React  , {Component} from 'react';
import Chart from 'react-apexcharts'
class BarDiscreteChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'test1',
                data: [80, 50, 30, 40, 20, 20,29,20,10,39,29,39],
            },
        
            {
                name: 'test2',
                data: [80, 50, 30,,20,10,39,29,39],
            },
            {
                name: 'test3',
                data: [10, 30, 25,14,30,10,9,9,29]
            }],
            options: {
                chart: {
                    height: 500,
                    type: 'radar',
                },
                title: {
                    text: 'simulation on Z axis of vibration stability dz'
                },
                xaxis: {
                    categories: ['z','','','', 'y','','','','x']
                }
            },


        };
      }

    render() {
      return (

      <Chart options={this.state.options} series={this.state.series} type="radar"  width={800} height={400} />
      /*   < Chartoptions={this.state.options} series={this.state.series} type="line" width={700} height={320} />
      ) */
      )
      
    }
  }

export default BarDiscreteChart;