
import React  , {Component} from 'react';
import Chart from 'react-apexcharts'
class BarDiscreteChartbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany'
              ],
            }
          },
        
        
        };
      }

    render() {
      return (

      <Chart options={this.state.options} series={this.state.series} type="bar"  width={700} height={350} />
      /*   < Chartoptions={this.state.options} series={this.state.series} type="line" width={700} height={320} />
      ) */
      )
      
    }
  }

export default BarDiscreteChartbar;