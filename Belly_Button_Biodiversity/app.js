
//Declare global variables
var jsonFile = "samples.json";

var allSamples;
var allMetadata;
var id;

function getInitialData() {
  //Read in samples.json data
  d3.json(jsonFile).then(function(data) {
    allSamples = data.samples;
    allMetadata = data.metadata;
    id = allSamples.map(entry => entry.id);

    //Add IDs to dropdown
    var dropDownValues = id.forEach(d => d3.select("select").append("option").attr("value", d).text(d));
    
    //Select the initial test subject (0 index)
    var initialIndex = 0;
    var sample = allSamples[initialIndex];
    var metadata = allMetadata[initialIndex];
    console.log(sample);
    console.log(metadata);
    
    // Display the sample metadata and each key-value pair in panel
    Object.entries(metadata).forEach(function([key, value]) {
        d3.select("#sample-metadata").append("div").text(`${key}: ${value}`).style("font-size", "small").style("font-weight", "bold").classed("panel_meta", true);
    });
    
    // Horizontal Bar Chart (Top 10 OTUs found in that individual)
    var xBar = sample.sample_values;
    var yBar = [];
    sample.otu_ids.forEach(d => yBar.push(`OTU: ${d}`));
    
    var trace1Bar = {
        x: xBar.slice(0, 9),
        y: yBar.slice(0, 9),
        text: sample.otu_labels,
        name: "Sample Values",
        type: "bar",
        orientation: "h",
        transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
        }],
    };
    
    var dataBar = [trace1Bar];
    var layoutBar = {
        title: "Top Ten OTUs",
    };
    
    Plotly.newPlot("bar", dataBar, layoutBar);

    // Bubble chart (displays each sample)
    var xBubble = sample.otu_ids;
    var yBubble = sample.sample_values;

    var trace1Bubble = {
        x: xBubble,
        y: yBubble,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
        color: xBubble,
        size: yBubble
        }
    };
    
    var dataBubble = [trace1Bubble];
    
    var layoutBubble = {
        title: 'Sample Composition',
        showlegend: false,
    };
    
    Plotly.newPlot('bubble', dataBubble, layoutBubble);

    //Gauge chart (wash frequency)
    var washfreq = metadata.wfreq;
    var dataGuage = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: washfreq,
        title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 16 } },
        type: "indicator",
        mode: "gauge+number",
        gauge: {bar: { color: "#148F77" }, axis: { range: [null, 9] } },
        }
    ];
    
    var layoutGauge = { margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', dataGuage, layoutGauge);
});
}

getInitialData()

//Update all of the plots any time that a new sample is selected

function getNewData() {
    // Select sample data for chosen Test Subject ID No. on change
    var choiceID;
    var choiceIndex;

    d3.select("select")
    .on("change",function(d){
        //Grab the id selected in the dropdown
        choiceID = d3.select("#selDataset").node().value;
        console.log(`New Test Subject Selected: ${choiceID}`);
        
        //Find the index of the selected ID
        choiceIndex = id.indexOf(choiceID);
        console.log(`Index of New Test Subject: ${choiceIndex}`);

        //Grab data for the selected test subject
        var sample = allSamples[choiceIndex];
        var metadata = allMetadata[choiceIndex];
        console.log(sample);
        console.log(metadata);

        //Refresh metadata panel
        d3.selectAll(".panel_meta").remove("div");

        Object.entries(metadata).forEach(function([key, value]) {
          d3.select("#sample-metadata").append("div").text(`${key}: ${value}`).style("font-size", "small").style("font-weight", "bold").classed("panel_meta", true);
        });

        //Refresh tables
        // Horizontal Bar Chart (Top 10 OTUs found in that individual)
        var xBar = sample.sample_values;
        var yBar = [];
        sample.otu_ids.forEach(d => yBar.push(`OTU: ${d}`));
        
        var trace1Bar = {
          x: xBar.slice(0, 9),
          y: yBar.slice(0, 9),
          text: sample.otu_labels,
          name: "Sample Values",
          type: "bar",
          orientation: "h",
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          }],
        };

        var dataBar = [trace1Bar];

        var layoutBar = {
          title: "Top Ten OTUs",
        };

        Plotly.newPlot("bar", dataBar, layoutBar);

          // Bubble chart (displays each sample)
        var xBubble = sample.otu_ids;
        var yBubble = sample.sample_values;

        var trace1Bubble = {
          x: xBubble,
          y: yBubble,
          text: sample.otu_labels,
          mode: 'markers',
          marker: {
            color: xBubble,
            size: yBubble
          }
        };
        
        var dataBubble = [trace1Bubble];
        
        var layoutBubble = {
          title: 'Sample Composition',
          showlegend: false,
        };
        
        Plotly.newPlot('bubble', dataBubble, layoutBubble);

        //Gauge chart (wash frequency)
        var washfreq = metadata.wfreq;
        var dataGuage = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: washfreq,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 16 }  },
            type: "indicator",
            mode: "gauge+number",
            gauge: {bar: { color: "#148F77" }, axis: { range: [null, 9] } },
          }
        ];
        
        var layoutGauge = { margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', dataGuage, layoutGauge);
      });
};
    

  
// };

getNewData()

