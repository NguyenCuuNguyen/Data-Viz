//{report_title: "Trump says US could use 'little bit of that good old global warming'", clean_news_source: 'abcnews.go', percentage: 26}
/*TOGRASP:
1) width: 54; height: 133.333; x: 8; y: 66.6667;
2) width: 54; height: 146.667; x: 68; y: 53.3333;
3) width: 54; height: 160; x: 128; y: 40
4) width: 54; height: 80; x: 188; y: 120
}


*/
let DUMMY_DATA = [
  {report_title: 'JUST IN: TRUMP Will Remove ‚Äö√Ñ√∂‚Üxa0ö√ë‚Üxa0ö‚Üxa0´Climate Change‚Äö√Ñ√∂‚Üxa0ö√ë‚Üxa0öœÄ From List Of National Security Threats * 100PercentFedUp.com', clean_news_source: '100percentfedup', percentage: 10}, //26
  {report_title: 'London Installs Moss Benches That Each Absorb as Much Pollution as 275 Trees', clean_news_source: '9gag', percentage: 11}, //53
  {report_title: 'Arctic Temperatures Reach Record High', clean_news_source: 'act.nrdc.org', percentage: 12}, //35
  {report_title: 'How Lyme disease became the first epidemic of climate change ‚Äö√Ñ√∂‚Üxa0ö√ë‚Üxa0ö¬® Mary Beth Pfeiffer | Aeon Essays', clean_news_source: 'aeon.co', percentage: 6},];

const xScale = d3.scaleBand()
                .domain(DUMMY_DATA.map(dataP => dataP.clean_news_source)) //fix the overflowing width: unique array of data points so scaleBand knows how many items there are
                .rangeRound([0, 250]).padding(0.1); //ordinal scale where all bars have same width = uniform distribution. RangeRound() tells which space is available
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]); //translate value, x-y axis of where element should be positioned. Domain() specifies min and max value to map its internal coordinate system. X should cross y axis at 0 (smallest value on y axis)
/*TOLEARN: x-axis goes left to right. But y-axis goes top to bottom => switch big value comes first*/

//store the div into a container variable to select its inner elements
const container = d3.select('svg') //can select multi elements. 'tag', '.CssClass', '#CssID'
  .classed('container', true) //Add CSS class: second arg = added or not

const bars = container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect') //rect = valid svg element
  .classed('bar', true)  //on every div, add bar class, so they can be selected by selectAll('.bar')
  .attr('width', xScale.bandwidth())  //  div use both .style('width', '50px') and .attr(), but svg use .attr()
  .attr('height', (data) => 200 - yScale(data.percentage)) //data() is called for each div/each data point. Convert to string+add px (data.percentage*15). TOLEARN: calculated from the top left so have to take max and subtract the y-axis data
  .attr('x', data => xScale(data.clean_news_source)) //news source as domain for the x scale
  .attr('y', data => yScale(data.percentage));

/*TOLEARN:
  .selectAll('p') //selecting elements inside of the above div
  .data(DUMMY_DATA) //bind selection to data array
  .enter() //holds info about 3 missing elements
  .append('p') //append/render paragraph to div for each missing element
  .text(dta => dta.report_title); //add text node inside para for each created para. dta is a function saying para should output the element in the array


  CSS:
  Use below to add space around div and change orientation
  display:flex;
  justify-content:space-around;
*/
  /*D3 is all about binding data to elements and rendering these elements as required*/
  //console.log(d3)
  //select div, then select all paragraphs inside that div, then bind data to that paragraph, then give missing paragraphs (corresponding to bound item in data array)

  //const data = require('./jsObjects.json');
  // fetch('./jsObjects.json')
  // .then(response => {
  //     return response.json();
  // }).then(data2 => console.log(data2))
