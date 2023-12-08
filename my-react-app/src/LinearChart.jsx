import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LinearChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      width: 1200,
      height: 600,
      rtl: true,
    },
    title: {
      text: 'نمودار میله ای تاریخ و مبلغ',
    },
    xAxis: {
      categories: data.map((item) => item.date),
      title: {
        text: 'تاریخ',
      },
    },
    yAxis: {
      title: {
        text: 'مبلغ',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.y:,.0f}</b>',
    },
    series: [
      {
        name: 'مبلغ',
        data: data.map((item) => parseFloat(item.amount)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LinearChart;
