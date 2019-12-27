// 1. Use the D3 library to read in samples.json.
var jsonFile = "samples.json"

function getSampleData() {

  d3.json(jsonFile).then(function(data) {
    var allSamples = data.samples
    var id = allSamples.map(entry => entry.id);
    // var otuIds = allSamples.map(entry => entry.otu_ids);
    // // var sampleValues = allSamples.map(entry => entry.sample_values);
    // // var otuLabels = allSamples.map(entry => entry.otu_labels);
    console.log(id, allSamples);

  //Add IDs to dropdown
  var dropDownValues = id.forEach(d => d3.select("select").append("option").attr("value", d).text(d));
  
  //Select the initial test subject (0 index)
  var selectedIndex = 0
  var initialId = allSamples[selectedIndex]
  console.log(initialId)


  // // Sort the sample value data from highest to lowest
  // var sortedBySampleValue = initialId.sort((a, b) => b.sample_values - a.sample_values);
  // console.log(sortedBySampleValue)

  // // Slice the top 10 
  // var topTenSampleValue= sortedBySampleValue.slice(0, 10);

  // // Reverse the array to accommodate Plotly's defaults
  // var topTenReversed = topTenSampleValue.reverse();

  // console.log(topTenReversed)

// Trace1 Horizontal Bar Chart 
var x = initialId.sample_values;
var y = [];
initialId.otu_ids.forEach(d => y.push(`OTU: ${d}`));

var trace1 = {
  x: x.slice(0, 9),
  y: y.slice(0, 9),
  text: initialId.otu_labels,
  name: "Sample Values",
  type: "bar",
  orientation: "h",
  transforms: [{
    type: 'sort',
    target: 'x',
    order: 'ascending'
  }],
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Top Ten OTUs",
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data, layout);

  // Select sample data for chosen Test Subject ID No. on change
  d3.select("select")
  .on("change",function(d){
    var selectedID = d3.select("#selDataset").node().value;
    console.log( selectedID );
    d3.select(this).value(selectedID);
  })

  d3.select(this).on("change", function() {
    var selectedID = d3.event.target.value;
    var choiceIndex = id.indexOf(selectedID);
    console.log(selectedID, choiceIndex);
  });


  // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // Use sample_values as the values for the bar chart.
  // Use otu_ids as the labels for the bar chart.
  // Use otu_labels as the hovertext for the chart.

  
  
  // // Plot the chart to a div tag with id "plot"
  // Plotly.newPlot("plot", data, layout);


  });
}

getSampleData()




  
  // 3. Create a bubble chart that displays each sample.
  // Use otu_ids for the x values.
  // Use sample_values for the y values.
  // Use sample_values for the marker size.
  // Use otu_ids for the marker colors.
  // Use otu_labels for the text values.
  
  // 4. Display the sample metadata, i.e., an individual's demographic information.
  // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
  // 6. Update all of the plots any time that a new sample is selected
  
  //SCRATCHSHEET
  // d3.json("samples.json").then(function(data) {
//     // var id = unpack(data.samples.id, 0);
//     console.log(d3.entries(data.samples));
//   });


  // d3.json("samples.json", then(function(data){
  //   var samples = data.map(function(d) { 
  //     return d.samples;
  //     console.log(samples);
  //   });
  // });

