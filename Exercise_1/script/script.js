/*Start by setting up the canvas */
var margin = {t:50,r:50,b:100,l:50};
var width = $('.canvas').width() - margin.r - margin.l,
    height = $('.canvas').height() - margin.t - margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');


//Setting up scales
var scaleX = d3.scale.linear().domain([1962,2011]).range([0,width]),
    scaleY = d3.scale.linear().domain([0,40000000]).range([height,0]);


queue()
    .defer(d3.csv,"data/FAO_world_apple_production.csv",parse)
    .defer(d3.csv,"data/FAO_area_classification.csv",parseMetadata)
    .await(dataLoaded);

function parse(d){
    return {
        areaCode: +d.AreaCode,
        areaName: d.AreaName,
        year: +d.Year,
        value: +d.Value
    };
}

function parseMetadata(d){
    return d;
}

function dataLoaded(err,data,metadata){
    //Check to see how many 
    console.log(data.length);

    //create a nest function
    var nest = d3.nest()
        .key(function(d){ return d.areaName; });

    //this is data nested by country
    var nestedData = nest.entries(data);

    //draw(countryData);
}

function draw(data){
}