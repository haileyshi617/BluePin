<template>
  <div class="data-vis-container">
    <div class="dataVis"></div>
    <div id="tooltip" class="tooltip hidden"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'PersonalVis',
  data() {
    return {
      dummyData: [
        { title: 'Jo', value: 402 },
        { title: 'Alex', value: 231 },
        { title: 'Jane', value: 324 },
        { title: 'Max', value: 478 },
        { title: 'Deniz', value: 300 },
      ],
    };
  },
  mounted() {
    this.generateVis();
  },
  methods: {
    generateVis() {
      // CANVAS SETUP
      const MARGIN = { TOP: 0, BOTTOM: 0, LEFT: 0, RIGHT: 0 };
      const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
      const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

      // RENDER SETUP
      const renderColor = {
        b5: '#023e8a',
        b4: '#0077b6',
        b3: '#0096c7',
        b2: '#00b4d8',
        b1: '#90e0ef',
      };

      const svg = d3
        .select('.dataVis')
        .append('svg')
        .attr('width', '100%')
        .attr(
          'viewBox',
          `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
            HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
          }`
        )
        .attr('preserveAspectRatio', 'xMidYMin meet')
        .append('g')
        .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

      const sortedData = this.dummyData.sort((a, b) =>
        a.value > b.value ? 1 : -1
      );
      // const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_data = d3.max(sortedData, (o) => o.value);

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_data])
        .range([0, 1.5 * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 25)
        .outerRadius((d, i) => (i + 2) * 25)
        .startAngle(angleScale(0))
        .endAngle((d) => angleScale(d.value));

      const g = svg.append('g');

      g.selectAll('path')
        .data(sortedData)
        .enter()
        .append('path')
        .attr('d', arc)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .attr('fill', '#fff')
        .transition()
        .duration(3000)
        .attr('fill', (d, i) => {
          if (i === 0) return renderColor.b1;
          if (i === 1) return renderColor.b2;
          if (i === 2) return renderColor.b3;
          if (i === 3) return renderColor.b4;
          return renderColor.b5;
        })
        .attr('stroke', '#FFF')
        .attr('stroke-width', '1px');

      g.selectAll('text')
        .data(this.dummyData)
        .enter()
        .append('text')
        .text((d) => `${d.title}`)
        .attr('text-anchor', 'end')
        .attr('x', -20)
        .attr('dy', -8)
        .attr('y', (d, i) => -(i + 1) * 25)
        .style('font-size', '12');

      g.attr('transform', 'translate(250,250)');

      const tooltip = d3.select('#tooltip');

      function mouseover(event, d) {
        d3.select(this).transition().duration(200).attr('opacity', 0.5);

        tooltip
          .style('left', `${event.clientX}px`)
          .style('top', `${event.clientY * 1.1}px`)
          .html(
            `<p class="content"><strong>${d.title}:</strong> ${d.value} minutes this week</p>`
          )
          .classed('hidden', false);
      }

      function mouseout() {
        d3.select(this).transition().duration(200).attr('opacity', 1);
        tooltip.classed('hidden', true);
      }
    },
  },
};
</script>

<style></style>
