
const pinChart ={
  series: [25, 15, 44],
  options : {
  chart: {
    width: "100%",
    height: 350,
    type: "pie",
  },

  labels: ["pending", "complete", "reject"],
  theme: {
    monochrome: {
      enabled: true
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  // title: {
  //   text: "Monochrome Pie"
  // },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    }
  },
  legend: {
    show: false
  }
}
}
export default pinChart;