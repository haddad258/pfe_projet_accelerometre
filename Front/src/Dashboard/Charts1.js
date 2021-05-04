import React  , {Component} from 'react';
import Chart from 'react-apexcharts'
class BarDiscreteChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [
            {
              data: [
                {
                  x: 'test1',
                  y: [
                    new Date('2019-03-02').getTime(),
                    new Date('2019-03-04').getTime()
                  ]
                },
                {
                  x: 'test2',
                  y: [
                    new Date('2019-03-04').getTime(),
                    new Date('2019-03-08').getTime()
                  ]
                },
                {
                  x: 'test3',
                  y: [
                    new Date('2019-03-08').getTime(),
                    new Date('2019-03-12').getTime()
                  ]
                },
                {
                  x: 'test4',
                  y: [
                    new Date('2019-03-12').getTime(),
                    new Date('2019-03-18').getTime(),
                  ]
                }
              ]
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'rangeBar'
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            xaxis: {
              type: 'datetime'
            }
          },
        
        
        };
      }

    render() {
      return (

      <Chart options={this.state.options} series={this.state.series} type="rangeBar"  width={700} height={400} />
      /*   < Chartoptions={this.state.options} series={this.state.series} type="line" width={700} height={320} />
      ) */
      )
      
    }
  }

export default BarDiscreteChart;