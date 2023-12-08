import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CircularChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'pie',
      width: 600,
      height: 600,
      rtl: true,
    },
    title: {
      text: 'نمودار دایره ای مبلغ و تاریخ',
    },
    tooltip: {
      pointFormat: '<b>{point.name}:</b> {point.y:,.0f}', // Display formatted value in tooltip
    },
    series: [
      {
        name: 'مبلغ',
        data: data.map((item) => ({
          name: item.date,
          y: parseFloat(item.amount),
        })),
        dataLabels: {
          formatter: function () {
            return Highcharts.numberFormat(this.y, 0, '', ',');
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default CircularChart;
